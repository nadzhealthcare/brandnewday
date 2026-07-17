import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";

export const metadata: Metadata = {
  alternates: { canonical: "/cookies" },
  title: "Cookie Policy — NADZ Healthcare",
  description: "How NADZ Healthcare uses cookies on this website.",
};

export default function CookiePolicyPage() {
  return (
    <LegalShell title="Cookie Policy" updated="15 July 2026">
      <p>
        This Cookie Policy explains how NADZ Healthcare (&ldquo;NADZ&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;) uses cookies and similar technologies
        on this website. It should be read together with our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files placed on your device when you visit a
        website. They help the site work, remember your preferences, and provide
        information to the site&apos;s owners. Similar technologies such as local
        storage and pixels work in comparable ways.
      </p>

      <h2>How we use cookies</h2>
      <ul>
        <li>
          <strong>Essential cookies</strong> — required for the website to
          function (for example, keeping your session and remembering your cookie
          choices). These are always active.
        </li>
        <li>
          <strong>Functional cookies</strong> — remember choices you make to
          improve your experience.
        </li>
        <li>
          <strong>Analytics cookies</strong> — help us understand how visitors
          use the site so we can improve it. Set only with your consent.
        </li>
        <li>
          <strong>Advertising cookies</strong> — used to measure and improve our
          marketing (for example, Google Ads). Set only with your consent.
        </li>
      </ul>

      <h2>Third-party cookies</h2>
      <p>
        Some cookies are set by third parties whose services appear on our site,
        including:
      </p>
      <ul>
        <li>
          <strong>Google</strong> (Analytics, Ads and Maps) — analytics,
          advertising measurement and the embedded map on our Contact page.
        </li>
        <li>
          <strong>YouTube</strong> — where we embed videos.
        </li>
        <li>
          <strong>Stripe</strong> and <strong>Tabby</strong> — when you make a
          payment, for secure processing and fraud prevention.
        </li>
      </ul>
      <p>
        These providers process data under their own privacy and cookie policies.
      </p>

      <h2>Managing your choices</h2>
      <p>
        When you first visit, we ask for your consent to non-essential cookies.
        You can accept or reject them at any time. You can also control or delete
        cookies through your browser settings; note that blocking essential
        cookies may affect how the site works.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Cookie Policy from time to time. The &ldquo;last
        updated&rdquo; date above shows when it was last revised.
      </p>

      <h2>Contact us</h2>
      <p>
        NADZ Healthcare — Office 809, Armada 2, Cluster P, JLT, Dubai, United Arab
        Emirates. Email <a href="mailto:info@nadzhealthcare.com">info@nadzhealthcare.com</a>{" "}
        or call 800 4 NADZ / 800 4 6239.
      </p>
    </LegalShell>
  );
}
