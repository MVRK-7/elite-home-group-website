import { useState, type FormEvent } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Contact.css';

type Status = 'idle' | 'sending' | 'sent';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const info = useReveal<HTMLDivElement>(0);
  const panel = useReveal<HTMLDivElement>(0.1);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1100);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <div ref={info.ref} style={info.style}>
          <div className="contact-kicker">Contact</div>
          <h2 className="contact-title">Let&rsquo;s talk about your next move.</h2>
          <p className="contact-copy">
            No pressure, no scripts &mdash; just a straightforward conversation about
            where you are and where you&rsquo;d like to be. We&rsquo;ll reply within one
            business day.
          </p>
          <div className="contact-details">
            <div className="contact-row">
              <span className="contact-label">Call</span>
              <a href="tel:+19283622011">(928) 362&ndash;2011</a>
            </div>
            <div className="contact-row">
              <span className="contact-label">Email</span>
              <a href="mailto:MyEliteHomeGroup@gmail.com">MyEliteHomeGroup@gmail.com</a>
            </div>
            <div className="contact-row">
              <span className="contact-label">Office</span>
              <span>1608 Stockton Hill Rd #104, Kingman, AZ</span>
            </div>
            <div className="contact-row">
              <span className="contact-label">Web</span>
              <a href="https://myelitehomegroup.com" target="_blank" rel="noopener noreferrer">
                MyEliteHomeGroup.com
              </a>
            </div>
          </div>
        </div>

        <div ref={panel.ref} style={panel.style} className="contact-panel">
          {status === 'sent' ? (
            <div className="contact-success">
              <svg width="66" height="66" viewBox="0 0 52 52" fill="none">
                <circle
                  cx="26"
                  cy="26"
                  r="24"
                  stroke="var(--gold)"
                  strokeWidth="2"
                  className="check-circle"
                />
                <path
                  d="M15 27 l7 7 l15 -16"
                  stroke="var(--gold)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="check-mark"
                />
              </svg>
              <div className="contact-success-title">Thank you.</div>
              <p className="contact-success-copy">
                Your message is in. We&rsquo;ll be in touch within one business day
                &mdash; usually much sooner.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="contact-form">
              <label className="contact-field">
                <span className="contact-field-label">Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </label>
              <div className="contact-field-row">
                <label className="contact-field">
                  <span className="contact-field-label">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                  />
                </label>
                <label className="contact-field">
                  <span className="contact-field-label">Phone</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(optional)"
                  />
                </label>
              </div>
              <label className="contact-field">
                <span className="contact-field-label">How can we help?</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Buying, selling, or just exploring…"
                />
              </label>
              <button type="submit" disabled={status === 'sending'} className="contact-submit">
                {status === 'sending' ? 'Sending…' : 'Book a consultation'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
