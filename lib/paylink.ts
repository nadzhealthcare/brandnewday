import crypto from "crypto";

/* A pay-link encodes a custom amount in a signed, tamper-proof token so we can
   accept payments without a database. Format: base64url(payload).signature */

export type PayData = {
  a: number; // amount, in AED (major units)
  c: string; // currency, e.g. "AED"
  d: string; // description
  n?: string; // customer name
  p?: string; // customer phone
  t: number; // issued-at (ms)
};

function secret(): string {
  return process.env.PAYLINK_SECRET ?? "";
}

function sign(body: string): string {
  return crypto.createHmac("sha256", secret()).update(body).digest("base64url");
}

export function createRef(input: {
  a: number;
  d: string;
  n?: string;
  p?: string;
  c?: string;
}): string {
  const payload: PayData = {
    a: input.a,
    c: input.c ?? "AED",
    d: input.d,
    n: input.n,
    p: input.p,
    t: Date.now(),
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function readRef(ref: string): PayData | null {
  if (!ref || !secret()) return null;
  const dot = ref.lastIndexOf(".");
  if (dot < 1) return null;
  const body = ref.slice(0, dot);
  const sig = ref.slice(dot + 1);
  const expected = sign(body);
  if (
    sig.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return null;
  }
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString());
    if (typeof data?.a !== "number" || data.a <= 0) return null;
    return data as PayData;
  } catch {
    return null;
  }
}
