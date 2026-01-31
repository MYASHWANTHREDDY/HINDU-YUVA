import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../constants/api';

function About() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSection = params.get('section') || 'mission';
  const [openSection, setOpenSection] = useState(initialSection);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    setOpenSection(initialSection);
  }, [initialSection]);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const response = await fetch(`${API_URL}/api/team`);
        if (response.ok) {
          const data = await response.json();
          setTeam(data);
        }
      } catch (error) {
        console.error('Error loading team:', error);
      }
    };

    if (openSection === 'team') {
      loadTeam();
    }
  }, [openSection]);

  return (
    <div className="pt-[50px] min-h-screen bg-orange-50 p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          About Hindu YUVA at CSUF
        </h1>
      {/* Sections */}
      {openSection === 'mission' && (
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-orange-700 mb-2">Mission & Vision</h2>
          <p className="text-gray-700 text-2xl mb-4 text-justify">
            Our mission is to foster a vibrant Hindu community at California State University,
            Fullerton, promote cultural awareness, and empower students through events, service, and
            leadership opportunities. Our vision is to inspire and connect Hindu youth, nurturing
            future leaders who uphold the values of dharma, unity, and service.
          </p>
        </section>
      )}
      {openSection === 'team' && (
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-orange-700 mb-8">Team</h2>
          {team.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  {member.image && (
                    <div className="h-64 bg-gray-200 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-orange-600 font-semibold mb-3">{member.role}</p>
                    {member.bio && (
                      <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Loading team members...</p>
          )}
        </section>
      )}
      {openSection === 'timeline' && (
        <section>
          <h2 className="text-3xl font-bold text-orange-700 mb-2">Timeline</h2>
          <ul className="text-2xl list-disc list-inside text-gray-700">
            <li className="whitespace-nowrap">Jan 2024: Hindu YUVA chapter founded at CSUF.</li>
            <li className="whitespace-nowrap">
              Mar 2024: First major cultural event and service project.
            </li>
            <li className="whitespace-nowrap">
              Aug 2024: Growth in membership and leadership initiatives.
            </li>
            <li className="whitespace-nowrap">
              Jan 2025: Expanded outreach and new collaborations.
            </li>
          </ul>
        </section>
      )}
    </div>
    </div>
  );
}
export default About;
