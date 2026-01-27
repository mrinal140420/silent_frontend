import { useState } from 'react';
import { Clock, Download, Lock, Shield } from 'lucide-react';
import logo from '@/assets/logo.png';

import { FileUpload } from '@/app/components/FileUpload';
import { EncryptionProgress } from '@/app/components/EncryptionProgress';
import { ShareLinkDisplay } from '@/app/components/ShareLinkDisplay';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

import { API_BASE_URL } from '@/config/api';

/* -----------------------------
   Utility: Encrypt file (AES-GCM)
------------------------------ */
async function encryptFile(file: File) {
  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt']
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = await file.arrayBuffer();

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  const rawKey = await crypto.subtle.exportKey('raw', key);
  const keyBytes = new Uint8Array(rawKey);

  return {
    encryptedBlob: new Blob([iv, new Uint8Array(encrypted)]),
    key: Array.from(keyBytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join(''),
  };
}

/* -----------------------------
   Home Page
------------------------------ */
export function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [expiryTime, setExpiryTime] = useState('24');
  const [maxDownloads, setMaxDownloads] = useState('1');
  const [password, setPassword] = useState('');

  const [stage, setStage] = useState<
    'encrypting' | 'uploading' | 'complete' | null
  >(null);
  const [progress, setProgress] = useState(0);

  const [shareLink, setShareLink] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');

  /* -----------------------------
     Encrypt → Upload → Create link
  ------------------------------ */
  const handleEncryptAndUpload = async () => {
    if (!selectedFile) return;

    try {
      setStage('encrypting');
      setProgress(10);

      const { encryptedBlob, key } = await encryptFile(selectedFile);
      setProgress(40);

      setStage('uploading');

      const formData = new FormData();
      formData.append('file', encryptedBlob, selectedFile.name);
      formData.append('expires_in_hours', expiryTime);
      formData.append('max_downloads', maxDownloads);
      formData.append('hash', key);

      const uploadRes = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) throw new Error('Upload failed');

      const { file_id } = await uploadRes.json();
      setProgress(70);

      const linkRes = await fetch(
        `${API_BASE_URL}/api/create-link?file_id=${file_id}&expires_in_hours=${expiryTime}`,
        { method: 'POST' }
      );

      if (!linkRes.ok) throw new Error('Link creation failed');

      const { token } = await linkRes.json();

      setEncryptionKey(key);
      setShareLink(`${window.location.origin}/#/drop/${token}`);
      setProgress(100);
      setStage('complete');
    } catch (err) {
      console.error(err);
      alert('Failed to create SecureDrop link');
      setStage(null);
      setProgress(0);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setStage(null);
    setProgress(0);
    setShareLink('');
    setEncryptionKey('');
    setPassword('');
  };

  return (
    <div
      className="
        min-h-screen
        flex flex-col
        max-w-4xl mx-auto
        px-4 sm:px-6
        py-6 sm:py-12
      "
    >
      {/* ===== Header / Branding ===== */}
      <div className="text-center mb-8 sm:mb-14">
        <div
          className="
            flex flex-col sm:flex-row
            items-center justify-center
            gap-3 sm:gap-4
            mb-4 sm:mb-5
          "
        >
          <div
            className="
              p-2 sm:p-3
              rounded-xl
              bg-surface
              border border-border
              shadow-sm
            "
          >
            <img
              src={logo}
              alt="SecureDrop logo"
              className="h-10 w-10 sm:h-14 sm:w-14 object-contain"
            />
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Silent <span className="text-primary">Drop</span>
          </h1>
        </div>

        <p className="text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          End-to-end encrypted file sharing.
          Files are encrypted locally — the server never sees your data.
        </p>
      </div>

      {shareLink ? (
        <ShareLinkDisplay
          link={shareLink}
          encryptionKey={encryptionKey}
          onReset={reset}
        />
      ) : (
        <div className="space-y-6">
          <Label>Select File</Label>

          <FileUpload
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
            onClearFile={reset}
          />

          {stage && (
            <EncryptionProgress stage={stage} progress={progress} />
          )}

          {selectedFile && !stage && (
            <div className="border border-border rounded-lg p-5 sm:p-6 bg-surface space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label>
                    <Clock className="inline h-4 w-4 mr-1" /> Expiry (hours)
                  </Label>
                  <Select value={expiryTime} onValueChange={setExpiryTime}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                      <SelectItem value="168">7 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>
                    <Download className="inline h-4 w-4 mr-1" /> Max Downloads
                  </Label>
                  <Select
                    value={maxDownloads}
                    onValueChange={setMaxDownloads}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Label>
                <Lock className="inline h-4 w-4 mr-1" /> Optional Password
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                onClick={handleEncryptAndUpload}
                size="lg"
                className="w-full"
              >
                <Shield className="mr-2 h-5 w-5" />
                Encrypt & Upload
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
