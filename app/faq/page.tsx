import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Foger Vapes',
  description: 'Frequently asked questions about Foger Vapes products, shipping, and returns.',
};

const faqs = [
  {
    question: "How do I know when my Foger disposable is empty?",
    answer: "Most of our modern devices feature a smart LED display that indicates the remaining e-liquid and battery life. For devices without a display, a noticeable drop in flavor or vapor production, or a blinking indicator light, signifies it's time for a replacement."
  },
  {
    question: "Are Foger Vapes rechargeable?",
    answer: "Yes, many of our high-capacity models like the Foger Bit 35K and Foger Switch Pro are rechargeable via a Type-C port, allowing you to use every drop of e-liquid."
  },
  {
    question: "How long does shipping take?",
    answer: "We typically process orders within 1-2 business days. Standard shipping usually takes 3-5 business days depending on your location. Expedited shipping options are available at checkout."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unopened and unused items in their original packaging. If you receive a defective device, please contact our support team within 48 hours of delivery for a replacement."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within the United States, adhering to all state and local regulations regarding the shipment of vaping products."
  },
  {
    question: "How can I verify if my Foger device is authentic?",
    answer: "Every authentic Foger device comes with an anti-counterfeit scratch-off code on the packaging. You can enter this code on our authentication page to verify your product."
  }
];

export default function FAQPage() {
  return (
    <div className="bg-black min-h-screen py-24 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">FAQ</h1>
          <p className="text-xl text-gray-400 font-medium">Frequently Asked Questions</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-zinc-950 p-8 rounded-3xl border border-white/10">
              <h3 className="text-xl font-black mb-4 uppercase tracking-wide text-[#facc15]">{faq.question}</h3>
              <p className="text-gray-300 font-medium leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
