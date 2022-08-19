import ChildList from "./pages/ChildList.js";
import {
  HashRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/Home/Home";
import Parent from "./pages/Parent/parent";

function App() {
  return (
    <div>
      <div>
        <Router>
          <Routes>
            <Route path="/kids" element={<ChildList />} />
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/parent" element={<Parent />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
