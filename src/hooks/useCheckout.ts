import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export function useCheckout() {
  const [loading, setLoading] = useState(false);

  const redirectToCheckout = async (priceId: string) => {
    if (!publishableKey) {
      console.error('Stripe publishable key eksik.');
      return;
    }

    const stripe = await loadStripe(publishableKey);
    if (!stripe) return;

    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId })
      });
      const { sessionId } = await response.json();
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Checkout başlatılırken hata', error);
    } finally {
      setLoading(false);
    }
  };

  return { redirectToCheckout, loading };
}
