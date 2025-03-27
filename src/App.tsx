import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import LibrosList from "./pages/LibrosList.tsx";
import LibroDetail from "./pages/LibroDetail.tsx";
import {Suspense} from "react";

function App() {

  return (
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/list" element={<LibrosList />}/>
            <Route path="/libros/:id" element={<LibroDetail />}/>
        </Routes>
    </Suspense>
  )
}

export default App
