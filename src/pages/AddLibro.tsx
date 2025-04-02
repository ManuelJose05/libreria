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
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {Autor} from "../interfaces/autor.interface.ts";
import {Dialog} from "primereact/dialog";

// @ts-ignore
function AddLibro() {
    const {autores,getAutores,generos,getGeneros,editorial,getEditorial,saveLibro} = useContext<LibroContextType>(LibroContext);

    const editorialesObject = Object(editorial);

    const [newLibro, setNewLibro] = useState<Libro>({
        isbn: "", name: "", descripcion: "", editorial: "",img: "",
        fecha_publicacion: new Date(), genero: [], cantidad: 0,
        autor: {
            id: 1, name: "", nacionalidad: "", fecha_nacimiento: new Date()
    }})

    const [newAutor, setNewAutor] = useState<Autor>({
        id: 0, name: "", nacionalidad: "", fecha_nacimiento: new Date()
    })
    const [newGenero, setNewGenero] = useState<string>("")

    const [modalVisible, setModalVisible] = useState({
        visible: false, type: ""
    })

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

    const onAutorSelect = (e:DropdownChangeEvent) => {
        const selectedAutor:Autor = autores.find((autor) => autor.id === parseInt(e.target.value.id))!;
        if (selectedAutor) {
            setNewLibro((prev) => ({ ...prev, autor: selectedAutor }));
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const onFechaHandle = (e: FormEvent<Date, SyntheticEvent<Element, Event>>) => {
        setNewLibro((prev) => ({...prev, fecha_publicacion: e.value}))
    }

    const onEditorialHandle = (e:DropdownChangeEvent) => {
        setNewLibro((prev) => ({ ...prev, editorial: e.value }));
    }

    const onImgHandle = (e:ChangeEvent<HTMLTextAreaElement>)=> {
        setNewLibro((prev) => ({...prev,img: e.target.value }));
    }

    const onAddAutor = "Se ha añadido el autor"



    const modaAutorlBody = (
        <div className="flex flex-column gap-4 align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Agregar un Autor</span>
            <FloatLabel>
                <InputText id="name" value={newAutor.name} onChange={(e:ChangeEvent<HTMLInputElement>) => setNewAutor((prev) => ({...prev,name:e.target.value }))} />
                <label htmlFor="name">Nombre</label>
            </FloatLabel>
            <FloatLabel>
                <InputText id="nationality" value={newAutor.nacionalidad} onChange={(e:ChangeEvent<HTMLInputElement>) => setNewAutor((prev) => ({...prev,nacionalidad:e.target.value }))} />
                <label htmlFor="nationality">Nacionalidad</label>
            </FloatLabel>
                <div className="flex flex-column justify-content-center align-items-center w-full">
                    <p>Fecha de nacimiento</p>
                    <Calendar showIcon id="fecha" className="w-full md:w-30rem" dateFormat={"yy-mm-dd"} onChange={(e) => {
                        setNewAutor((prev) => ({...prev, fecha_nacimiento: e.value!}));
                    }} value={newLibro.fecha_publicacion} />
                </div>
        </div>
    )

    const modalGeneroBody = (
        <div className="flex flex-column gap-4 align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Agregar un Género</span>
            <FloatLabel>
                <InputText id="Genero" value={newGenero} onChange={(e:ChangeEvent<HTMLInputElement>) => setNewGenero(e.target.value)} />
                <label htmlFor="name">Genero</label>
            </FloatLabel>
        </div>
    )

    const modalFooter = (type:string) => {
        return (
            <div>
                <Button label="Añadir" icon="pi pi-plus" onClick={() => {
                    setModalVisible({visible: false,type:type});
                    console.log(onAddAutor);
                }} autoFocus />
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-column gap-7 items-center justify-center w-full">
                <div className="-m-2">
                    <HeaderComponent/>
                </div>
                <form onSubmit={onSubmit} className="card bg-black-alpha-10 shadow-4 border-round-3xl flex flex-column gap-4 justify-content-center align-items-center w-5 max-w-md mx-auto">
                    <h3 className="p-card-title font-bold font-italic">Crear Libro</h3>

                    <div className="grid md:col-4 lg:col-2 gap-4 justify-content-center m-3 w-full">
                        <FloatLabel>
                            <InputText id="ISBN" value={newLibro.isbn} onChange={onIsbnHandle} />
                            <label htmlFor="ISBN">ISBN</label>
                        </FloatLabel>

                        <FloatLabel>
                            <InputText id="Título" value={newLibro.name} onChange={onTitleHandle} />
                            <label htmlFor="Título">Título</label>
                        </FloatLabel>

                        <FloatLabel >
                            <InputNumber id="cantidad" value={newLibro.cantidad} onChange={onStockHandle} />
                            <label htmlFor="cantidad">Cantidad</label>
                        </FloatLabel>

                        <FloatLabel>
                            <InputTextarea id="Descripción" maxLength={475} value={newLibro.descripcion} onChange={onDescripcionHandle}/>
                            <label htmlFor="Descripción">Descripción</label>
                        </FloatLabel>

                        <FloatLabel>
                            <InputTextarea id="img" value={newLibro.img} onChange={onImgHandle} />
                            <label htmlFor="img">URL Imagen</label>
                        </FloatLabel>

                        <MultiSelect value={newLibro.genero} onChange={onGeneroHandle} options={generos} optionLabel="genero"
                                     placeholder="Selecciona un Género" className="w-full md:w-20rem" maxSelectedLabels={2} />

                        <Dropdown id="editorial-select" options={Array.isArray(editorialesObject) ? editorialesObject : [] } optionLabel="name" value={newLibro.editorial} placeholder="Editorial"
                                  onChange={onEditorialHandle} className="w-full md:w-14rem" filter filterBy="name" filterPlaceholder="Buscar por Nombre" filterMatchMode="contains" emptyFilterMessage="No se ha encontrado ninguna Editorial" />

                        <Dropdown id="autor-select" options={autores} optionLabel="name" value={newLibro.autor} placeholder="Autor"
                                  onChange={onAutorSelect} className="w-full md:w-14rem" filter filterBy="name" filterPlaceholder="Buscar por Nombre" filterMatchMode="contains" emptyFilterMessage="No se ha encontrado ningún Autor" />

                        <div className="flex flex-column justify-content-center align-items-center w-full">
                            <p>Fecha de publicación:</p>
                            <Calendar showIcon id="fecha" className="w-full md:w-30rem" dateFormat="yy-mm-dd" onChange={onFechaHandle} value={newLibro.fecha_publicacion} />
                        </div>
                    </div>

                    <Button label="Guardar Libro" className="mb-4" type="submit"/>
                </form>

                <div className="flex flex-row gap-3 m-auto justify-content-center w-full">
                    <Button className="w-1 justify-content-center" label="Añadir Autor" icon="pi pi-external-link" onClick={() => setModalVisible({visible: true, type:"AUTOR"})} />
                    <Button className="w-1 justify-content-center" label="Añadir Género" icon="pi pi-external-link" onClick={() => setModalVisible({visible: true, type:"GENERO"})} />
                </div>

                <Dialog header={modalVisible.type === "GENERO" ? modalGeneroBody : modaAutorlBody} footer={() => modalFooter(modalVisible.type)} visible={modalVisible.visible} onHide={() => setModalVisible({visible: false, type:"GENERO"})} />
            </div>
        </>
    );
}

export default AddLibro;