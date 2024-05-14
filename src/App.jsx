import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Coin from "./pages/Coin";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route  path="/" element={<Home/>} ></Route>
          <Route  path="/coin/:id" element={<Coin/>} ></Route>
        </Routes>
      </Router>
    </div>
  );  
}

export default App;



