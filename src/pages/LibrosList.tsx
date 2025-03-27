import HeaderComponent from "../components/HeaderComponent.tsx";
import {LibroContext} from "../context/libro.context.tsx";
import {useContext, useEffect} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useNavigate} from "react-router-dom";

function LibrosList() {
    const {libros,getLibros} = useContext(LibroContext);
    const navigate = useNavigate();

    useEffect(() => {
        getLibros();
    },[])

    const onColumnClick = (e) => {
        return navigate(`/libros/${e.data.id}`);
    }


    return (
        <>
            <div className="flex flex-column gap-1 items-center justify-center">
                <div className="-m-5">
                    <HeaderComponent/>
                </div>
                <div className="card w-full">
                    <h4 className="text-3xl">Listado de Libros</h4>
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