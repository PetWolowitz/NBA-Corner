import React, { useEffect, useState } from 'react';
import NBAService from '../services/nbaService';

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const gamesData = await NBAService.getGames(today, today);
        setGames(gamesData);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <section className="mb-12">
        <h2 className="text-3xl font-black mb-6 text-white">TODAY'S GAMES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.length > 0 ? (
            games.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-lg shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-black">{game.home_team.full_name}</div>
                  <div className="text-2xl font-black text-red-600">VS</div>
                  <div className="text-lg font-black">{game.visitor_team.full_name}</div>
                </div>
                <div className="text-center text-gray-600 font-bold">
                  {game.status === "Final" ? "Final" : game.time}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-white">
              No games scheduled for today
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;