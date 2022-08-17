import './App.css';
import React from 'react';
import Home from '../src/Pages/Home/Home';
import Parent from '../src/Pages/Parent/parent';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route exact path='/'  element={<Home />} />
                <Route exact path='/parent'  element={<Parent />} />
            </Routes>  
        </Router>    
    </div>
  );
}

export default App;
