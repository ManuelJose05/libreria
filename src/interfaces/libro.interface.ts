import {Genero} from "./genero.interface.ts";
import {Autor} from "./autor.interface.ts";

export interface Libro {
    id:                number;
    isbn:              string;
    name:              string;
    descripcion:       string;
    editorial:         string;
    fecha_publicacion: Date;
    genero:            Genero[];
    cantidad:          number;
    autor:             Autor;
}
