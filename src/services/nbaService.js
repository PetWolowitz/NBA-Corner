import axios from 'axios';

const API_KEY = '1ffca8f0-0994-4319-9bba-ed1b97b751ee';

const api = axios.create({
  baseURL: 'https://api.balldontlie.io/v1',
  headers: {
    'Authorization': API_KEY,
    'Accept': 'application/json'
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error Details:', {
      status: error.response?.status,
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });
    return Promise.reject(error);
  }
);

const nbaService = {
  async getTeams() {
    try {
      const response = await api.get('/teams');
      return response.data.data;
    } catch (error) {
      console.error('getTeams error:', error);
      return [];
    }
  },

  async getPlayers(page = 1, perPage = 25, search = '') {
    try {
      const response = await api.get('/players', {
        params: { page, per_page: perPage, search }
      });
      return response.data;
    } catch (error) {
      console.error('getPlayers error:', error);
      return { data: [], meta: { total_pages: 0, current_page: 1 } };
    }
  },

  async getGames(startDate, endDate) {
    try {
      const response = await api.get('/games', {
        params: { 
          'start_date': startDate,
          'end_date': endDate,
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('getGames error:', error);
      return [];
    }
  },

  async getPlayerStats(playerId, season = 2023) {
    try {
      const response = await api.get('/season_averages', {
        params: { player_ids: [playerId], season }
      });
      return response.data.data[0];
    } catch (error) {
      console.error('getPlayerStats error:', error);
      return null;
    }
  },

  async getGameStats(gameId) {
    try {
      const response = await api.get('/stats', {
        params: { game_ids: [gameId] }
      });
      return response.data.data;
    } catch (error) {
      console.error('getGameStats error:', error);
      return [];
    }
  }
};

export default nbaService;