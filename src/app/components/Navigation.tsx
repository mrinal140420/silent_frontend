import { Moon, Sun, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/button';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Navigation({
  currentPage,
  onNavigate,
  theme,
  onToggleTheme,
}: NavigationProps) {
  const navItems = [
    { label: 'Silent Drop', page: 'home' },
    { label: 'Receive', page: 'receive' },
    { label: 'How It Works', page: 'how-it-works' },
    { label: 'Security', page: 'security' },
    { label: 'Docs', page: 'docs' },
  ];

  return (
    <nav className="border-b border-border bg-surface backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT SECTION */}
          <div className="flex items-center gap-10">
            {/* SecureHub (Parent Platform) */}
            <a
              href="https://securehub.example"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">SecureHub</span>
            </a>

            {/* Navigation Items */}
            <div className="relative flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;

                return (
                  <button
                    key={item.page}
                    onClick={() => onNavigate(item.page)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}

                    {/* Active Indicator (Vault Gold Line) */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-indicator"
                        className="absolute left-2 right-2 -bottom-1 h-0.5 rounded-full bg-accent"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <motion.div
            whileTap={{ rotate: 20 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              className="rounded-md"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
