import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import LibrosList from "./pages/LibrosList.tsx";
import LibroDetail from "./pages/LibroDetail.tsx";
import {FC, lazy, LazyExoticComponent, Suspense} from "react";

const AddLibro:LazyExoticComponent<FC> =lazy(() => import("./pages/AddLibro.tsx"))
const UsuariosList:LazyExoticComponent<FC> = lazy(() => import("./pages/UsuariosList.tsx"));
const PrestarLibro:LazyExoticComponent<FC> = lazy(() => import("./pages/PrestarLibro.tsx"))

function App() {

  return (
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/list" element={<LibrosList />}/>
            <Route path="/libros/:id" element={<LibroDetail />}/>
            <Route path="/libros/new" element={<AddLibro />}/>
            <Route path="/usuarios/list" element={<UsuariosList />}/>
            <Route path="/libros/new-prestamo" element={<PrestarLibro />}/>
        </Routes>
    </Suspense>
  )
}

export default App
