import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from './components/layout'
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
// import NotFound from './pages/NotFound'; // Página 404

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="chat/:botId" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
