"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";

/* Empties the cart once a payment has completed.

   The cart lives in localStorage, so a paid basket otherwise lingers and the
   customer can proceed straight back through checkout and pay for the same
   booking again. Rendered on the success page only when the payment is
   confirmed. Waits for the cart to hydrate (`ready`) before clearing, so it
   doesn't race the provider's first read of localStorage. */
export default function ClearCartOnSuccess() {
  const { clear, ready } = useCart();

  useEffect(() => {
    if (ready) clear();
  }, [ready, clear]);

  return null;
}
