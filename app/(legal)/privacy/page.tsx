import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy — NADZ Healthcare",
  description:
    "How NADZ Healthcare collects, uses and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="15 July 2026">
      <p>
        NADZ Healthcare (&ldquo;NADZ&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
        is committed to protecting your privacy. This policy explains how we
        collect, use, share and safeguard your personal data in line with the
        UAE Federal Personal Data Protection Law (Federal Decree-Law No. 45 of
        2021) and applicable healthcare regulations.
      </p>

      <h2>Data we collect</h2>
      <ul>
        <li>
          <strong>Contact details</strong> — name, phone number, email and
          address you provide when booking, contacting us or requesting a
          callback.
        </li>
        <li>
          <strong>Health information</strong> — symptoms, service requested and
          other details you share so we can provide appropriate care. This is
          sensitive personal data and is handled with additional safeguards.
        </li>
        <li>
          <strong>Booking &amp; payment information</strong> — details of the
          services you request and payments you make. Card details are processed
          directly by our payment providers and are not stored by us.
        </li>
        <li>
          <strong>Technical &amp; usage data</strong> — such as device and
          browser information and how you use our website (see our{" "}
          <a href="/cookies">Cookie Policy</a>).
        </li>
      </ul>

      <h2>How we use your data</h2>
      <ul>
        <li>To provide, arrange and coordinate your care and home visits.</li>
        <li>To process bookings, payments and callbacks.</li>
        <li>To communicate with you about your requests and appointments.</li>
        <li>To improve our services and website.</li>
        <li>To meet legal, regulatory and healthcare obligations.</li>
      </ul>

      <h2>Legal basis</h2>
      <p>
        We process personal data on the basis of your consent, to perform a
        service you request, to comply with legal obligations, and — for
        healthcare — to protect vital interests where necessary. You may withdraw
        consent at any time.
      </p>

      <h2>Sharing your data</h2>
      <p>
        We do not sell your personal data. We share it only where necessary with:
      </p>
      <ul>
        <li>Our DHA-licensed clinicians and care team delivering your visit.</li>
        <li>
          Payment providers (such as Stripe and Tabby) to process payments
          securely.
        </li>
        <li>
          Laboratories and healthcare partners involved in your requested
          service.
        </li>
        <li>
          Trusted service providers who support our operations under
          confidentiality obligations.
        </li>
        <li>
          Regulators or authorities where required by law or healthcare
          regulation.
        </li>
      </ul>

      <h2>International transfers</h2>
      <p>
        Where data is transferred outside the UAE (for example, to a service
        provider), we take steps to ensure it is protected to an appropriate
        standard.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep personal data only for as long as necessary for the purposes
        above and to meet legal, medical-record and regulatory requirements,
        after which it is securely deleted or anonymised.
      </p>

      <h2>Security</h2>
      <p>
        We use appropriate technical and organisational measures to protect your
        data against unauthorised access, loss or misuse.
      </p>

      <h2>Your rights</h2>
      <p>Under the UAE PDPL you may, subject to conditions:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Request correction of inaccurate data.</li>
        <li>Request deletion of your data.</li>
        <li>Restrict or object to certain processing.</li>
        <li>Withdraw consent where processing is based on consent.</li>
        <li>Lodge a complaint with the competent authority.</li>
      </ul>

      <h2>Children</h2>
      <p>
        Where we provide care to children, we process their data with the
        consent and involvement of a parent or guardian.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The &ldquo;last
        updated&rdquo; date above shows when it was last revised.
      </p>

      <h2>Contact us</h2>
      <p>
        To exercise your rights or ask about this policy, contact NADZ
        Healthcare — Office 809, Armada 2, Cluster P, JLT, Dubai, United Arab
        Emirates. Email{" "}
        <a href="mailto:info@nadzhealthcare.com">info@nadzhealthcare.com</a> or
        call 800 4 NADZ / 800 4 6239.
      </p>
    </LegalShell>
  );
}
