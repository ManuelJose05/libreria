import HeaderComponent from "../components/HeaderComponent.tsx";
import {LibroContext} from "../context/libro.context.tsx";
import { useContext, useEffect} from "react";
import {DataTable, DataTableRowClickEvent} from "primereact/datatable";
import {Column} from "primereact/column";
import {useNavigate} from "react-router-dom";

function LibrosList() {
    const {libros,getLibros} = useContext(LibroContext);
    const navigate = useNavigate();

    useEffect(() => {
        getLibros();
    },[])

    const onColumnClick = (e:DataTableRowClickEvent) => {
        return navigate(`/libros/${e.data.id}`);
    }


    return (
        <>
            <div className="flex flex-column gap-3 items-center justify-center w-full">
                <div className="-m-2">
                    <HeaderComponent/>
                </div>
                <div className="justify-content-center items-center">
                    <h4 className="text-3xl text-center">Listado de Libros</h4>
                    <DataTable
                        globalFilterMatchMode="contains"
                        filterDisplay="menu"
                        dataKey="id"
                        value={libros}
                        paginator rows={5}
                        rowsPerPageOptions={[5, 10, 15,20]}
                        tableStyle={{ minWidth: '50rem' }}
                        emptyMessage="No se ha encontrado ningún Libro"
                        onRowClick={onColumnClick}
                    >
                        <Column className="row"  field="name" header="Nombre" style={{width: '25%'}}/>
                        <Column  field="isbn" header="ISBN" style={{ width: '25%' }}></Column>
                        <Column  field="descripcion" header="Decripción" style={{ width: '50%' }}></Column>
                        <Column  field="editorial" header="Editorial" style={{ width: '25%' }}></Column>
                        <Column field="cantidad" header="NºLibros" style={{ width: '25%' }}></Column>
                        <Column field="autor.name" header="Autor" style={{ width: '25%' }}></Column>
                        <Column  field="fecha_publicacion" header="Fecha Publicación" style={{ width: '25%' }}></Column>
                    </DataTable>
                </div>
            </div>
        </>
    );
}

export default LibrosList;