"use client";

import { useState } from "react";

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

export function ContactForm() {
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
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://formspree.io/f/xjgqjnln", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          subject: formData.reason,
          message: formData.message,
          _subject: `New contact form submission: ${formData.reason || "General Inquiry"}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => null);
        const message =
          data?.errors?.map((err: { message: string }) => err.message).join(", ") ||
          "Something went wrong. Please try again or email us directly.";
        setError(message);
      }
    } catch {
      setError("Unable to send your message right now. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="font-heading text-xl text-cream mb-3">Thank You!</h4>
        <p className="text-cream/60">
          Thank you for contacting Ojú Imọ̀lẹ̀ Media Foundation. Your message has been received.
        </p>
      </div>
    );
  }

  return (
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

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gold text-background font-heading text-lg tracking-wider hover:bg-gold/90 transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
