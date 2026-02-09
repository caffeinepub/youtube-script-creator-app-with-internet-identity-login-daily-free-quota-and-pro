import { useState, useEffect } from 'react';
import { useCreateCheckoutSession, useIsStripeConfigured } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Loader2, Sparkles, Check, Info, AlertCircle } from 'lucide-react';
import { UpiHelpSection } from './UpiHelpSection';
import { StripeUpiChecklistDialog } from './StripeUpiChecklistDialog';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Alert, AlertDescription } from './ui/alert';

export function UpgradePro() {
  const { identity } = useInternetIdentity();
  const createCheckoutSession = useCreateCheckoutSession();
  const { data: isStripeConfigured, isLoading: checkingStripe } = useIsStripeConfigured();
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!identity;
  const stripeReady = isStripeConfigured === true;

  // Clear error when authentication state changes
  useEffect(() => {
    setError(null);
  }, [isAuthenticated]);

  const handleUpgrade = async () => {
    if (!isAuthenticated) {
      setError('Please login to upgrade to Pro.');
      return;
    }

    if (!stripeReady) {
      setError('Payment system is not configured yet. Please contact the administrator to set up Stripe payments.');
      return;
    }

    setError(null);

    try {
      const items = [
        {
          productName: 'Pro Plan',
          productDescription: 'Unlimited YouTube script generation',
          priceInCents: BigInt(19900), // ₹199.00
          currency: 'INR',
          quantity: BigInt(1),
        },
      ];

      const session = await createCheckoutSession.mutateAsync(items);

      if (!session?.url) {
        throw new Error('Stripe session missing url');
      }

      // Redirect to Stripe Checkout - do NOT use router navigation
      window.location.href = session.url;
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to create checkout session. Please try again.');
    }
  };

  const canUpgrade = isAuthenticated && stripeReady && !createCheckoutSession.isPending;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-2">
            <Sparkles className="h-3 w-3 mr-1" />
            Upgrade to Pro
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">Unlock Unlimited Script Generation</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upgrade to Pro and create unlimited YouTube scripts without daily limits. Perfect for content creators who
            need more.
          </p>
        </div>

        {/* Stripe Configuration Warning */}
        {!checkingStripe && !stripeReady && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Payment system not configured.</strong> The administrator needs to configure Stripe before
              payments can be accepted. Please contact support or check back later.
            </AlertDescription>
          </Alert>
        )}

        {/* Pricing Card */}
        <Card className="max-w-md mx-auto border-2 border-primary/20">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl">Pro Plan</CardTitle>
            <CardDescription>One-time payment</CardDescription>
            <div className="mt-4">
              <span className="text-5xl font-bold">₹199</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Unlimited script generation</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>No daily limits</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Save all your scripts</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Priority support</span>
              </li>
            </ul>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleUpgrade}
              disabled={!canUpgrade || checkingStripe}
              className="w-full"
              size="lg"
            >
              {(createCheckoutSession.isPending || checkingStripe) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {!isAuthenticated ? 'Login to Upgrade' : !stripeReady ? 'Payment Not Available' : 'Upgrade Now'}
            </Button>

            {!isAuthenticated && (
              <p className="text-sm text-muted-foreground text-center">Please login to purchase Pro plan</p>
            )}
          </CardContent>
        </Card>

        {/* UPI Help Section */}
        <div className="max-w-2xl mx-auto">
          <UpiHelpSection />
        </div>

        {/* Stripe UPI Setup Link */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">For Admins:</strong> Need to enable UPI payments in your Stripe
                    account?
                  </p>
                  <StripeUpiChecklistDialog />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
