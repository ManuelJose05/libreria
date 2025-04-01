import HeaderComponent from "../components/HeaderComponent.tsx";
import {Card} from "primereact/card";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {Button} from "primereact/button";
import {useContext, useEffect, useState} from "react";
import {UsuarioContext, UsuarioContextType} from "../context/usuarios.context.tsx";
import {LibroContext, LibroContextType} from "../context/libro.context.tsx";
import {PrestamoContext, PrestamosContextType} from "../context/prestamos.context.tsx";

function PrestarLibro() {
    const {usuarios,getUsuarios} = useContext<UsuarioContextType>(UsuarioContext)
    const {libros,getLibrosDisponiblesPrestamos} = useContext<LibroContextType>(LibroContext)
    const {nuevoPrestamo} = useContext<PrestamosContextType>(PrestamoContext)

    const [prestamo, setPrestamo] = useState({
        libro: {
            id: 0, name: ""
        }, usuario: {
            id: 0, name: ""
        }
    })

    useEffect(() => {
        getUsuarios()
        getLibrosDisponiblesPrestamos()
    }, []);


    return (
        <div className="flex flex-column gap-8 items-center justify-content-center w-full">
            <div className="-m-5">
                <HeaderComponent />
            </div>
            <Card title="Prestar Libro" translate="yes" className="w-6 justify-content-center m-auto">
                <div className="flex flex-column gap-3 items-center justify-content-center w-6">
                    <p className="m-0 text-left pl-2 font-bold">Libros disponibles: </p>
                    <Dropdown
                        filter
                        filterPlaceholder="Search by Book Title"
                        options={libros}
                        value={prestamo.libro}
                        optionLabel="name"
                        placeholder="Selecciona un libro"
                        className="m-0 text-left pl-2"
                        onChange={(e: DropdownChangeEvent) =>
                            setPrestamo(prev => ({ ...prev, libro: e.value }))
                        }
                    />
                </div>

                <div className="flex flex-column gap-3 items-center justify-content-center w-6 mt-5">
                    <p className="m-0 text-left pl-2 font-bold">Usuarios: </p>
                    <Dropdown
                        filter
                        filterPlaceholder="Search by Usuario Name"
                        value={prestamo.usuario}
                        placeholder="Selecciona un usuario"
                        options={usuarios}
                        optionLabel="name"
                        className="m-0 text-left pl-2"
                        onChange={(e: DropdownChangeEvent) =>
                            setPrestamo(prev => ({ ...prev, usuario: e.value }))
                        }
                    />
                </div>

                <Button label="Prestar Libro" className="p-button mt-6" onClick={() => {
                    nuevoPrestamo(prestamo.libro.id,prestamo.usuario.id);
                    setPrestamo({
                        libro: {
                            id: 0, name: ""
                        }, usuario: {
                            id: 0, name: ""
                        }
                    })
                }}/>
            </Card>
        </div>
    );
}

export default PrestarLibro;