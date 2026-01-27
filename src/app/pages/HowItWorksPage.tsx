import { Lock, Upload, Download, Key, Shield, Server } from 'lucide-react';

export function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-foreground mb-3">
          How It Works
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Silent Drop uses client-side encryption to ensure complete privacy. 
          Here's how the process works from start to finish.
        </p>
      </div>

      {/* Three-Step Visual Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <div className="mb-2 text-sm font-medium text-primary">Step 1</div>
          <h3 className="font-semibold text-foreground mb-2">
            Encrypt Locally
          </h3>
          <p className="text-sm text-muted-foreground">
            Your file is encrypted in your browser using AES-256 encryption 
            before any data leaves your device.
          </p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div className="mb-2 text-sm font-medium text-primary">Step 2</div>
          <h3 className="font-semibold text-foreground mb-2">
            Upload Encrypted
          </h3>
          <p className="text-sm text-muted-foreground">
            Only the encrypted blob is uploaded to the server. The encryption 
            key never leaves your browser.
          </p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Download className="h-8 w-8 text-primary" />
          </div>
          <div className="mb-2 text-sm font-medium text-primary">Step 3</div>
          <h3 className="font-semibold text-foreground mb-2">
            Decrypt Locally
          </h3>
          <p className="text-sm text-muted-foreground">
            Recipients download the encrypted file and decrypt it in their 
            browser using the key you shared.
          </p>
        </div>
      </div>

      {/* Detailed Explanation */}
      <div className="space-y-8">
        <div className="border border-border rounded-lg p-6 bg-surface">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Zero-Knowledge Architecture
              </h3>
              <p className="text-muted-foreground mb-4">
                Silent Drop follows a zero-knowledge model where the server stores 
                encrypted data but cannot decrypt it. This ensures:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>The server never has access to your encryption keys</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>File content remains private even from the service provider</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Only you and your intended recipient can decrypt the file</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6 bg-surface">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
              <Key className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Encryption Keys
              </h3>
              <p className="text-muted-foreground mb-4">
                Each file upload generates a unique 256-bit encryption key that is:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Randomly generated in your browser using secure crypto APIs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Never transmitted to or stored on the server</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Displayed to you only once for sharing with recipients</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6 bg-surface">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
              <Server className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                What the Server Knows
              </h3>
              <p className="text-muted-foreground mb-4">
                The server stores only non-sensitive metadata:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Encrypted file blob (unreadable without the key)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>File size and upload timestamp</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Expiry time and download limits (set by you)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Hashed password (if you enabled password protection)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Browser Diagram */}
      <div className="mt-12 border border-border rounded-lg p-8 bg-surface">
        <h3 className="font-semibold text-foreground mb-6 text-center">
          Data Flow Diagram
        </h3>
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="text-center flex-1">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-lg mb-3">
              <span className="text-2xl">🌐</span>
            </div>
            <p className="text-sm font-medium text-foreground mb-1">Your Browser</p>
            <p className="text-xs text-muted-foreground">Encryption happens</p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="border-t-2 border-primary w-full relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2">
                <span className="text-xs text-primary font-mono">encrypted data →</span>
              </div>
            </div>
          </div>

          <div className="text-center flex-1">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-lg mb-3">
              <Server className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">Server</p>
            <p className="text-xs text-muted-foreground">Stores encrypted data</p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="border-t-2 border-primary w-full relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2">
                <span className="text-xs text-primary font-mono">← encrypted data</span>
              </div>
            </div>
          </div>

          <div className="text-center flex-1">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-lg mb-3">
              <span className="text-2xl">🌐</span>
            </div>
            <p className="text-sm font-medium text-foreground mb-1">Recipient</p>
            <p className="text-xs text-muted-foreground">Decryption happens</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            The encryption key travels separately (via different channel) and never touches the server
          </p>
        </div>
      </div>
    </div>
  );
}
