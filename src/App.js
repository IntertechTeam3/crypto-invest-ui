import {
  HashRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/Home/Home";
import Parent from "./pages/Parent/Parent";
import ChildPage from "./pages/child/ChildPage";
import MainPage from "./pages/MainPage";
import ChildList from "./pages/ChildList";

function App() {
  return (
    <div>
      <div>
        <Router>
          <Routes>
            <Route path="/kids" element={<ChildList />} />
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/parent" element={<Parent />} />
            <Route exact path="/child" element={<ChildPage />} />
            <Route exact path="/admin" element={<MainPage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
