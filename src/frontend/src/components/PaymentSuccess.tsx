import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2 } from 'lucide-react';

export function PaymentSuccess() {
  const handleContinue = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto bg-green-100 dark:bg-green-900/20 rounded-full p-3 w-fit">
            <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Your upgrade to Pro has been completed successfully. You now have unlimited access to script generation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            <p>
              Your Pro features are now active. You can start creating unlimited YouTube scripts right away.
            </p>
          </div>
          <Button onClick={handleContinue} className="w-full" size="lg">
            Continue to App
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
