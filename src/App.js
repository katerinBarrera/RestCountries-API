import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Details from "./pages/Details";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Index />} />
          <Route path="details/:name" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
