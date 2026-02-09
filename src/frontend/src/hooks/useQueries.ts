import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, ShoppingItem } from '../backend';
import { getUserFacingError } from '../utils/userFacingError';

export type CheckoutSession = {
  id: string;
  url: string;
};

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
    onError: (error) => {
      console.error('Failed to save profile:', error);
      throw new Error(getUserFacingError(error));
    },
  });
}

// Stripe Configuration Check
export function useIsStripeConfigured() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['stripeConfigured'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isStripeConfigured();
      } catch (error) {
        console.error('Failed to check Stripe configuration:', error);
        return false;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

// Stripe Checkout
export function useCreateCheckoutSession() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (items: ShoppingItem[]): Promise<CheckoutSession> => {
      if (!actor) throw new Error('Actor not available');
      
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/payment-success`;
      const cancelUrl = `${baseUrl}/payment-failure`;
      
      try {
        const result = await actor.createCheckoutSession(items, successUrl, cancelUrl);
        
        // JSON parsing is important!
        const session = JSON.parse(result) as CheckoutSession;
        
        if (!session?.url) {
          throw new Error('Stripe session missing url');
        }
        
        return session;
      } catch (error) {
        console.error('Checkout session error:', error);
        throw new Error(getUserFacingError(error));
      }
    },
  });
}
