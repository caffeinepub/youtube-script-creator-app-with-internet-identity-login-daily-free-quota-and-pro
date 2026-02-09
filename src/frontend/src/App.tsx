import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProfileSetup } from './components/ProfileSetup';
import { UpgradePro } from './components/UpgradePro';
import { PaymentSuccess } from './components/PaymentSuccess';
import { PaymentFailure } from './components/PaymentFailure';
import { Skeleton } from './components/ui/skeleton';
import { Toaster } from './components/ui/sonner';
import { useEffect, useState } from 'react';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const isAuthenticated = !!identity;

  // Simple client-side routing
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Show loading state while initializing
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 w-full max-w-md px-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  // Payment success route
  if (currentPath === '/payment-success') {
    return (
      <>
        <PaymentSuccess />
        <Toaster />
      </>
    );
  }

  // Payment failure route
  if (currentPath === '/payment-failure') {
    return (
      <>
        <PaymentFailure />
        <Toaster />
      </>
    );
  }

  // Show profile setup if authenticated but no profile
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (showProfileSetup) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <ProfileSetup />
        </main>
        <Footer />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <UpgradePro />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
