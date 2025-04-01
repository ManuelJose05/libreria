import  {useContext, useEffect, useState} from 'react';
import HeaderComponent from "../components/HeaderComponent.tsx";
import {UsuarioContext, UsuarioContextType} from "../context/usuarios.context.tsx";
import {DataTable, DataTableRowClickEvent, DataTableRowToggleEvent} from "primereact/datatable";
import {Column} from "primereact/column";
import UsuarioUpdateForm from "../components/UsuarioUpdateForm.tsx";
import {Usuario} from "../interfaces/usuario.interface.ts";
import {Button} from "primereact/button";
import {PrestamoContext, PrestamosContextType} from "../context/prestamos.context.tsx";
import {Prestamo} from "../interfaces/prestamo.interface.ts";
import {Tag} from "primereact/tag";

function UsuariosList() {
    const {usuarios,getUsuarios,setUsuario} = useContext<UsuarioContextType>(UsuarioContext);
    const {prestamos,getAllPrestamos,entregaLibro} = useContext<PrestamosContextType>(PrestamoContext);

    const [editMode, setEditMode] = useState(false)
    const [addUserMode, setAddUserMode] = useState(false)
    const [exapandedRows, setExapandedRows] = useState([])

    useEffect(() => {
        getUsuarios();
        getAllPrestamos();
    }, []);

    useEffect(() => {

    }, [prestamos]);


    const onRowClick = (row: DataTableRowClickEvent) => {
        setEditMode(true)
        setAddUserMode(false)
        setUsuario(row.data as Usuario)
    }

    const onNewUsuario = () => {
        setUsuario({
            id: 0,
            name: "", email: "",tlf: 0,dni: "",direccion: "",cp: 0
        })
        setEditMode(false)
        setAddUserMode(true)
    }

    const prestamoStatus = (entregado: boolean,idPrestamo: number) => {
        return <Tag onClick={() => {
            if (!entregado) {
                return entregaLibro(idPrestamo)
            }
            return null;
        }} value={entregado ? "Entregado" : "Sin Entregar"} severity={entregado ? "success" : "warning"}/>
    }

    const rowExpansionTemplate = (data: Usuario) => {
        const librosPrestados = prestamos.filter(
            (prestamo: Prestamo) => prestamo.usuario.dni === data.dni
        );
        return (
            <div className="orders-subtable">
                <h5>Libros</h5>
                <DataTable value={librosPrestados} emptyMessage="Actualmente no tiene ningún libro.">
                    <Column header="Estado Préstamo" body={data1 => {
                        return prestamoStatus(data1.fecha_devolucion != null, data1.id)
                    }}
                    />
                    <Column sortable field="id" header="ID" filter filterPlaceholder="Filter by id" />
                    <Column sortable field="libro.isbn" header="ISBN" filter filterPlaceholder="Filter by id" />
                    <Column sortable field="libro.name" header="Título" filter filterPlaceholder="Filter by id" />
                    <Column sortable field="fecha_prestamo" header="Fecha Prestamo" body={(data) => {
                        return new Date(data.fecha_prestamo).toLocaleDateString();
                    }} />
                    <Column sortable field="fecha_devolucion" header="Fecha de Entrega" body={(data1) => {
                        return data1.fecha_devolucion ? new Date(data1.fecha_devolucion).toLocaleDateString() : 'Sin Entregar';
                    }}/>
                </DataTable>
            </div>
        );
    };



    return (
        <>
            <div className="flex flex-column gap-7 items-center justify-center w-full">
                <div className="-m-5">
                    <HeaderComponent/>
                </div>
                <div className="card">
                    <h3 className="p-card-title mt-0 font-italic text-2xl">Listado de Usuarios</h3>
                    <Button label="Nuevo Usuario" className="mb-4" onClick={onNewUsuario}/>
                    <DataTable
                        expandedRows={exapandedRows}
                        onRowToggle={(e: DataTableRowToggleEvent) => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            setExapandedRows(e.data)
                            setEditMode(false)
                            setAddUserMode(false)
                        }}
                        rowExpansionTemplate={rowExpansionTemplate}
                        value={usuarios} paginator rows={7}
                        rowsPerPageOptions={[5, 10, 25]} onRowClick={onRowClick}
                        tableStyle={{ minWidth: '50rem' }}
                        emptyMessage="No se encontraron usuarios"
                    >
                        <Column expander style={{ width: '3em' }} />
                        <Column field="dni" header="DNI" filter filterPlaceholder="Filter by DNI" sortable style={{width: '25%'}}/>
                        <Column field="name" header="Nombre" filter filterPlaceholder="Filter by Name" sortable style={{ width: '25%' }}></Column>
                        <Column field="email" header="Email" sortable style={{ width: '25%' }}></Column>
                        <Column field="tlf" header="Teléfono" sortable style={{ width: '25%' }}></Column>
                        <Column field="direccion" header="Dirección" sortable style={{ width: '25%' }}></Column>
                        <Column field="cp" header="Código Postal" sortable style={{ width: '25%' }}></Column>
                    </DataTable>
                </div>
                {
                    (editMode || addUserMode) && <UsuarioUpdateForm editMode={editMode} addUserMode={addUserMode}/>
                }

            </div>
        </>
    );
}

export default UsuariosList;