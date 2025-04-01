import HeaderComponent from "../components/HeaderComponent.tsx";
import { FloatLabel } from 'primereact/floatlabel';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {InputNumber, InputNumberChangeEvent} from "primereact/inputnumber";
import {ChangeEvent, FormEvent, SyntheticEvent, useContext, useEffect, useState} from "react";
import {Libro} from "../interfaces/libro.interface.ts";
import {LibroContext, LibroContextType} from "../context/libro.context.tsx";
import {MultiSelect, MultiSelectChangeEvent} from "primereact/multiselect";
import {Button} from "primereact/button";

function AddLibro() {
    const {autores,getAutores,generos,getGeneros,editorial,getEditorial,saveLibro} = useContext<LibroContextType>(LibroContext);

    const [newLibro, setNewLibro] = useState<Libro>({
        isbn: "", name: "", descripcion: "", editorial: "",img: "",
        fecha_publicacion: new Date(), genero: [], cantidad: 0,
        autor: {
            id: 1, name: "", nacionalidad: "", fecha_nacimiento: new Date()
    }})

    useEffect(() => {
        getAutores();
        getGeneros();
        getEditorial();
    }, []);

    const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await saveLibro(newLibro);
        setNewLibro({
            isbn: "", name: "", descripcion: "", editorial: "", fecha_publicacion: new Date(),
            genero: [], cantidad: 0,img: "", autor: {
                id: 0, name: "", nacionalidad: "", fecha_nacimiento: new Date()
            }
        });
    }

    const onTitleHandle = (e:ChangeEvent<HTMLInputElement>) => {
        setNewLibro((prev) => ({ ...prev, name: e.target.value }))
    }

    const onIsbnHandle = (e:ChangeEvent<HTMLInputElement>) => {
        setNewLibro((prev) => ({ ...prev, isbn: e.target.value }));
    }

    const onDescripcionHandle = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setNewLibro((prev) => ({ ...prev, descripcion: e.target.value }));
    }

    const onStockHandle = (e: InputNumberChangeEvent) => {
        if (e.value !== null) setNewLibro((prev) => ({ ...prev, cantidad: e.value!}));
    }

    const onGeneroHandle = (e:MultiSelectChangeEvent) => {
        if (newLibro.genero.includes(e.selectedOption)) {
            return setNewLibro((prev) => ({ ...prev, genero: prev.genero.filter((x) => x.id !== e.selectedOption.id) }));
        }
        setNewLibro((prev) => ({...prev, genero: [...prev.genero, e.selectedOption] }));
    }

    const onAutorSelect = (e:ChangeEvent<HTMLSelectElement>) => {
        const selectedAutor = autores.find((autor) => autor.id === parseInt(e.target.value));
        if (selectedAutor) {
            setNewLibro((prev) => ({ ...prev, autor: selectedAutor }));
        }

    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const onFechaHandle = (e: FormEvent<Date, SyntheticEvent<Element, Event>>) => {
        setNewLibro((prev) => ({...prev, fecha_publicacion: e.value}))
    }

    const onEditorialHandle = (e:ChangeEvent<HTMLSelectElement>) => {
        setNewLibro((prev) => ({ ...prev, editorial: e.target.value }));
    }

    const showEditoriales = () => {

        return Object.entries(editorial).map(([key,value]) => (
            <option value={value['id']} key={key}>
                {value['name']}
            </option>
        ));
    }


    return (
        <>
            <div className="flex flex-column gap-7 items-center justify-center w-full">
            <div className="-m-5">
                <HeaderComponent/>
            </div>
            <form onSubmit={onSubmit} className="card bg-black-alpha-10 shadow-4 border-round-3xl flex flex-column gap-3 justify-content-center align-items-center w-5 max-w-md mx-auto">
                <h3 className="p-card-title font-bold font-italic" >Crear Libro</h3>
                <div className="flex justify-content-center">
                <FloatLabel>
                    <InputText id="ISBN" value={newLibro.isbn} onChange={onIsbnHandle} />
                    <label htmlFor="ISBN">ISBN</label>
                </FloatLabel>
                </div>
                <div className="flex justify-content-center">
                    <FloatLabel>
                        <InputText id="Título" value={newLibro.name} onChange={onTitleHandle} />
                        <label htmlFor="Título">Título</label>
                    </FloatLabel>
                </div>
                <div className="flex justify-content-center">
                    <FloatLabel>
                        <InputTextarea id="Descripción" maxLength={475} value={newLibro.descripcion} onChange={onDescripcionHandle}/>
                        <label htmlFor="Descripción">Descripción</label>
                    </FloatLabel>
                </div>
                <div className="flex justify-content-center mt-4">
                    <FloatLabel>
                        <InputNumber id="cantidad" value={newLibro.cantidad} onChange={onStockHandle} />
                        <label htmlFor="cantidad">Cantidad</label>
                    </FloatLabel>
                </div>
                <div className=" flex justify-content-center">
                    <MultiSelect value={newLibro.genero} onChange={onGeneroHandle} options={generos} optionLabel="genero"
                                 placeholder="Selecciona un Género"  className="w-full md:w-20rem" maxSelectedLabels={2} />
                </div>
                <div className="flex flex-column justify-content-center mt-4">
                    <label htmlFor="editorial-select">Selecciona la editorial: </label>
                    <select
                        id="editorial-select"
                        className="w-full md:w-14rem"
                        onChange={onEditorialHandle}
                        value={newLibro.editorial}>
                        <option value="">Seleccione una editorial</option>
                        {showEditoriales()}
                    </select>
                </div>
                <div className="flex flex-column justify-content-center mt-4">
                    <label htmlFor="autor-select">Selecciona un autor: </label>
                    <select
                        id="autor-select"
                        className="w-full md:w-14rem"
                        onChange={onAutorSelect}
                        value={newLibro.autor.id}>
                        <option value="">Seleccione un autor</option>
                        {autores &&
                            autores.map((autor) => (
                                <option key={autor.id} value={autor.id}>
                                    {autor.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="flex justify-content-center">
                    <div className="flex flex-column justify-content-center align-items-center w-full">
                        <p>Fecha de publicación: </p>
                        <Calendar showIcon id="fecha" className="w-full md:w-30rem" dateFormat={"yy-mm-dd"} onChange={onFechaHandle} value={newLibro.fecha_publicacion} />
                    </div>
                </div>
                <Button label="Guardar Libro"/>
            </form>
            </div>
        </>
    );
}

export default AddLibro;