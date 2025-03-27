import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import LibrosList from "./pages/LibrosList.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/list" element={<LibrosList />}/>
    </Routes>
  )
}

export default App
