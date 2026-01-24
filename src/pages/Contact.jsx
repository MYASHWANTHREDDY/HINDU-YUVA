import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission - you can connect this to a backend later
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[200px] p-10 min-h-screen bg-orange-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-700 mb-3">Get In Touch</h1>
          <p className="text-gray-600 text-lg">
            Have questions? Want to attend an event? Or just want to say hello? We'd love to hear from you!
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-orange-700 mb-8">Contact Information</h2>

            {/* Email */}
            <div className="mb-6 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <span className="text-3xl">✉️</span>
                <div>
                  <h3 className="font-bold text-lg text-orange-700 mb-1">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:info@hinduyuvacusf.com" className="text-orange-600 hover:text-orange-700 no-underline font-semibold">
                      info@hinduyuvacusf.com
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="mb-6 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h3 className="font-bold text-lg text-orange-700 mb-1">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+16572785555" className="text-orange-600 hover:text-orange-700 no-underline font-semibold">
                      (657) 278-5555
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Available during club hours</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📍</span>
                <div>
                  <h3 className="font-bold text-lg text-orange-700 mb-1">Meeting Location</h3>
                  <p className="text-gray-600">
                    <strong>Student Center, Room 201</strong>
                  </p>
                  <p className="text-sm text-gray-500">California State University, Fullerton</p>
                  <p className="text-sm text-gray-500">Fullerton, CA 92834</p>
                </div>
              </div>
            </div>

            {/* Meeting Times */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🕐</span>
                <div>
                  <h3 className="font-bold text-lg text-orange-700 mb-1">Meeting Schedule</h3>
                  <p className="text-gray-600">
                    <strong>Fridays</strong>
                  </p>
                  <p className="text-sm text-gray-500">5:00 PM - 7:00 PM</p>
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Events:</strong> Check the Events page for dates and times
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-orange-700 mb-8">Send us a Message</h2>

            {submitted && (
              <div className="mb-6 bg-green-100 border-2 border-green-500 rounded-lg p-6 text-center">
                <p className="text-green-800 font-semibold text-lg mb-1">✓ Message Sent!</p>
                <p className="text-green-700">
                  Thank you for reaching out. We'll get back to you soon!
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
              {/* Name */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  placeholder="(XXX) XXX-XXXX"
                />
              </div>

              {/* Subject */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  placeholder="What is this about?"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
                  placeholder="Tell us more..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-orange-700 mb-6 text-center">Find Us on Campus</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              title="Hindu YUVA at CSUF Location"
              width="100%"
              height="400"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.5787469635236!2d-117.88460232346897!3d33.88370076434235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd62ff12a0001%3A0x5c1f0b7f5e8b8b8b!2sStudent%20Center%2C%20California%20State%20University%2C%20Fullerton!5e0!3m2!1sen!2sus!4v1705700000000"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <p className="text-center text-gray-600 mt-4">
            Located in the Student Center, Room 201. Look for our purple and orange decorations!
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-orange-700 mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg text-orange-700 mb-2">Who can join Hindu YUVA?</h3>
              <p className="text-gray-700">
                All CSUF students are welcome to join! You don't need to be Hindu or have any prior cultural knowledge. We welcome everyone interested in learning about and celebrating Hindu culture.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-orange-700 mb-2">When do you meet?</h3>
              <p className="text-gray-700">
                We meet every Friday from 5:00 PM to 7:00 PM in the Student Center, Room 201. Special events may have different times, so check our Events page!
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-orange-700 mb-2">Do I need to be a member to attend events?</h3>
              <p className="text-gray-700">
                No! Everyone is welcome to attend our events. However, we encourage you to join our mailing list to stay updated on upcoming activities.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-orange-700 mb-2">How do I stay updated on events?</h3>
              <p className="text-gray-700">
                Follow us on Instagram (@hinduyuvacusf) and subscribe to our mailing list on the Join Us page for regular updates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
