import React, { useState, useEffect } from 'react';
import NBAService from '../services/nbaService';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await NBAService.getTeams();
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div className="text-center p-8 text-white">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-black text-white mb-8">NBA TEAMS</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-lg shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-xl font-black mb-2">{team.full_name}</h2>
            <div className="text-gray-600">
              <p><span className="font-bold">City:</span> {team.city}</p>
              <p><span className="font-bold">Conference:</span> {team.conference}</p>
              <p><span className="font-bold">Division:</span> {team.division}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;