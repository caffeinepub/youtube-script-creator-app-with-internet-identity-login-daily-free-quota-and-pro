import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { Separator } from './ui/separator';

export function StripeUpiChecklistDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="h-auto p-0 text-sm">
          View Stripe UPI Setup Guide
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enable UPI in Stripe Dashboard</DialogTitle>
          <DialogDescription>
            Follow these steps to enable UPI payments for your Stripe Checkout sessions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="step-1">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Step 1</Badge>
                  <span>Access Stripe Dashboard</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Log in to your{' '}
                    <a
                      href="https://dashboard.stripe.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Stripe Dashboard
                    </a>
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Make sure you're in the correct account (Test or Live mode)</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step-2">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Step 2</Badge>
                  <span>Navigate to Payment Methods Settings</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Go to <strong>Settings</strong> → <strong>Payment methods</strong>
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Or use this direct link:{' '}
                    <a
                      href="https://dashboard.stripe.com/settings/payment_methods"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Payment Methods Settings
                    </a>
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step-3">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Step 3</Badge>
                  <span>Enable UPI Payment Method</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Scroll down to find <strong>UPI</strong> in the list of payment methods
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Click the toggle or "Enable" button next to UPI</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    <strong>Note:</strong> UPI may require account verification or may be invite-only. If you don't see
                    it, contact Stripe support.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step-4">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Step 4</Badge>
                  <span>Configure Payment Method Options (Optional)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Consider enabling <strong>Automatic payment methods</strong> in Checkout settings
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    This allows Stripe to automatically show relevant payment methods (including UPI) based on customer
                    location and currency
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step-5">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Step 5</Badge>
                  <span>Verify Configuration</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Test your Checkout flow in Test mode first</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Ensure UPI appears as an option for customers in India with INR currency
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Once verified, enable in Live mode</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator />

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-sm">Important Requirements</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Your Stripe account must support India as a customer location</li>
              <li>UPI is only available for INR (Indian Rupee) transactions</li>
              <li>UPI may require additional verification or be invite-only for some accounts</li>
              <li>Contact Stripe support if you need help enabling UPI</li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://stripe.com/docs/payments/upi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              View Stripe UPI Documentation
              <ExternalLink className="h-3 w-3" />
            </a>
            <Button onClick={() => setOpen(false)}>Got it</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
