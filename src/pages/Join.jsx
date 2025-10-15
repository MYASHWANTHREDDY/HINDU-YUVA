import { useState } from "react";

function Join() {
  const ENDPOINT = "https://v1.nocodeapi.com/hinduyuva_csuf/google_sheets/SryTjojDbvjsnBhb?tabId=Sheet1";
  const [form, setForm] = useState({ name: "", email: "", phone: "", interests: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const body = [[form.name, form.email, form.phone, form.interests]];
      console.log('Submitting to NoCodeAPI:', JSON.stringify(body));
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", interests: "" });
      } else {
        const errorText = await response.text();
        setError(`Submission failed. Response: ${errorText}`);
      }
    } catch (err) {
      setError(`Network or code error: ${err.message || err}`);
    }
    setLoading(false);
  };

  return (
    <div className="pt-[200px] p-10 min-h-screen bg-orange-50 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-8 text-orange-700">Join Hindu YUVA at CSUF</h1>
      <div className="max-w-xl w-full bg-white rounded-2xl shadow p-8 mb-8">
        <h2 className="text-2xl font-bold text-orange-700 mb-4">Membership Benefits</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Connect with fellow Hindu students</li>
          <li>Participate in cultural, service, and leadership events</li>
          <li>Access exclusive resources and workshops</li>
          <li>Be part of a vibrant, supportive community</li>
        </ul>
        <h2 className="text-xl font-bold text-orange-700 mb-2">How to Join</h2>
        <p className="text-gray-700 mb-4">Fill out the form below and our team will contact you soon!</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required className="border rounded px-4 py-2" />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" required className="border rounded px-4 py-2" />
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required className="border rounded px-4 py-2" />
          <textarea name="interests" value={form.interests} onChange={handleChange} placeholder="Your interests or questions" rows={3} className="border rounded px-4 py-2" />
          <button type="submit" className="bg-orange-600 text-white font-bold py-2 px-6 rounded hover:bg-orange-700 transition" disabled={loading}>
            {loading ? "Submitting..." : "Join Now"}
          </button>
        </form>
        {submitted && (
          <div className="mt-4 text-green-600 font-bold">Thank you for joining! We will contact you soon.</div>
        )}
        {error && (
          <div className="mt-4 text-red-600 font-bold">{error}</div>
        )}
      </div>
      <div className="max-w-xl w-full bg-orange-100 rounded-2xl shadow p-8 text-center">
        <h2 className="text-xl font-bold text-orange-700 mb-2">Contact Us</h2>
        <p className="text-gray-700 mb-4">For questions, email us at <a href="mailto:hinduyuva.csufullerton@gmail.com" className="text-orange-700 underline">hinduyuva.csufullerton@gmail.com</a> or connect on social media:</p>
        <div className="flex justify-center gap-6">
          <a href="https://www.instagram.com/hinduyuva_csuf/" target="_blank" rel="noopener noreferrer" className="text-orange-700 font-bold hover:text-orange-800">Instagram</a>
          <a href="#" className="text-orange-700 font-bold hover:text-orange-800">Facebook</a>
          <a href="https://chat.whatsapp.com/BXqWtIOTWIl9Ud8TYDL7Hm" target="_blank" rel="noopener noreferrer" className="text-orange-700 font-bold hover:text-orange-800">WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
export default Join;
