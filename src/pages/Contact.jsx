import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

const details = [
  { icon: Mail, title: "Email us", text: "zooyabeauty12@gmail.com" },
  { icon: Phone, title: "Call us", text: "+91 12345 67890" },
  { icon: Clock3, title: "Store hours", text: "Mon–Sun, 10:00 AM–6:00 PM IST" },
  { icon: MapPin, title: "Our studio", text: "2nd floor,SSK Building,Anna Salai, Chennai." }
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !form.subject.trim() || form.message.trim().length < 10) {
      setStatus("Please complete all fields with a valid email and message.");
      return;
    }
    setStatus("Thank you — our team will be in touch shortly.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="section contact-page">
      <div className="container">
        <div className="page-intro contact-intro">
          <p className="eyebrow">LET'S TALK</p>
          <h1>How can we make<br />your day <em>more beautiful?</em></h1>
          <p>Questions, thoughts, or a little help finding your next favourite — our team is here.</p>
        </div>

        <div className="contact-layout">
          <section className="contact-details">
            {details.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <div className="feature-icon"><Icon size={20} /></div>
                <div><h2>{title}</h2><p>{text}</p></div>
              </article>
            ))}
          </section>

          <form className="contact-form" onSubmit={submit} noValidate>
            <div className="form-grid">
              <label className="form-field"><span>Your name</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" /></label>
              <label className="form-field"><span>Email address</span><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
              <label className="form-field full-width"><span>Subject</span><input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" /></label>
              <label className="form-field full-width"><span>Your message</span><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us a little more..." /></label>
            </div>
            {status && <p className={status.startsWith("Thank") ? "form-success" : "form-error"}>{status}</p>}
            <button className="button button-primary" type="submit">Send message</button>
          </form>
        </div>
      </div>
    </main>
  );
}