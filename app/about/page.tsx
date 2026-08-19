import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | Foger Vapes',
  description: 'Learn about Foger Vapes, our mission to provide the highest quality vaping experience, and our commitment to innovation.',
};

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen pt-24 pb-16 text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">About Foger</h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed">
            Pioneering the future of flavor and performance in the vaping industry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(250,204,21,0.1)]">
            <Image 
              src="https://picsum.photos/seed/fogerabout/1200/900" 
              alt="Foger Vapes Innovation" 
              fill 
              className="object-cover mix-blend-luminosity opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent" />
          </div>
          <div className="space-y-8">
            <div>
              <span className="text-[#facc15] font-black tracking-widest uppercase text-sm">Our Mission</span>
              <h2 className="text-4xl font-black mt-2 mb-4 uppercase tracking-tight">Redefining Expectations</h2>
            </div>
            <p className="text-gray-400 font-medium text-lg leading-relaxed">
              At Foger, we believe that vaping should be an uncompromising experience. We are dedicated to pushing the boundaries of technology to deliver devices that offer superior flavor, incredible longevity, and steadfast reliability.
            </p>
            <p className="text-gray-400 font-medium text-lg leading-relaxed">
              Every device we create is a testament to our commitment to quality. From our advanced dual mesh coils to our smart LED displays, we design products that cater to the needs of modern vapers who demand the best.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-zinc-950 p-10 rounded-3xl border border-white/10 text-center">
            <h3 className="text-5xl font-black text-[#facc15] mb-4">35K+</h3>
            <p className="text-xl font-bold uppercase tracking-widest mb-2">Max Puffs</p>
            <p className="text-gray-400 font-medium">Industry-leading capacity in our flagship devices.</p>
          </div>
          <div className="bg-zinc-950 p-10 rounded-3xl border border-white/10 text-center">
            <h3 className="text-5xl font-black text-[#facc15] mb-4">Dual</h3>
            <p className="text-xl font-bold uppercase tracking-widest mb-2">Mesh Tech</p>
            <p className="text-gray-400 font-medium">For intense, consistent flavor from first puff to last.</p>
          </div>
          <div className="bg-zinc-950 p-10 rounded-3xl border border-white/10 text-center">
            <h3 className="text-5xl font-black text-[#facc15] mb-4">100%</h3>
            <p className="text-xl font-bold uppercase tracking-widest mb-2">Verified</p>
            <p className="text-gray-400 font-medium">Rigorous quality control for a safe, premium experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
