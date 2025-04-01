// To parse this data:
//
//   import { Convert } from "./file";
//
//   const usuario = Convert.toUsuario(json);

export interface Usuario {
    id:        number;
    dni:       string;
    name:      string;
    email:     string;
    tlf:       number;
    direccion: string;
    cp:        number;
}
