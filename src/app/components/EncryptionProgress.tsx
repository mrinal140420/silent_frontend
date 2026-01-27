import { Shield, Lock, Upload as UploadIcon, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/app/components/ui/progress';

interface EncryptionProgressProps {
  stage: 'encrypting' | 'uploading' | 'complete' | null;
  progress: number;
}

export function EncryptionProgress({ stage, progress }: EncryptionProgressProps) {
  if (!stage) return null;

  const stages = [
    {
      id: 'encrypting',
      label: 'Encrypting locally',
      icon: Lock,
      description: 'File encrypted in your browser',
    },
    {
      id: 'uploading',
      label: 'Uploading encrypted data',
      icon: UploadIcon,
      description: 'Server never sees your file',
    },
    {
      id: 'complete',
      label: 'Secure drop created',
      icon: CheckCircle2,
      description: 'Ready to share',
    },
  ];

  return (
    <div className="border border-border rounded-lg p-6 bg-surface">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">Processing securely</h3>
          <p className="text-sm text-muted-foreground">End-to-end encryption</p>
        </div>
      </div>

      <Progress value={progress} className="mb-6" />

      <div className="space-y-3">
        {stages.map((s) => {
          const Icon = s.icon;
          const isActive = s.id === stage;
          const isComplete = stages.findIndex(st => st.id === stage) > stages.findIndex(st => st.id === s.id);

          return (
            <div
              key={s.id}
              className={`flex items-start gap-3 transition-opacity ${
                isActive ? 'opacity-100' : isComplete ? 'opacity-60' : 'opacity-30'
              }`}
            >
              <div className={`p-1.5 rounded ${isComplete ? 'bg-success/10' : 'bg-muted'}`}>
                <Icon className={`h-4 w-4 ${isComplete ? 'text-success' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1">
                <p className={`text-sm ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {s.label}
                </p>
                <p className="text-xs text-muted-foreground">{s.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
