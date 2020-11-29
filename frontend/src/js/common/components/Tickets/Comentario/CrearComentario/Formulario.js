import React from "react";
import { Field, reduxForm } from "redux-form";

import LoadMask from "../../../Utils/LoadMask/LoadMask";

import QuillEditor from "../../Quill/QuillEditor";
const f_handleSubmit = (e, fn, data) => {
    e.preventDefault();

    console.log("holaa soy handleSubmit ", e);
    console.log("este es el datosss", data);
    const saludo = "roldan te amo";
    fn(e, saludo);
};

const ComentarioForm = (props) => {
    const { handleSubmit, crearComentario, actualizar, idTicket, loader } = props;
    console.log("mis props soy comentario jx", props);

    return (
    	<LoadMask loading={loader} light>
        <form
            onSubmit={ handleSubmit}
        >
            <div className="mb-4 card card-small mt-3">
                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                    <div className="form-group has-feedback flex-1 mx-3">
                        <label className="txt-16-n color-003 " htmlFor='contenido'>RESPONDER</label>
                        <Field name="contenido" component={QuillEditor}  />
                    </div>
                </div>
                { actualizar ? (
                    <div className=" d-flex justify-content-center mb-3">
                        <a
                            className="btn-secundario2 mr-2"
                            href={
                                idTicket
                                    ? `/#/ticket/${idTicket}/ver`
                                    : `/#/cards`
                            }
                        >
                            Cancelar
                        </a>
                        <button type="submit" className="btn-primario2">
                            {actualizar ? "Actualizar " : "Registrar "}
                        </button>
                    </div>
                ): (
                    <div className="d-flex justify-content-end mb-3">
                    <a
                        className="btn-secundario2 mx-3"
                        href="/#/cards"
                    >
                    Regresar
                    </a>
                    <button
                        type="button"
                        className="btn-secundario2"
                        name="comentario"
                        onClick={ () => {
                            crearComentario( false );
                        } }
                        style={ {minWidth: '160px'} }
                    >
                        Agregar Nota Privada
                    </button>{" "}
                    <button
                        type="button"
                        className="btn-primario2 mx-3"
                        name="responder"
                        onClick={() => {
                            crearComentario(true);
                        } }
                        style={ {minWidth: '160px'} }
                        
                    >
                        Responder a Cliente
                    </button>
                </div>
                    )}
                
            </div>
            </form>
            </LoadMask>
        // </div>
    );
};

export default reduxForm({
    form: "comentariosForm", // a unique identifier for this form
})(ComentarioForm);
