import {ChangeEvent, FormEvent, RefObject, useContext, useEffect, useRef, useState} from "react";
import {FloatLabel} from "primereact/floatlabel";
import {InputText} from "primereact/inputtext";
import {InputMask, InputMaskChangeEvent} from "primereact/inputmask";
import {Button} from "primereact/button";
import {InputNumber, InputNumberChangeEvent} from "primereact/inputnumber";
import {UsuarioContext, UsuarioContextType} from "../context/usuarios.context.tsx";
import {Usuario} from "../interfaces/usuario.interface.ts";
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";
import {Toast} from "primereact/toast";

interface UsuarioUpdateFormProps {
    editMode: boolean,
    addUserMode: boolean,
}


function UsuarioUpdateForm({editMode,addUserMode}: UsuarioUpdateFormProps) {
    const {usuario,updateUsuario,deleteUsuario,addUsuario} = useContext<UsuarioContextType>(UsuarioContext);
    const [usuarioSelected, setUsuarioSelected] = useState<Usuario>(usuario!)

    useEffect(() => {
        setUsuarioSelected(usuario!)
    }, [editMode,addUserMode]);

    const onSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editMode) updateUsuario(usuarioSelected)
        else addUsuario(usuarioSelected)
        setUsuarioSelected({
            dni: "", name: "", email: "", tlf: 0, direccion: "", cp: 0, id: 0
        });
    }

    const onDniHandle = (e:ChangeEvent<HTMLInputElement>) => {
        console.log(usuario)
        setUsuarioSelected({
            ...usuarioSelected,
            dni: e.target.value
        })
    }

    const onNombreHandle = (e:ChangeEvent<HTMLInputElement>) => {
        setUsuarioSelected({
            ...usuarioSelected,
            name: e.target.value
        })
    }

    const onEmailHandle = (e:ChangeEvent<HTMLInputElement>) => {
        setUsuarioSelected({
            ...usuarioSelected,
            email: e.target.value
        })
    }

    const onTlfHandle = (e:InputMaskChangeEvent) => {
        setUsuarioSelected({
            ...usuarioSelected,
            tlf: parseInt(e.target.value!)
        })
    }

    const onDireccionHandle = (e:ChangeEvent<HTMLInputElement>) => {
        setUsuarioSelected({
            ...usuarioSelected,
            direccion: e.target.value
        })
    }

    const onCpfHandle = (e:InputNumberChangeEvent) => {
        setUsuarioSelected({
            ...usuarioSelected,
            cp: e.value!
        })
    }

    const toast: RefObject<Toast | null> = useRef<Toast>(null);

    const accept = async () => {
        toast.current?.show({
            severity: 'warn',
            summary: "Confirmed",
            detail: "User deleted successfully",
            life: 3000
        })
        deleteUsuario(usuarioSelected.id);
    }
    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirm = () => {
        confirmDialog({
            message: `Are you sure you want to delete user ${usuarioSelected.name}?`,
            header: "Delete User",
            icon: "pi pi-info-circle",
            defaultFocus: "reject",
            acceptClassName: "p-button-danger",
            accept,
            reject
        })
    }
    return (
        <>
            {usuario && (
                <div className="w-6 justify-content-center align-items-center m-auto">
                    <h3 className="p-card-title text-center">{usuarioSelected.name.length > 0 ? usuarioSelected.name : "Sin Nombre"}</h3>
                    <form onSubmit={onSubmit} className="justify-content-center m-auto align-items-center">
                        <div className="p-card-body flex flex-row flex-wrap gap-5 align-items-center justify-content-center m-auto">
                            <div className="mt-3">
                                <FloatLabel>
                                    <InputText id="dni" value={usuarioSelected.dni} onChange={onDniHandle} maxLength={9} />
                                    <label htmlFor="dni">DNI</label>
                                </FloatLabel>
                            </div>
                            <div className="mt-3">
                                <FloatLabel>
                                    <InputText id="nombre" value={usuarioSelected.name}
                                               onChange={onNombreHandle} />
                                    <label htmlFor="nombre">Nombre</label>
                                </FloatLabel>
                            </div>
                            <div className="mt-3">
                                <FloatLabel>
                                    <InputText id="email" value={usuarioSelected.email} onChange={onEmailHandle} type="email" />
                                    <label htmlFor="email">Email</label>
                                </FloatLabel>
                            </div>
                            <div className="mt-3">
                                <FloatLabel>
                                    <InputMask id="tlf" mask="999 999 999" placeholder="999 999 999" onChange={onTlfHandle} />
                                    <label htmlFor="tlf">Teléfono</label>
                                </FloatLabel>
                            </div>
                            <div className="mt-3">
                                <FloatLabel>
                                    <InputText id="direccion" value={usuarioSelected.direccion} onChange={onDireccionHandle} />
                                    <label htmlFor="direccion">Dirección</label>
                                </FloatLabel>
                            </div>
                            <div className="mt-3">
                                <FloatLabel>
                                    <InputNumber id="cp" value={usuarioSelected.cp} useGrouping={false} onChange={onCpfHandle}/>
                                    <label htmlFor="cp">Código Postal</label>
                                </FloatLabel>
                            </div>
                        </div>
                        {editMode && (
                            <>
                                <Toast ref={toast} />
                                <ConfirmDialog />
                                <div className="card flex flex-wrap gap-2 justify-content-center mt-4">
                                    <Button label="Actualizar Usuario" type="submit" icon="pi pi-user"/>
                                    <Button className="p-button-danger" onClick={confirm} icon="pi pi-times" label="Eliminar Usuario"></Button>
                                </div>
                            </>
                        )}
                        {addUserMode && (
                            <div className="card flex flex-wrap gap-2 justify-content-center mt-4">
                                <Button label="Añadir nuevo Usuario" type="submit" icon="pi pi-user" className="m-auto justify-content-center mt-4" />
                            </div>
                        )}
                    </form>
                </div>
            )}
        </>
    );
}

export default UsuarioUpdateForm;