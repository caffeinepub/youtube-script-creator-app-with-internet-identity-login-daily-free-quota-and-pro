import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { CreditCard, Smartphone, AlertTriangle } from 'lucide-react';

export function UpiHelpSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Pay with UPI
        </CardTitle>
        <CardDescription>How UPI payments work through Stripe Checkout</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 rounded-full p-2 mt-0.5">
              <CreditCard className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1">UPI appears in Stripe Checkout</h4>
              <p className="text-sm text-muted-foreground">
                When you click "Upgrade Now", you'll be redirected to Stripe's secure checkout page. If UPI is enabled
                for your region (India), it will appear as a payment option alongside cards.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-primary/10 rounded-full p-2 mt-0.5">
              <Smartphone className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1">Complete payment in your UPI app</h4>
              <p className="text-sm text-muted-foreground">
                Select UPI as your payment method, scan the QR code with your preferred UPI app (PhonePe, Google Pay,
                Paytm, etc.), and approve the payment.
              </p>
            </div>
          </div>
        </div>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> Do NOT send payments directly to any personal UPI ID or PhonePe number. All
            payments must be completed through Stripe Checkout for your purchase to be processed correctly.
          </AlertDescription>
        </Alert>

        <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Note:</strong> UPI availability depends on your Stripe account
            configuration. If you don't see UPI as an option, it may need to be enabled in the Stripe Dashboard payment
            methods settings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
