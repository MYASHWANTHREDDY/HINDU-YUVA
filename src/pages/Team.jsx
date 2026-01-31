import { useState, useEffect } from 'react';
import { API_URL } from '../constants/api';

function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    loadTeam();
  }, []);

  return (
    <div className="pt-[50px] min-h-screen bg-orange-50 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center text-gray-800">Our Team</h1>
        <p className="text-center text-gray-600 text-lg mb-12">
          Meet the dedicated leaders driving Hindu YUVA at CSUF
        </p>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-600">Loading team members...</p>
          </div>
        ) : team.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105"
              >
                {/* Member Photo */}
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

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-semibold text-lg mb-3">{member.position}</p>
                  {member.bio && (
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg">
            <p className="text-gray-600">No team members yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Team;
