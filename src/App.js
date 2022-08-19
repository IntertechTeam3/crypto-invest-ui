import './App.css';
import React from 'react';
import Home from '../src/Pages/Home/Home';
import Parent from '../src/Pages/Parent/parent';
import Child from '../src/Pages/Child/child';
import ChildList from '../src/Pages/Others/childList/childlist'
import Orders from '../src/Pages/Others/Orders/orders'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route exact path='/'  element={<Home />} />
                <Route exact path='/parent'  element={<Parent />} />
                <Route exact path='/child'  element={<Child />} />
                <Route exact path='/parent/childlist'  element={<ChildList />} />
                <Route exact path='/parent/orders'  element={<Orders />} />
                
            </Routes>  
        </Router>    
    </div>
  );
}

export default App;
