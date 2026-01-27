import { Shield, Lock, AlertTriangle, Check, X } from 'lucide-react';

export function SecurityPage() {
  const threats = [
    {
      threat: 'Server Compromise',
      mitigation: 'Files are encrypted before upload. Even with full server access, attacker cannot decrypt files without keys.',
      level: 'mitigated',
    },
    {
      threat: 'Man-in-the-Middle Attack',
      mitigation: 'HTTPS encryption protects data in transit. Even if intercepted, files remain encrypted.',
      level: 'mitigated',
    },
    {
      threat: 'Key Interception',
      mitigation: 'Keys must be shared through separate channels. Link + key separation provides defense in depth.',
      level: 'user-dependent',
    },
    {
      threat: 'Brute Force Attack',
      mitigation: 'AES-256 encryption with 256-bit keys makes brute force computationally infeasible.',
      level: 'mitigated',
    },
    {
      threat: 'Expired Drop Access',
      mitigation: 'Files are permanently deleted after expiry. No recovery possible even by administrators.',
      level: 'mitigated',
    },
  ];

  const outOfScope = [
    'Endpoint security (device malware, keyloggers)',
    'Physical access to unlocked devices',
    'Social engineering attacks',
    'Quantum computing attacks (future consideration)',
    'Browser vulnerabilities or compromised extensions',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-semibold text-foreground mb-3">
          Security Model
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transparent security architecture and threat modeling for Silent Drop
        </p>
      </div>

      {/* Zero-Knowledge Promise */}
      <div className="border border-primary/30 bg-primary/5 rounded-lg p-6 mb-12">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Zero-Knowledge Encryption Promise
            </h2>
            <p className="text-muted-foreground mb-4">
              Silent Drop implements client-side encryption ensuring that:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <span>All encryption and decryption happens in your browser</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <span>Encryption keys are never transmitted to our servers</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <span>Server operators cannot access your file contents</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <span>Files are permanently deleted after expiry or download limits</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Threat Mitigation Table */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Threat Mitigation
        </h2>
        <div className="border border-border rounded-lg overflow-hidden bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                    Threat
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                    Mitigation Strategy
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {threats.map((item, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {item.threat}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {item.mitigation}
                    </td>
                    <td className="px-6 py-4">
                      {item.level === 'mitigated' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-success/10 text-success rounded-md text-xs font-medium">
                          <Check className="h-3 w-3" />
                          Mitigated
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent rounded-md text-xs font-medium">
                          <AlertTriangle className="h-3 w-3" />
                          User-Dependent
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="border border-border rounded-lg p-6 bg-surface">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Encryption Details
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong className="text-foreground">Algorithm:</strong> AES-256-GCM</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong className="text-foreground">Key Size:</strong> 256 bits</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong className="text-foreground">Key Generation:</strong> Web Crypto API</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong className="text-foreground">IV:</strong> Random per file</span>
            </li>
          </ul>
        </div>

        <div className="border border-border rounded-lg p-6 bg-surface">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Features
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Automatic file expiration</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Download limit enforcement</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Optional password protection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>No user accounts required</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Out of Scope */}
      <div className="border border-accent/30 bg-accent/5 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Out of Scope
            </h2>
            <p className="text-muted-foreground mb-4">
              While Silent Drop provides strong encryption, the following threats are outside 
              the security model and require user awareness:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              {outOfScope.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <X className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mt-12 border border-border rounded-lg p-6 bg-surface">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Security Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">✓ Do This</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Share link and key through different channels</li>
              <li>• Use password protection for sensitive files</li>
              <li>• Set appropriate expiry times</li>
              <li>• Limit download counts when possible</li>
            </ul>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">✗ Avoid This</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Don't share link and key in same message</li>
              <li>• Don't use for highly regulated data (HIPAA, etc.)</li>
              <li>• Don't rely on obscurity alone</li>
              <li>• Don't share keys over insecure channels</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
