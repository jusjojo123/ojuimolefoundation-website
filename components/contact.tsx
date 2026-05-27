"use client";

import { useState } from "react";

const contactInfo = [
  {
    label: "Email",
    value: "ojuimolefoundation@gmail.com",
    href: "mailto:ojuimolefoundation@gmail.com",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    label: "Phone",
    value: "+1 (868) 254-2540",
    href: "tel:+18682542540",
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
  {
    label: "Location",
    value: "6th Company Village, New Grant, Trinidad and Tobago",
    href: null,
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/OjuImoleMedia",
    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@ojuimolemedia",
    icon: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/ojuimolemedia",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
];

const reasonOptions = [
  "General Inquiry",
  "Partnership Opportunity",
  "Volunteer Interest",
  "Media and Press",
  "Donation Information",
  "Educational Programs",
  "Cultural Preservation",
  "Event Collaboration",
  "Other",
];

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-4 block">
            Get in Touch
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream tracking-wide mb-6">
            Contact Us
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            We would love to hear from you. Reach out to learn more about our work or discuss partnership opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="bg-background/50 border border-gold/10 rounded-lg p-8 lg:p-10">
            <h3 className="font-heading text-2xl text-gold mb-2 tracking-wide">
              Send Us a Message
            </h3>
            <p className="text-cream/60 text-sm mb-8">
              Fill out the form below and we will get back to you as soon as possible.
            </p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-heading text-xl text-cream mb-3">Thank You!</h4>
                <p className="text-cream/60">
                  Your message has been received. We will be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-cream/80 text-sm mb-2">
                      First Name <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-gold/20 rounded text-cream placeholder-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-cream/80 text-sm mb-2">
                      Last Name <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-gold/20 rounded text-cream placeholder-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-cream/80 text-sm mb-2">
                    Email Address <span className="text-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-gold/20 rounded text-cream placeholder-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-cream/80 text-sm mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-gold/20 rounded text-cream placeholder-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Enter your phone number (optional)"
                  />
                </div>

                {/* Reason for Contact */}
                <div>
                  <label htmlFor="reason" className="block text-cream/80 text-sm mb-2">
                    Reason for Reaching Out <span className="text-gold">*</span>
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    required
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-gold/20 rounded text-cream focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4af37'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                  >
                    <option value="" className="bg-background text-cream/50">Select a reason</option>
                    {reasonOptions.map(option => (
                      <option key={option} value={option} className="bg-background text-cream">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-cream/80 text-sm mb-2">
                    Your Message <span className="text-gold">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-gold/20 rounded text-cream placeholder-cream/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gold text-background font-heading text-lg tracking-wider hover:bg-gold/90 transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Side */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="bg-background/50 border border-gold/10 rounded p-6 flex items-start gap-4 hover:border-gold/20 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-heading text-lg text-cream mb-1">{item.label}</h4>
                    {item.href ? (
                      <a href={item.href} className="text-cream/60 hover:text-gold transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-cream/60">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-background/50 border border-gold/10 rounded p-6">
              <h4 className="font-heading text-lg text-cream mb-4 tracking-wide">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-background border border-gold/20 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold/40 transition-colors"
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-background/50 border border-gold/10 rounded p-6">
              <h4 className="font-heading text-lg text-cream mb-4 tracking-wide">Response Time</h4>
              <p className="text-cream/60 text-sm leading-relaxed">
                We typically respond to inquiries within 24 to 48 hours. For urgent matters, please call us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
