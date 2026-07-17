import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms & Conditions — NADZ Healthcare",
  description: "The terms governing your use of the NADZ Healthcare website.",
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms &amp; Conditions" updated="15 July 2026">
      <p>
        These Terms &amp; Conditions govern your use of the NADZ Healthcare
        website and services. By using this website or booking a service, you
        agree to these terms.
      </p>

      <h2>Our services</h2>
      <p>
        NADZ Healthcare provides home-based healthcare services in Dubai,
        delivered by DHA-licensed doctors, nurses and specialists. Information on
        this website is for general guidance and does not replace professional
        medical advice.
      </p>

      <h2>Not for emergencies</h2>
      <p>
        This website and our booking channels are not for medical emergencies. If
        you are experiencing a medical emergency, call the UAE emergency services
        on <strong>998</strong> (ambulance) or <strong>999</strong> immediately.
      </p>

      <h2>Bookings and clinical assessment</h2>
      <p>
        Submitting a request does not by itself create a doctor–patient
        relationship. All services are subject to clinical assessment and
        availability, and our team may contact you to confirm details before a
        visit.
      </p>

      <h2>Payments</h2>
      <p>
        Payments are processed securely through our payment providers. Fees,
        where applicable, are confirmed before you pay. Refunds and cancellations
        are handled in line with our care policies.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this website, including text, graphics, logos and images,
        is owned by or licensed to NADZ Healthcare and may not be reproduced
        without permission.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree to use this website lawfully and not to misuse it, attempt to
        gain unauthorised access, or provide false information.
      </p>

      <h2>Disclaimer and liability</h2>
      <p>
        While we take care to keep information accurate, the website is provided
        &ldquo;as is&rdquo;. To the extent permitted by law, NADZ Healthcare is
        not liable for any loss arising from reliance on website content, save for
        the care we provide, which is governed by applicable healthcare
        standards.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the United Arab Emirates and the
        Emirate of Dubai, and any disputes are subject to the jurisdiction of the
        Dubai courts.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. The &ldquo;last
        updated&rdquo; date above shows when they were last revised.
      </p>

      <h2>Contact us</h2>
      <p>
        NADZ Healthcare — Office 809, Armada 2, Cluster P, JLT, Dubai, United Arab
        Emirates. Email{" "}
        <a href="mailto:info@nadzhealthcare.com">info@nadzhealthcare.com</a> or
        call 800 4 NADZ / 800 4 6239.
      </p>
    </LegalShell>
  );
}
