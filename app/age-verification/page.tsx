import { Metadata } from 'next';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Age Verification | Foger Vapes',
  description: 'Information regarding age verification requirements for purchasing Foger Vapes products.',
};

export default function AgeVerificationPage() {
  return (
    <div className="bg-black min-h-screen py-24 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-zinc-950 border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(250,204,21,0.15)] text-[#facc15]">
              <ShieldAlert className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">Age Verification</h1>
          <p className="text-xl text-[#facc15] font-black uppercase tracking-widest">Strictly 21+ Only</p>
        </div>

        <div className="bg-zinc-950 p-10 rounded-3xl border border-white/10 space-y-8">
          <div className="border-l-4 border-[#facc15] pl-6 py-2">
            <p className="text-xl font-medium text-gray-300 leading-relaxed">
              Foger Vapes is committed to preventing youth access to our products. By law, you must be 21 years of age or older to purchase electronic cigarette products from this website.
            </p>
          </div>
          
          <h2 className="text-3xl font-black uppercase tracking-tight">The Verification Process</h2>
          <p className="text-gray-400 font-medium leading-relaxed">
            We utilize a secure, industry-leading third-party age verification system to verify the age and identity of all customers before they can complete a purchase. This process happens automatically at checkout using the billing information you provide.
          </p>
          
          <h3 className="text-xl font-bold uppercase tracking-widest text-white mt-8">Manual Verification</h3>
          <p className="text-gray-400 font-medium leading-relaxed">
            In some cases, the automated system may not be able to verify your age based on public records. If this occurs, you will be prompted to upload a photo of your valid government-issued ID (such as a driver&apos;s license or passport) to securely verify your age manually.
          </p>
          
          <h3 className="text-xl font-bold uppercase tracking-widest text-white mt-8">Adult Signature Required</h3>
          <p className="text-gray-400 font-medium leading-relaxed">
            In compliance with the PACT Act and various state laws, an adult signature (21+) with ID verification is required upon delivery of all vaping products. The carrier will check the ID of the person signing for the package.
          </p>

          <div className="mt-12 pt-8 border-t border-white/10 flex justify-center">
             <Link href="/products" className="px-10 py-5 bg-[#facc15] text-black rounded-full font-black text-lg hover:bg-yellow-300 transition-all uppercase tracking-widest">
               Acknowledge & Return to Shop
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
