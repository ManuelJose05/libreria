import {MenuItem} from "primereact/menuitem";
import {NavigateFunction, useNavigate} from "react-router-dom";
import "./HeaderComponent.css"
import {Menubar} from "primereact/menubar";
import {AutoComplete} from "primereact/autocomplete";


function HeaderComponent() {
    const navigate:NavigateFunction = useNavigate();

    const menuItem: MenuItem[] = [
        {
            label: "Home",
            icon: "pi pi-home",
            command: () => {
                return navigate("/");
            },
        },
        {
            label: "Listado de Libros",
            icon: "pi pi-list",
            command: () => {
                return navigate("/list");
            },
        },
        {
            label: "Añadir Libro",
            icon: "pi pi-plus",
            command: () => navigate("/libros/new"),
        },
        {
            label: "Usuarios",
            icon: "pi pi-user",
            command: () => navigate("/usuarios/list"),
        },
        {
            label: "Prestar Libro",
            icon: "pi pi-tag",
            command: () => navigate("/libros/new-prestamo"),
        }
    ]

    const end = <AutoComplete placeholder="Buscar Libro" type="text" style={{width:'20rem'}} />

    return (
        <header>
            <Menubar
                model={menuItem}
                end={end}
                style={{ width: '100%' }}
            />
        </header>
    );
}

export default HeaderComponent;