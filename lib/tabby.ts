/* Tabby hosted-checkout client (server-side). Docs: https://docs.tabby.ai
   Uses the Secret Key for create-checkout, retrieve and capture. */

const TABBY_BASE = "https://api.tabby.ai";

export function tabbyReady(): boolean {
  return !!(process.env.TABBY_SECRET_KEY && process.env.TABBY_MERCHANT_CODE);
}

async function tabbyFetch(path: string, init?: RequestInit) {
  return fetch(`${TABBY_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TABBY_SECRET_KEY}`,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
}

export type TabbyBuyer = { name: string; email: string; phone: string };

export type TabbyCheckoutResult =
  | { ok: true; url: string }
  | { ok: false; rejected: true; reason: string }
  | { ok: false; rejected: false; error: string };

export async function createTabbyCheckout(input: {
  amount: number;
  currency: string;
  description: string;
  buyer: TabbyBuyer;
  refId: string;
  ref: string;
  site: string;
}): Promise<TabbyCheckoutResult> {
  const amount = input.amount.toFixed(2);
  const body = {
    payment: {
      amount,
      currency: input.currency || "AED",
      description: input.description || "NADZ Healthcare",
      buyer: input.buyer,
      order: {
        reference_id: input.refId,
        items: [
          {
            title: input.description || "NADZ Healthcare",
            quantity: 1,
            unit_price: amount,
            category: "Healthcare",
          },
        ],
      },
      shipping_address: { city: "Dubai", address: "Dubai, UAE", zip: "00000" },
    },
    lang: "en",
    merchant_code: process.env.TABBY_MERCHANT_CODE,
    // Tabby appends ?payment_id=... to these on redirect
    merchant_urls: {
      success: `${input.site}/pay/success`,
      cancel: `${input.site}/pay/cancel?ref=${encodeURIComponent(input.ref)}`,
      failure: `${input.site}/pay/failure?ref=${encodeURIComponent(input.ref)}`,
    },
  };

  let data: {
    status?: string;
    configuration?: {
      available_products?: { installments?: { web_url?: string }[] };
      products?: { installments?: { rejection_reason?: string | null } };
    };
  };
  try {
    const res = await tabbyFetch("/api/v2/checkout", {
      method: "POST",
      body: JSON.stringify(body),
    });
    data = await res.json();
    if (!res.ok) {
      return {
        ok: false,
        rejected: false,
        error: "Tabby could not start checkout",
      };
    }
  } catch {
    return { ok: false, rejected: false, error: "Tabby request failed" };
  }

  const url =
    data.configuration?.available_products?.installments?.[0]?.web_url;
  if (data.status === "created" && url) {
    return { ok: true, url };
  }
  const reason =
    data.configuration?.products?.installments?.rejection_reason ||
    "not_available";
  return { ok: false, rejected: true, reason };
}

export type TabbyPayment = {
  id: string;
  status: string; // CREATED | AUTHORIZED | CLOSED | REJECTED | EXPIRED
  amount: string;
  currency: string;
} | null;

export async function getTabbyPayment(id: string): Promise<TabbyPayment> {
  try {
    const res = await tabbyFetch(`/api/v2/payments/${id}`);
    if (!res.ok) return null;
    return (await res.json()) as TabbyPayment;
  } catch {
    return null;
  }
}

export async function captureTabbyPayment(
  id: string,
  amount: string,
): Promise<boolean> {
  try {
    const res = await tabbyFetch(`/api/v2/payments/${id}/captures`, {
      method: "POST",
      body: JSON.stringify({ amount, reference_id: `cap-${id}` }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Human-readable Tabby rejection reasons. */
export function tabbyRejectionMessage(reason: string): string {
  switch (reason) {
    case "order_amount_too_high":
      return "This amount is above Tabby's limit for your account — please pay by card.";
    case "order_amount_too_low":
      return "This amount is below Tabby's minimum — please pay by card.";
    default:
      return "Tabby isn't available for this order — please pay by card.";
  }
}
