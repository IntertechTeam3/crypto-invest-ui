import './App.css';
import React from 'react';
import Home from '../src/Pages/Home/Home';
import Parent from '../src/Pages/Parent/Parent';
import Child from '../src/Pages/Child/child';
import ChildList from '../src/Pages/Others/childList/childlist';
import Orders from '../src/Pages/Others/Orders/orders';
import Admin from '../src/Pages/Admin/admin';
import Users from '../src/Pages/Others/users/users';
import Hash from '../src/Pages/Others/hash/hash';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route exact path='/'  element={<Home />} />
                <Route exact path='/parent'  element={<Parent />} />
                <Route exact path='/child'  element={<Child />} />
                <Route exact path='/admin'  element={<Admin />} />
                <Route exact path='/childlist'  element={<ChildList />} />
                <Route exact path='/orders'  element={<Orders />} />
                <Route exact path='/users'  element={<Users />} />
                <Route exact path='/hash'  element={<Hash />} />
            </Routes>  
        </Router>    
    </div>
  );
}

export default App;
