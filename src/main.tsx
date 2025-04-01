import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import 'primeicons/primeicons.css';
import "../node_modules/primeflex/primeflex.css"
import {LibroProviderWrapper} from "./context/libro.context.tsx";
import {UsuarioProvider} from "./context/usuarios.context.tsx";
import {PrestamoProvider} from "./context/prestamos.context.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <LibroProviderWrapper>
            <UsuarioProvider>
                <PrestamoProvider>
                    <App />
                </PrestamoProvider>
            </UsuarioProvider>
        </LibroProviderWrapper>
    </BrowserRouter>
)
