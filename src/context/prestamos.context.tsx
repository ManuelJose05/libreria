import {Context, createContext, ReactNode, useState} from "react";
import {Prestamo} from "../interfaces/prestamo.interface.ts";
import axios from "axios";

export interface PrestamosContextType {
    prestamos: Prestamo[];
    getAllPrestamos: () => Promise<void>;
    entregaLibro: (idPrestamo:number) => Promise<void>;
    nuevoPrestamo: (idLibro:number,idUsuario:number) => Promise<void>;
}

export const PrestamoContext:Context<PrestamosContextType> = createContext<PrestamosContextType>({
    prestamos: [],
    getAllPrestamos: async () => {},
    entregaLibro: async (_idPrestamo:number) => {},
    nuevoPrestamo: async (_idLibro:number,_idUsuario:number) => {},
})

interface PrestamoContextWrapper {
    children: ReactNode
}

export function PrestamoProvider({children}: PrestamoContextWrapper) {
    const [prestamos, setPrestamos] = useState<Prestamo[]>([])

    const getAllPrestamos = async () => {
        const response = await axios.get<Prestamo[]>("http://192.168.89.253:8005/api/prestamos/all/");
        setPrestamos(response.data);
    }

    const entregaLibro = async (idPrestamo: number) => {
        await axios.get(`http://192.168.89.253:8005/api/prestamos/devolver/${idPrestamo}/`)
        const updatePrestamos = prestamos.map((x) => {
            if (x.id === idPrestamo) x.fecha_devolucion = new Date(Date.now());
            return x;
        })
        setPrestamos(updatePrestamos);
    }

    const nuevoPrestamo = async (idLibro:number,idUsuario:number) => {
       await axios.post("http://192.168.89.253:8005/api/prestamos/create/",{
            usuario: idUsuario,
            libro: idLibro,
        })
    }

    return (
        <PrestamoContext.Provider value={{prestamos,getAllPrestamos,entregaLibro,nuevoPrestamo}}>
            {children}
        </PrestamoContext.Provider>
    )
}