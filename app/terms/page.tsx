import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Foger Vapes',
  description: 'Terms of Service for using the Foger Vapes website.',
};

export default function TermsPage() {
  return (
    <div className="bg-black min-h-screen py-24 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">Terms of Service</h1>
          <p className="text-xl text-gray-400 font-medium">Last Updated: January 1, 2024</p>
        </div>

        <div className="bg-zinc-950 p-10 rounded-3xl border border-white/10 prose prose-invert max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-white prose-a:text-[#facc15] hover:prose-a:text-yellow-300">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using the Foger Vapes website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you do not have permission to access the service.
          </p>

          <h2>2. Age Restriction</h2>
          <p>
            You must be at least 21 years of age to purchase products from this website. By agreeing to these Terms of Service, you represent that you are at least 21 years old. We reserve the right to use third-party age verification systems to confirm your age.
          </p>

          <h2>3. Products and Pricing</h2>
          <p>
            All products, services, and prices are subject to change without notice. We reserve the right to discontinue any product at any time. We have made every effort to display as accurately as possible the colors and images of our products that appear on the store.
          </p>

          <h2>4. Health Warning</h2>
          <p>
            WARNING: Many of our products contain nicotine. Nicotine is an addictive chemical. Our products are intended for use by adults of legal smoking age (21+) and should not be used by children, women who are pregnant or may become pregnant, or those with medical conditions.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall Foger Vapes, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the products or services.
          </p>

          <h2>6. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
          </p>
        </div>
      </div>
    </div>
  );
}
