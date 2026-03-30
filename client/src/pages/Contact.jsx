import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const errs = validate();
  //   if (Object.keys(errs).length > 0) { 
  //     setErrors(errs); 
  //     return; 
  //   }

  //   // Send email using EmailJS
  //   emailjs.send(
  //     'service_s9u9chn',       // Replace with your EmailJS service ID
  //     'template_8totse4',      // Replace with your EmailJS template ID
  //     {
  //       name: form.name,
  //       email: form.email,
  //       subject: form.subject,
  //       message: form.message,
  //     },
  //     'bagNmPZDHo4kfgGdj'        // Replace with your EmailJS public key
  //   ).then(() => {
  //     setSubmitted(true);
  //   }, (error) => {
  //     console.error('FAILED...', error);
  //     alert('Failed to send message. Check console.');
  //   });
  // };

   const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // EmailJS credentials from environment variables
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(
        serviceID,
        templateID,
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        publicKey
      )
      .then(() => setSubmitted(true))
      .catch((error) => {
        console.error('FAILED...', error);
        alert('Failed to send message. Check console.');
      });
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-sage text-sm font-medium tracking-widest uppercase mb-3">💬 Get in Touch</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-800 mb-4">Contact Us</h1>
        <p className="text-stone-500 max-w-md mx-auto">Have a question about a plant, an order, or just want to say hello? We'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info */}
        <div className="space-y-4">
          {[
            { icon: '📧', title: 'Email Us', value: 'arul93101@gmail.com', sub: 'We reply within 24 hours' },
            { icon: '📞', title: 'Call Us', value: '+91 8300621315', sub: 'Mon–Sat, 9AM–6PM IST' },
            { icon: '📍', title: 'Visit Us', value: 'Villupuram', sub: 'Tamil Nadu 605602, India' },
            { icon: '🕐', title: 'Working Hours', value: 'Mon–Sat: 9AM–6PM', sub: 'Sunday: Closed' },
          ].map(({ icon, title, value, sub }) => (
            <div key={title} className="card p-5 flex gap-4 items-start">
              <div className="w-11 h-11 bg-forest-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{icon}</div>
              <div>
                <p className="font-semibold text-stone-700 text-sm">{title}</p>
                <p className="text-stone-800 font-medium">{value}</p>
                <p className="text-stone-400 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="card p-10 text-center animate-fade-in h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-moss" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-stone-800 mb-3">Message Sent! 🌿</h3>
              <p className="text-stone-500 mb-6">Thanks for reaching out, <strong>{form.name}</strong>! We'll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                className="btn-secondary">Send Another Message</button>
            </div>
          ) : (
            <div className="card p-6 md:p-8">
              <h2 className="font-display text-xl font-semibold text-stone-800 mb-6">Send a Message</h2>
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Your Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="Sharan Kumar"
                      className={`input-field ${errors.name ? 'border-red-300' : ''}`} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="sharan@example.com"
                      className={`input-field ${errors.email ? 'border-red-300' : ''}`} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Subject *</label>
                  <select name="subject" value={form.subject} onChange={handleChange}
                    className={`input-field ${errors.subject ? 'border-red-300' : ''}`}>
                    <option value="">Select a topic...</option>
                    <option>Order Issue</option>
                    <option>Plant Care Advice</option>
                    <option>Return / Refund</option>
                    <option>Bulk / Wholesale Order</option>
                    <option>Other</option>
                  </select>
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={5} className={`input-field resize-none ${errors.message ? 'border-red-300' : ''}`} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-primary w-full py-3 text-base">
                  Send Message 📧
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;