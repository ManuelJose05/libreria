import {Usuario} from "./usuario.interface.ts";
import {Libro} from "./libro.interface.ts";

export interface Prestamo {
    id: number;
    usuario: Usuario;
    libro: Libro;
    fecha_prestamo: Date;
    fecha_devolucion?: Date;
}