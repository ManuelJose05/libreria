import {createContext, ReactNode, useState} from "react";
import {Libro} from "../interfaces/libro.interface.ts";
import axios from "axios";
import {Autor} from "../interfaces/autor.interface.ts";
import {Genero} from "../interfaces/genero.interface.ts";
import {formatDate} from "../utils/Utils.ts";

export interface LibroContextType {
    editorial: Map<string,string>,
    libroDetail?: Libro;
    libros: Libro[];
    autores: Autor[],
    generos: Genero[];
    getLibros: () => Promise<void>;
    getLibroById: (id: string) => Promise<void>;
    getAutores: () => Promise<void>;
    getGeneros: () => Promise<void>;
    getEditorial: () => Promise<void>;
    saveLibro: (libro:Libro) => Promise<void>;
    getLibrosDisponiblesPrestamos: () => Promise<void>;
}


export const LibroContext = createContext<LibroContextType>({
    libros: [],
    editorial: new Map<string,string>,
    getLibros: async () => {},
    getLibroById: async (_id: string) => {},
    getAutores: async () => {},
    getGeneros: async () => {},
    getEditorial: async () => {},
    saveLibro: async (_libro:Libro) => {},
    getLibrosDisponiblesPrestamos: async () => {},
    libroDetail: undefined,
    autores: [],
    generos: []
});

interface LibroProviderWrapperProps {
    children: ReactNode;
}

export function LibroProviderWrapper({children}: LibroProviderWrapperProps) {
    const [libros, setLibros] = useState<Libro[]>([])
    const [libroDetail, setLibroDetail] = useState<Libro>()
    const [autores, setAutores] = useState<Autor[]>([])
    const [generos, setGeneros] = useState<Genero[]>([])
    const [editorial, setEditorial] = useState<Map<string,string>>(new Map())

    const getLibros = async (): Promise<void> => {
        const response = await axios.get("http://192.168.89.253:8005/api/libro/all/")
        setLibros(response.data)
    }

    const getLibrosDisponiblesPrestamos = async (): Promise<void> => {
        const response = await axios.get("http://192.168.89.253:8005/api/libro/disponibles/")
        setLibros(response.data)
    }

    const getLibroById = async (id: string): Promise<void> => {
        const response = await axios.get<Libro>(`http://192.168.89.253:8005/api/libro/search/id/${id}`)
        setLibroDetail(response.data)
    }

    const getAutores = async (): Promise<void> => {
        const response = await axios.get<Autor[]>("http://192.168.89.253:8005/api/autor/all/");

        const updatedAutores = response.data.map((x) => ({
            ...x, fecha_nacimiento: new Date(x.fecha_nacimiento)
        }));
        setAutores(updatedAutores);
    }

    const getGeneros = async (): Promise<void> => {
        const response = await axios.get<Genero[]>("http://192.168.89.253:8005/api/generos/all/");
        setGeneros(response.data);
    }

    const getEditorial = async (): Promise<void> => {
        const response = await axios.get("http://192.168.89.253:8005/api/editoriales/all/");
        setEditorial(response.data);
    }

    const saveLibro = async (libro: Libro): Promise<void> => {
        const libroToJson = {
            ...libro,
            genero: libro.genero.map((x) => x.id),
            fecha_publicacion: formatDate(libro.fecha_publicacion),
            autor: libro.autor.id,
        }
        await axios.post("http://192.168.89.253:8005/api/libro/create/", libroToJson)
    }


    return (
        <LibroContext.Provider value={{libros, getLibros, getLibroById, libroDetail,
            autores,getAutores,
            generos,getGeneros,
            editorial,getEditorial,saveLibro,getLibrosDisponiblesPrestamos
        }}>
            {children}
        </LibroContext.Provider>
    )
}

