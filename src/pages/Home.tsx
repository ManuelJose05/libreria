import HeaderComponent from "../components/HeaderComponent.tsx";
import {useContext, useEffect, useState} from "react";
import {LibroContext, LibroContextType} from "../context/libro.context.tsx";
import {UsuarioContext, UsuarioContextType} from "../context/usuarios.context.tsx";
import {PrestamoContext, PrestamosContextType} from "../context/prestamos.context.tsx";
import CustomChipComponent from "../components/CustomChipComponent.tsx";
import {MeterGroup} from "primereact/metergroup";
import {Chart} from "primereact/chart";
import {Dropdown} from "primereact/dropdown";


function Home() {
    const {libros,getLibros} = useContext<LibroContextType>(LibroContext);
    const {usuarios,getUsuarios} = useContext<UsuarioContextType>(UsuarioContext);
    const {prestamos,getAllPrestamos} = useContext<PrestamosContextType>(PrestamoContext);
    const [vistaGrafica, setVistaGrafica] = useState("bar")
    const librosPrestadosEnMeses:number[] = Array(12).fill(0);

    useEffect(() => {
        getLibros();
        getUsuarios();
        getAllPrestamos();
    }, []);

    useEffect(() => {

    }, [prestamos,libros,usuarios]);

    const numPrestamos:number = prestamos.filter(prestamo => prestamo.fecha_devolucion == null).length;
    const totalLibros:number = libros.reduce((previousValue, currentValue) => previousValue + currentValue.cantidad,0);

    const obtenerLibrosPrestadosPorMeses = () => {
        prestamos.forEach(prestamo => {
            const mes:number = new Date(prestamo.fecha_prestamo).getMonth();
           librosPrestadosEnMeses[mes]++;
        })
    }

    obtenerLibrosPrestadosPorMeses();


    const values = [
        { label: 'Libros Prestados', color: 'red', value: ((numPrestamos / totalLibros) * 100), icon: 'pi pi-book' }
    ]

    const valuesStorage = [
        { label: 'Stock Almacen', color: 'black', value: totalLibros, icon: 'pi pi-book' }
    ]

    const data = {
        labels: Array.from({length: 12}, (_, index) => new Intl.DateTimeFormat('es',{month: "long"}).format(new Date(2025,index,1))),
        datasets: [{
            label: 'Libros Prestados',
            data: librosPrestadosEnMeses,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(199, 199, 199, 0.2)', 'rgba(83, 102, 255, 0.2)',
                'rgba(40, 180, 99, 0.2)', 'rgba(231, 76, 60, 0.2)', 'rgba(241, 196, 15, 0.2)', 'rgba(26, 188, 156, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)', 'rgb(75, 192, 192)',
                'rgb(153, 102, 255)', 'rgb(255, 159, 64)', 'rgb(199, 199, 199)', 'rgb(83, 102, 255)',
                'rgb(40, 180, 99)', 'rgb(231, 76, 60)', 'rgb(241, 196, 15)', 'rgb(26, 188, 156)'
            ],
            borderWidth: 1
        }]
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                beginAtZero: true,
            }
        }
    };

    const vistas = ["pie","bar","doughnut","line","polarArea"];

    return (
        <>
            {librosPrestadosEnMeses}
            <div className="flex flex-column gap-8 items-center justify-center">
                <div className="-m-5">
                    <HeaderComponent/>
                </div>
                <div className="grid justify-content-center gap-4 justify-content-center">
                    <CustomChipComponent title="Capacidad Almacen" value={1000} iconClass="pi pi-book text-xl" iconColor="white" backgroundColor="black"/>
                    <CustomChipComponent title="Total de Títulos" value={libros.length} iconClass="pi pi-book text-xl" iconColor="white" backgroundColor="green"/>
                    <CustomChipComponent title="Total de Libros" value={totalLibros} iconClass="pi pi-book text-xl" iconColor="white" backgroundColor="orange"/>
                    <CustomChipComponent title="Libros Sin Devolver" value={numPrestamos} iconClass="pi pi-refresh text-xl" iconColor="white" backgroundColor="red"/>
                    <CustomChipComponent title="Usuarios Registrados" value={usuarios.length} iconClass="pi pi-user text-xl" iconColor="white" backgroundColor="blue"/>
                </div>
                <div className="card flex flex-row gap-4 justify-content-center m-auto">
                    <MeterGroup values={values} />
                    <MeterGroup max={1000} values={valuesStorage} />
                </div>
                <Dropdown optionLabel="label" options={vistas} value={vistaGrafica}
                          placeholder="Selecciona una vista" className="w-5 justify-content-center m-auto mt-2 mb-0"
                onChange={(e) => setVistaGrafica(e.value)}
                />
                <div className="card justify-content-center">
                    <Chart type={vistaGrafica} options={options} data={data} />
                </div>
            </div>
        </>
    );
}

export default Home;