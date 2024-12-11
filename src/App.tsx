import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CurrentEmployee from "./pages/CurrentEmployee";
import Header from "./components/Header/Header";
import Logo from './assets/logo.png';

function App() {
  return (
    <Router>
      <Header logoSrc={Logo} />
      <main className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<CurrentEmployee />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
