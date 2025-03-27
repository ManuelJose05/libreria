import {MenuItem} from "primereact/menuitem";
import {NavigateFunction, useNavigate} from "react-router-dom";
import "./HeaderComponent.css"
import {InputText} from "primereact/inputtext";
import {Menubar} from "primereact/menubar";


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
        }
    ]

    const end = <InputText placeholder="Buscar Libro" type="text" style={{width:'20rem'}} />

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