import { useEffect, useState } from 'react';
import {
  Download,
  Lock,
  Key,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Progress } from '@/app/components/ui/progress';

import { API_BASE_URL } from '@/config/api';

/* -----------------------------
   Types
------------------------------ */
interface Metadata {
  filename: string;
  size_bytes: number;
  expires_at: string;
  remaining_downloads: number;
}

/* -----------------------------
   Utility: AES-GCM decrypt
------------------------------ */
async function decryptFile(
  encryptedBuffer: ArrayBuffer,
  keyHex: string
): Promise<Blob> {
  const iv = encryptedBuffer.slice(0, 12);
  const data = encryptedBuffer.slice(12);

  const keyBytes = new Uint8Array(
    keyHex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16))
  );

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    'AES-GCM',
    false,
    ['decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    data
  );

  return new Blob([decrypted]);
}

/* -----------------------------
   Receive Page
------------------------------ */
export function ReceivePage() {
  const [dropInput, setDropInput] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [encryptionKey, setEncryptionKey] = useState('');
  const [password, setPassword] = useState('');

  const [isDecrypting, setIsDecrypting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  /* -----------------------------
     Extract token safely
  ------------------------------ */
  const extractToken = (input: string): string | null => {
    if (!input) return null;

    const match = input.match(/drop\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];

    if (/^[a-zA-Z0-9_-]{8,}$/.test(input.trim())) {
      return input.trim();
    }

    return null;
  };

  /* -----------------------------
     Load metadata
  ------------------------------ */
  const loadMetadata = async (tok: string) => {
    setError('');
    setMetadata(null);
    setToken(tok);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/file/${tok}/metadata`
      );

      if (!res.ok) throw new Error();
      const data = await res.json();
      setMetadata(data);
    } catch {
      setError('This drop does not exist or has expired.');
    }
  };

  /* -----------------------------
     Manual load
  ------------------------------ */
  const handleLoadMetadata = () => {
    const extracted = extractToken(dropInput);
    if (!extracted) {
      setError('Please enter a valid drop link or token.');
      return;
    }
    loadMetadata(extracted);
  };

  /* -----------------------------
     Auto-load from URL
  ------------------------------ */
  useEffect(() => {
    const extracted = extractToken(window.location.hash);
    if (extracted) {
      setDropInput(extracted);
      loadMetadata(extracted);
    }
  }, []);

  /* -----------------------------
     Download + decrypt
  ------------------------------ */
  const handleDecryptAndDownload = async () => {
    if (!token || !encryptionKey) return;

    setIsDecrypting(true);
    setProgress(20);
    setError('');

    try {
      const headers: HeadersInit = {};

      // ✅ SEND RAW PASSWORD (backend hashes & verifies)
      if (password) {
        headers['X-File-Password'] = password;
      }

      const res = await fetch(
        `${API_BASE_URL}/api/file/${token}/download`,
        { headers }
      );

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Password required');
        }
        if (res.status === 403) {
          throw new Error('Invalid password');
        }
        throw new Error('Download failed');
      }

      const encryptedBuffer = await res.arrayBuffer();
      setProgress(60);

      const decryptedBlob = await decryptFile(
        encryptedBuffer,
        encryptionKey
      );

      setProgress(100);

      const url = URL.createObjectURL(decryptedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = metadata?.filename || 'silentdrop-file';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(
        err.message ||
          'Unable to download file. Check key, password, or link status.'
      );
    } finally {
      setIsDecrypting(false);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center">
        <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
          <Download className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
          Receive File
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Decryption happens locally. The server never sees your key.
        </p>
      </div>

      {/* Load Drop */}
      <div className="border border-border rounded-lg p-5 sm:p-6 bg-surface space-y-4">
        <Label>Drop Link or Token</Label>
        <div className="flex gap-2">
          <Input
            value={dropInput}
            onChange={(e) => {
              setDropInput(e.target.value);
              setMetadata(null);
            }}
            placeholder="https://silentdrop.app/#/drop/abc123 or abc123"
            className="font-mono text-sm"
          />
          <Button variant="outline" onClick={handleLoadMetadata}>
            Load
          </Button>
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
      </div>

      {/* Metadata + Decrypt */}
      {metadata && (
        <div className="border border-border rounded-lg p-5 sm:p-6 bg-surface space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <FileCheck className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium">{metadata.filename}</h3>
              <p className="text-sm text-muted-foreground">
                {(metadata.size_bytes / 1024).toFixed(1)} KB ·{' '}
                {metadata.remaining_downloads} downloads left
              </p>
            </div>
          </div>

          <Label className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Encryption Key
          </Label>
          <Input
            type="password"
            value={encryptionKey}
            onChange={(e) => setEncryptionKey(e.target.value)}
            className="font-mono text-sm"
            disabled={isDecrypting}
          />

          <Label className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Password (if required)
          </Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isDecrypting}
            placeholder="Enter drop password"
          />

          {isDecrypting && (
            <div className="space-y-2">
              <Progress value={progress} />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-4 w-4 animate-pulse" />
                Decrypting locally…
              </div>
            </div>
          )}

          <Button
            onClick={handleDecryptAndDownload}
            disabled={isDecrypting || !encryptionKey}
            size="lg"
            className="w-full"
          >
            <Download className="h-5 w-5 mr-2" />
            Decrypt & Download
          </Button>
        </div>
      )}
    </div>
  );
}
