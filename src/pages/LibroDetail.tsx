import {useParams} from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent.tsx";
import {LibroContext} from "../context/libro.context.tsx";
import {useContext, useEffect} from "react";
import {Fieldset} from "primereact/fieldset";
import {Chip} from "primereact/chip";
import {Genero} from "../interfaces/genero.interface.ts";
import {Accordion, AccordionTab} from "primereact/accordion";
import * as React from "react";
import {Image} from "primereact/image";

function LibroDetail() {
    const {id} = useParams();
    const {libroDetail,getLibroById} = useContext(LibroContext);

    useEffect(() => {
        getLibroById(id!);
    },[]);

    const chips = libroDetail?.genero?.map((genero:Genero) => {
        return <Chip label={genero.genero} key={genero.id}/>
    });

    return (
        <>
            {libroDetail && (
                <div className="flex flex-column gap-7 items-center justify-center w-full">
                    <div className="-m-5">
                        <HeaderComponent/>
                    </div>
                    <Fieldset legend={libroDetail.name} >
                        <Image className="shadow-3 border-round-xl" src={libroDetail.img} width="300" height="400" alt={libroDetail.name} preview/>
                        <p className="m-0 mt-5">
                            {libroDetail.descripcion}
                        </p>
                        <div className="flex flex-column-reverse mt-3">
                            <p><b>Fecha de Publicación:</b> {libroDetail.fecha_publicacion.toString()}</p>
                            <p><b>Editorial:</b> {libroDetail.editorial}</p>
                            <Accordion className="flex flex-wrap justify-content-center gap-2 mb-3">
                                <AccordionTab header={libroDetail.autor.name}>
                                    <h3 style={{textDecoration: "underline"}}>Información de Autor</h3>
                                    <Image src="data:image/jpeg;base64,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"
                                    alt={libroDetail.autor.name} preview
                                    />
                                    <p><b>Nombre: </b> {libroDetail.autor.name}</p>
                                    <p><b>Fecha de Nacimiento: </b> {libroDetail.autor.fecha_nacimiento.toString()}</p>
                                    <p><b>Nacionalidad: </b> {libroDetail.autor.nacionalidad}</p>
                                </AccordionTab>
                            </Accordion>
                        </div>
                        <div className="flex gap-3 justify-content-center mt-2">
                            {chips}
                        </div>
                    </Fieldset>
                </div>
            )}
        </>
    );
}

export default React.memo(LibroDetail);