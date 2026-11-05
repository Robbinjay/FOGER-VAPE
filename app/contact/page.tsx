'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    website: '', // Honeypot field for anti-spam
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setSuccessMessage(data.message || 'Message sent successfully via Zoho Mail!');
      setFormData({ firstName: '', lastName: '', email: '', message: '', website: '' });
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Foger Vapes Distributor",
      "url": "https://foger-vapes.store",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-800-123-4567",
        "contactType": "customer service",
        "email": "support@foger-vapes.store"
      }
    }
  };

  return (
    <div className="bg-black min-h-screen py-24 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">Contact Us</h1>
          <p className="text-xl text-gray-400 font-medium">We&apos;re here to help. Reach out to our support team for any questions or inquiries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-zinc-950 p-10 rounded-3xl border border-white/10">
            <h2 className="text-3xl font-black mb-8 uppercase tracking-tight">Send a Message</h2>

            {successMessage && (
              <div className="mb-6 p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl flex items-center gap-3 text-emerald-400">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="text-sm font-bold">{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-950/80 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="text-sm font-bold">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Hidden Honeypot Field for Anti-Spam (Bots will fill this, humans won't see it) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15] outline-none text-white transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15] outline-none text-white transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15] outline-none text-white transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15] outline-none text-white transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-[#facc15] text-black rounded-xl font-black text-lg hover:bg-yellow-300 transition-all uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Sending via Zoho Mail...' : <>Send Message <Send className="w-5 h-5" /></>}
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center space-y-10">
            <div>
              <h2 className="text-3xl font-black mb-8 uppercase tracking-tight">Contact Information</h2>
              <p className="text-gray-400 font-medium mb-8 leading-relaxed">
                Whether you have a question about our products, need support with an order, or are interested in wholesale opportunities, our team is ready to answer all your questions.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-[#facc15] shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-1">Email</h4>
                  <a href="mailto:support@foger-vapes.store" className="text-xl font-bold text-white hover:text-[#facc15] transition-colors">support@foger-vapes.store</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-[#facc15] shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-1">Phone</h4>
                  <a href="tel:+18001234567" className="text-xl font-bold text-white hover:text-[#facc15] transition-colors">+1 (800) 123-4567</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-[#facc15] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-1">Address</h4>
                  <p className="text-xl font-bold text-white">123 Vape Street<br/>Los Angeles, CA 90001<br/>United States</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
