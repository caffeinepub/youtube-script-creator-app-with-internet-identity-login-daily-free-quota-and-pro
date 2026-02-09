import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Button } from './ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getUserFacingError } from '../utils/userFacingError';

export function Header() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        } else {
          toast.error(getUserFacingError(error));
        }
      }
    }
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/generated/yt-script-logo.dim_512x512.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold text-foreground">YouTube Script Creator</h1>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated && userProfile && (
            <span className="text-sm text-muted-foreground">
              Welcome, <span className="font-medium text-foreground">{userProfile.name}</span>
            </span>
          )}
          <Button onClick={handleAuth} disabled={disabled} variant={isAuthenticated ? 'outline' : 'default'}>
            {disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
          </Button>
        </div>
      </div>
    </header>
  );
}
