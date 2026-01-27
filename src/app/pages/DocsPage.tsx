import { Code, Server, TestTube, FileCode, ShieldCheck } from 'lucide-react';

export function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <FileCode className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-semibold mb-3">Documentation</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Technical architecture, backend API reference, and security guarantees
        </p>
      </div>

      {/* Architecture */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Code className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Architecture Overview</h2>
        </div>

        <div className="border border-border rounded-lg p-6 bg-surface space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Frontend</h3>
            <ul className="text-sm text-muted-foreground space-y-1 font-mono bg-muted/50 p-4 rounded-lg">
              <li>• React 18 + TypeScript</li>
              <li>• Tailwind CSS (Dark & Light mode)</li>
              <li>• Web Crypto API (AES-256-GCM)</li>
              <li>• Client-side encryption only</li>
              <li>• No keys stored or transmitted</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Backend</h3>
            <ul className="text-sm text-muted-foreground space-y-1 font-mono bg-muted/50 p-4 rounded-lg">
              <li>• FastAPI (Python 3.11+)</li>
              <li>• MongoDB Atlas (Free Tier)</li>
              <li>• MongoDB GridFS for encrypted file storage</li>
              <li>• No plaintext or key access</li>
              <li>• Deployed on Render (HTTPS)</li>
            </ul>
          </div>
        </div>
      </section>
{/* Frontend Details */}
<section className="mb-12">
  <div className="flex items-center gap-3 mb-6">
    <Code className="h-6 w-6 text-primary" />
    <h2 className="text-2xl font-semibold">Frontend Implementation</h2>
  </div>

  <div className="border border-border rounded-lg p-6 bg-surface space-y-6 text-sm text-muted-foreground">
    
    <div>
      <h3 className="font-semibold text-foreground mb-2">
        Technology Stack
      </h3>
      <ul className="space-y-1">
        <li>• React 18 with TypeScript</li>
        <li>• Tailwind CSS (dark & light themes)</li>
        <li>• Lucide Icons</li>
        <li>• Framer Motion for subtle animations</li>
        <li>• Web Crypto API (native browser crypto)</li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold text-foreground mb-2">
        Client-Side Responsibilities
      </h3>
      <ul className="space-y-1">
        <li>• File selection & validation (size, count)</li>
        <li>• AES-256-GCM key generation</li>
        <li>• Local file encryption before upload</li>
        <li>• Secure upload of encrypted blobs only</li>
        <li>• Local decryption after download</li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold text-foreground mb-2">
        Encryption & Upload Flow
      </h3>
      <ol className="space-y-1 list-decimal list-inside">
        <li>User selects any file (no type restriction)</li>
        <li>Browser generates a random AES-256 key</li>
        <li>File is encrypted locally using AES-GCM</li>
        <li>Encrypted blob is uploaded to backend</li>
        <li>Encryption key is never transmitted</li>
        <li>User receives a shareable link + key</li>
      </ol>
    </div>

    <div>
      <h3 className="font-semibold text-foreground mb-2">
        UI & Security Design Decisions
      </h3>
      <ul className="space-y-1">
        <li>• No file preview (prevents data leakage)</li>
        <li>• No auto-copy of encryption keys</li>
        <li>• Key hidden by default (hover to reveal)</li>
        <li>• Link and key must be shared separately</li>
        <li>• No localStorage or persistence of keys</li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold text-foreground mb-2">
        Frontend ↔ Backend Contract
      </h3>
      <ul className="space-y-1">
        <li>• Backend receives only encrypted data</li>
        <li>• Backend enforces expiry & download limits</li>
        <li>• Frontend never requests decryption help</li>
        <li>• Post-destruction requests return 404</li>
      </ul>
    </div>

  </div>
</section>

      {/* Zero Knowledge */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Zero-Knowledge Guarantee</h2>
        </div>

        <div className="border border-border rounded-lg p-6 bg-surface space-y-3 text-sm text-muted-foreground">
          <p>Silent Drop enforces strict zero-knowledge principles:</p>
          <ul className="space-y-1">
            <li>• Encryption happens entirely in the browser</li>
            <li>• Backend never sees plaintext files</li>
            <li>• Encryption keys are never uploaded or logged</li>
            <li>• Metadata exposure is minimal and non-sensitive</li>
            <li>• Database compromise reveals only encrypted blobs</li>
          </ul>
        </div>
      </section>

      {/* API */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Server className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Backend API</h2>
        </div>

        <div className="space-y-4 font-mono text-sm">
          <div className="bg-surface border border-border rounded-lg p-4">
            <strong>POST</strong> /api/upload  
            <p className="text-muted-foreground mt-1">
              Upload encrypted file blob (GridFS storage)
            </p>
          </div>

          <div className="bg-surface border border-border rounded-lg p-4">
            <strong>POST</strong> /api/create-link  
            <p className="text-muted-foreground mt-1">
              Generate secure access token with expiry & download limits
            </p>
          </div>

          <div className="bg-surface border border-border rounded-lg p-4">
            <strong>GET</strong> /api/file/&lt;token&gt;/metadata  
            <p className="text-muted-foreground mt-1">
              Fetch non-sensitive metadata (filename, size, expiry)
            </p>
          </div>

          <div className="bg-surface border border-border rounded-lg p-4">
            <strong>GET</strong> /api/file/&lt;token&gt;/download  
            <p className="text-muted-foreground mt-1">
              Download encrypted file blob (auto-destruct enforced)
            </p>
          </div>
        </div>
      </section>

      {/* Testing */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <TestTube className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Testing & Verification</h2>
        </div>

        <div className="border border-border rounded-lg p-6 bg-surface text-sm text-muted-foreground space-y-2">
          <p>✔ End-to-end automated tests executed against deployed backend</p>
          <p>✔ Upload → link creation → metadata → download → auto-destroy verified</p>
          <p>✔ Post-destruction requests return privacy-preserving 404</p>
          <p>✔ No encryption keys observed in network traffic</p>
        </div>
      </section>
    </div>
  );
}
