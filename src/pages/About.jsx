import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function About() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSection = params.get("section") || "mission";
  const [openSection, setOpenSection] = useState(initialSection);

  useEffect(() => {
    setOpenSection(initialSection);
  }, [initialSection]);

  return (
    <div className="pt-[20vh] p-10 pl-70 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 whitespace-nowrap">About Hindu YUVA at CSUF</h1>
      {/* Sections */}
      {openSection === 'mission' && (
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-orange-700 mb-2">Mission & Vision</h2>
          <p className="text-gray-700 text-2xl mb-4 text-justify">Our mission is to foster a vibrant Hindu community at California State University, Fullerton, promote cultural awareness, and empower students through events, service, and leadership opportunities. Our vision is to inspire and connect Hindu youth, nurturing future leaders who uphold the values of dharma, unity, and service.</p>
        </section>
      )}
      {openSection === 'team' && (
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-orange-700 mb-2">Team</h2>
          <ul className="text-2xl list-disc list-inside text-gray-700">
            <li className="whitespace-nowrap">President: Dev Vyas</li>
            <li className="whitespace-nowrap">Vice President: Skanda</li>
            <li className="whitespace-nowrap">Secretary: Shalaka Sanap</li>
            <li className="whitespace-nowrap">Treasurer: Gaurav</li>
            <li className="whitespace-nowrap">Event Coordinators: Indrayani Bhoshle</li>
            <li className="whitespace-nowrap">Faculty Advisor: Kanika Sood</li>
            <li className="whitespace-nowrap">Advisor: Yashwanth Mallareddygari</li>
          </ul>
        </section>
      )}
      {openSection === 'timeline' && (
        <section>
          <h2 className="text-3xl font-bold text-orange-700 mb-2">Timeline</h2>
            <ul className="text-2xl list-disc list-inside text-gray-700">
              <li className="whitespace-nowrap">Jan 2024: Hindu YUVA chapter founded at CSUF.</li>
              <li className="whitespace-nowrap">Mar 2024: First major cultural event and service project.</li>
              <li className="whitespace-nowrap">Aug 2024: Growth in membership and leadership initiatives.</li>
              <li className="whitespace-nowrap">Jan 2025: Expanded outreach and new collaborations.</li>
            </ul>
        </section>
      )}
    </div>
  );
}
export default About;
