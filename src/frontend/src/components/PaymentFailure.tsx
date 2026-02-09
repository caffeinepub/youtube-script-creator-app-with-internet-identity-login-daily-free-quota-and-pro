import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function PaymentFailure() {
  const handleRetry = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto bg-destructive/10 rounded-full p-3 w-fit">
            <XCircle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
          <CardDescription>
            Your payment was not completed. No charges have been made to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              If you encountered any issues during checkout, please try again or contact our support team for
              assistance.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Button onClick={handleRetry} className="w-full" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Upgrade Page
            </Button>
            <p className="text-xs text-muted-foreground">
              Need help? Contact support at support@example.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
