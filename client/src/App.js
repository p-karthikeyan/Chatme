import React from 'react';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Onboarding from './pages/onboarding';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

const App=()=> {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/onboarding" element={<Onboarding/>}/>
      </Routes>
    </Router>
  );
}
export default App;
