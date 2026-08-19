import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Foger Vapes',
  description: 'Privacy Policy for Foger Vapes.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-black min-h-screen py-24 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">Privacy Policy</h1>
          <p className="text-xl text-gray-400 font-medium">Last Updated: January 1, 2024</p>
        </div>

        <div className="bg-zinc-950 p-10 rounded-3xl border border-white/10 prose prose-invert max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-white prose-a:text-[#facc15] hover:prose-a:text-yellow-300">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, age verification data, and other information you choose to provide.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect about you to:
          </p>
          <ul>
            <li>Provide, maintain, and improve our services.</li>
            <li>Process your transactions and send you related information.</li>
            <li>Verify your age in compliance with federal and state laws regarding the sale of vapor products.</li>
            <li>Send you technical notices, updates, security alerts, and support and administrative messages.</li>
            <li>Respond to your comments, questions, and requests, and provide customer service.</li>
          </ul>

          <h2>3. Sharing of Information</h2>
          <p>
            We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows:
          </p>
          <ul>
            <li>With third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf (e.g., age verification services, payment processors).</li>
            <li>In response to a request for information if we believe disclosure is in accordance with, or is otherwise required by, any applicable law, regulation, or legal process.</li>
          </ul>

          <h2>4. Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at support@fogervapes.com.
          </p>
        </div>
      </div>
    </div>
  );
}
