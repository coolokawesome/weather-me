import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Splash from './components/SplashPage';
import LocationPage from './components/LocationPage';
import Dashboard from './components/Dashboard';
import Bootstrap from './bootstrap.min.css';
import './index.css';


function App() {
  return (

    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <TransitionGroup>
      <Routes>
        <Route exact path="/" element={<Splash />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </TransitionGroup>
  </BrowserRouter>
  );
}

export default App;