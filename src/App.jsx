import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Players from './pages/Players';
import Schedule from './pages/Schedule';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/players" element={<Players />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;