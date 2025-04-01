import {Usuario} from "../interfaces/usuario.interface.ts";
import {createContext, ReactNode, useState} from "react";
import axios from "axios";

export interface UsuarioContextType {
    usuario?: Usuario;
    usuarios: Usuario[];
    getUsuarios: () => Promise<void>;
    setUsuario: (usuario: Usuario) => void;
    setUsuarios: (usuarios: Usuario[]) => void;
    updateUsuario: (usuario: Usuario) => void;
    deleteUsuario: (id: number) => void;
    addUsuario: (usuario: Usuario) => void;
}

export const UsuarioContext = createContext<UsuarioContextType>({
    usuario: undefined,
    usuarios: [],
    getUsuarios: async () => {},
    updateUsuario: (_update: Usuario) => {},
    setUsuario: (_update: Usuario) => {},
    setUsuarios: (_usuarios: Usuario[]) => {},
    deleteUsuario: (_id: number) => {},
    addUsuario: (_usuario: Usuario) => {},
})

interface UsuarioProviderWrapper {
    children: ReactNode;
}

export const UsuarioProvider = ({ children }:UsuarioProviderWrapper) => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [usuario, setUsuario] = useState<Usuario>()

    const getUsuarios = async (): Promise<void> => {
        const response = await axios.get<Usuario[]>("http://192.168.89.253:8005/api/usuario/all/")
        setUsuarios(response.data)
    }

    const updateUsuario = async (data: Usuario) => {
        setUsuarios(prevUsuarios =>
            prevUsuarios.map(user => user.id === data.id ? data : user)
        );
        await axios.put(`http://192.168.89.253:8005/api/usuario/update/${data.id}/`,data)
    }

    const deleteUsuario = async (id: number) => {
        await axios.delete(`http://192.168.89.253:8005/api/usuario/delete/${id}/`)
    }

    const addUsuario = async (data: Usuario) => {
        await axios.post(`http://192.168.89.253:8005/api/usuario/create/`, data)
        setUsuarios(prevUsuarios => [...prevUsuarios, data])
    }


    return (
        <UsuarioContext.Provider value={{usuarios,usuario,getUsuarios,updateUsuario,setUsuario,deleteUsuario,addUsuario,setUsuarios}}>
            {children}
        </UsuarioContext.Provider>
    )
}