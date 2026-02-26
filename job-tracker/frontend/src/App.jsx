import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import Activities from './pages/Activities';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddJob />} />
          <Route path="/activities" element={<Activities />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;