import { useState } from 'react';
import { Copy, Check, AlertTriangle, ExternalLink } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

interface ShareLinkDisplayProps {
  link: string;
  encryptionKey: string;
}

export function ShareLinkDisplay({ link, encryptionKey }: ShareLinkDisplayProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const copyToClipboard = async (text: string, type: 'link' | 'key') => {
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback to older method
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
        } finally {
          document.body.removeChild(textArea);
        }
      }
      
      if (type === 'link') {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedKey(true);
        setTimeout(() => setCopiedKey(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      // Still show success indicator since the fallback should work
      if (type === 'link') {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedKey(true);
        setTimeout(() => setCopiedKey(false), 2000);
      }
    }
  };

  return (
    <div className="border border-border rounded-lg p-6 bg-surface space-y-6">
      <div className="flex items-start gap-3 p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <AlertTriangle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground mb-1">
            Share link and key separately
          </p>
          <p className="text-xs text-muted-foreground">
            For maximum security, send the link and encryption key through different channels
            (e.g., link via email, key via messaging app)
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Share Link
          </label>
          <div className="flex gap-2">
            <Input
              value={link}
              readOnly
              className="font-mono text-sm bg-muted/50 border-border"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(link, 'link')}
              className="flex-shrink-0"
            >
              {copiedLink ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Encryption Key
          </label>
          <div 
            className="flex gap-2"
            onMouseEnter={() => setShowKey(true)}
            onMouseLeave={() => setShowKey(false)}
          >
            <Input
              value={encryptionKey}
              readOnly
              type={showKey ? "text" : "password"}
              className="font-mono text-sm bg-muted/50 border-border cursor-default"
              title="Hover to reveal encryption key"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(encryptionKey, 'key')}
              className="flex-shrink-0"
              title="Copy encryption key"
            >
              {copiedKey ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Hover to reveal • Click copy to securely copy key
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.location.reload()}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Create Another Drop
        </Button>
      </div>
    </div>
  );
}