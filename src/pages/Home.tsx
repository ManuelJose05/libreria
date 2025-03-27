import CustomChipComponent from "../components/CustomChipComponent.tsx";
import HeaderComponent from "../components/HeaderComponent.tsx";
import {useContext, useEffect} from "react";
import {LibroContext} from "../context/libro.context.tsx";


function Home() {
    const {libros,getLibros} = useContext(LibroContext);

    useEffect(() => {
        getLibros();
    }, []);

    return (
        <>
            <div className="flex flex-column gap-7 items-center justify-center">
                <div className="-m-5">
                    <HeaderComponent/>
                </div>
                <div className="grid justify-content-center gap-5">
                    <CustomChipComponent title="Total de Libros" value={libros.length} iconClass="pi pi-book text-xl" />
                    <CustomChipComponent title="Libros Prestados" value={libros.length} iconClass="pi pi-book text-xl" />
                    <CustomChipComponent title="Usuarios Registrados" value={libros.length} iconClass="pi pi-users text-xl" />
                </div>
            </div>
        </>
    );
}

export default Home;