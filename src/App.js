import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/layout/Header';
import Characters from './components/Characters';
import Locations from './components/Locations';
import Episodes from './components/Episodes';
import LocationDetails from './components/LocationDetails';
import EpisodeDetails from './components/EpisodeDetails';
import CharacterDetails from './components/CharacterDetails';

// Context
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
    <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Characters />} />
              <Route path="/character/:id" element={<CharacterDetails />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/locations/:id" element={<LocationDetails />} />
              <Route path="/episodes" element={<Episodes />} />
              <Route path="/episodes/:id" element={<EpisodeDetails />} />
            </Routes>
          </main>
    </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
