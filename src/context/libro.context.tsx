import {createContext, ReactNode, useState} from "react";
import {Libro} from "../interfaces/libro.interface.ts";
import axios from "axios";

export interface LibroContextType {
    libroDetail: Libro;
    libros: Libro[];
    getLibros: () => Promise<void>;
    getLibroById: (id:string) => Promise<void>;
}

const LibroContext = createContext<LibroContextType | undefined>(undefined);

interface LibroProviderWrapperProps {
    children: ReactNode;
}

function LibroProviderWrapper({children}:LibroProviderWrapperProps) {
    const [libros, setLibros] = useState<Libro[]>([])
    const [libroDetail, setLibroDetail] = useState<Libro>()

    const getLibros = async (): Promise<void> => {
        const response = await axios.get("http://192.168.89.253:8005/api/libro/all/")
        setLibros(response.data)
    }

    const getLibroById = async (id:string): Promise<void> => {
        const response = await axios.get<Libro>(`http://192.168.89.253:8005/api/libro/search/id/${id}`)
        console.log(response.data)
        setLibroDetail(response.data)
    }

    return (
        <LibroContext.Provider value={{libros,getLibros,getLibroById,libroDetail}}>
            {children}
        </LibroContext.Provider>
    )
}


export {LibroProviderWrapper,LibroContext};