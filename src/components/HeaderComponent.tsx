import {MegaMenu} from "primereact/megamenu";
import {MenuItem} from "primereact/menuitem";
import {NavigateFunction, useNavigate} from "react-router-dom";
import "./HeaderComponent.css"


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

    return (
            <div className="card">
                <MegaMenu model={menuItem} orientation="horizontal" breakpoint="960px" className="p-3 surface-0 shadow-2" />
            </div>
    );
}

export default HeaderComponent;