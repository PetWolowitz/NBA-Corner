import React, { useState, useEffect } from 'react';
import NBAService from '../services/nbaService';

const Schedule = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Fetch games for a week starting from selected date
        const endDate = new Date(selectedDate);
        endDate.setDate(endDate.getDate() + 6);
        const endDateStr = endDate.toISOString().split('T')[0];
        
        const gamesData = await NBAService.getGames(selectedDate, endDateStr);
        setGames(gamesData);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [selectedDate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="text-center p-8 text-white">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-black text-white mb-8">NBA SCHEDULE</h1>
      
      {/* Date Selector */}
      <div className="mb-8">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Games Schedule */}
      <div className="space-y-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-lg shadow-2xl p-6 transform hover:scale-102 transition-transform duration-300"
          >
            <div className="text-sm text-gray-600 mb-2">{formatDate(game.date)}</div>
            <div className="flex justify-between items-center">
              <div className="space-y-2 flex-1">
                <div className="text-xl font-black">{game.home_team.full_name}</div>
                <div className="text-xl font-black">{game.visitor_team.full_name}</div>
              </div>
              <div className="text-center px-8">
                <div className="text-2xl font-black text-red-600">VS</div>
                <div className="text-sm font-bold mt-2">
                  {game.status === "Final" 
                    ? `${game.home_team_score} - ${game.visitor_team_score}` 
                    : game.status}
                </div>
              </div>
            </div>
          </div>
        ))}

        {games.length === 0 && (
          <div className="text-center text-white text-xl">
            No games scheduled for the selected period
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;