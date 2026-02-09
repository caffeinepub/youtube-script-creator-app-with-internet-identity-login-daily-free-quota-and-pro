/**
 * Utility to translate technical errors into clear English user-facing messages.
 * Prevents exposing raw backend traps, internal error strings, or technical jargon.
 */

export function getUserFacingError(error: unknown): string {
  if (!error) {
    return 'An unexpected error occurred. Please try again.';
  }

  const errorMessage = error instanceof Error ? error.message : String(error);
  const lowerMessage = errorMessage.toLowerCase();

  // Actor/initialization errors
  if (lowerMessage.includes('actor not available') || lowerMessage.includes('actor is not initialized')) {
    return 'The application is still loading. Please wait a moment and try again.';
  }

  // Authorization errors
  if (lowerMessage.includes('unauthorized') || lowerMessage.includes('permission')) {
    return 'You do not have permission to perform this action. Please log in or contact support.';
  }

  // Stripe configuration errors
  if (
    lowerMessage.includes('stripe') &&
    (lowerMessage.includes('configure') || lowerMessage.includes('configuration') || lowerMessage.includes('api key'))
  ) {
    return 'Payment system is not configured yet. Please contact the administrator to set up Stripe payments.';
  }

  // Stripe session errors
  if (lowerMessage.includes('stripe session missing url') || lowerMessage.includes('session') && lowerMessage.includes('url')) {
    return 'Failed to create payment session. Please try again or contact support.';
  }

  // JSON parsing errors
  if (lowerMessage.includes('json') || lowerMessage.includes('parse')) {
    return 'Failed to process payment information. Please try again.';
  }

  // Network/connection errors
  if (lowerMessage.includes('network') || lowerMessage.includes('fetch') || lowerMessage.includes('connection')) {
    return 'Network error. Please check your connection and try again.';
  }

  // Authentication errors
  if (lowerMessage.includes('authenticated') || lowerMessage.includes('identity')) {
    return 'Authentication error. Please log in again.';
  }

  // Generic fallback - don't expose the raw error
  return 'Something went wrong. Please try again or contact support if the problem persists.';
}
