import { SiCaffeine } from 'react-icons/si';
import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'unknown-app';
  const caffeineUrl = `https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`;

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
          <p>© {currentYear} YouTube Script Creator. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="h-4 w-4 text-destructive fill-destructive" /> using{' '}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline inline-flex items-center gap-1"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
