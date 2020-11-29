import React from "react";
import { Field,FieldArray, reduxForm} from "redux-form";
import FormularioPro from "../../Proyecto/Formulario";
import CreateModal from "../../Utils/renderField/createModal";
import Modal from "../../Utils/Modal/ReactModal";
import {validate, validators} from "validate-redux-form";
import { api } from "../../../../utility/api";
import FormularioCliente from '../../../components/LoginRegister/Profile/ProfileForm2';
import {
    renderField,
    AsyncSelectField,
    renderSwitch,
} from "../../Utils/renderField/renderField";
import renderMyUpload from "../../Utils/MyUpload/myUpLoad";
import createSelect from "../../Utils/renderField/createSelectMulti";
import LoadMask from "../../Utils/LoadMask/LoadMask";
import DonwloadField from '../../Utils/renderField/downloadField'
import QuillEditor from "../Quill/QuillEditor";

const getProyecto = (search) => {
    let roles = [];
    return api
        .get("proyecto", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((Res) => {
                    roles.push({ value: Res.id, label: Res.nombre });
                });
            }
            console.log(roles);
            return roles;
        })
        .catch(() => {
            return [];
        });
};
const state = {
    roles: [],
};

const renderMisDocumentos = ({ fields, meta: { error, submitFailed } }) => (
  <ul style={{marginTop:'0px', width:'40%' }}>    
      {submitFailed && error && <span>{error}</span>}    
        {fields.map( ( member, index ) => (
            <li key={ index } style={ {listStyle: 'None'}} className="form-inline">
                {/* <a download href="url_del_fichero">Anchor text</a> */}
                <Field
                    name={fields.get(index).archivo}
                    label={fields.get(index).archivo}
                    component={ DonwloadField }
                    // download={ fields.get( index ).archivo }
                    href= {fields.get(index).archivo}
                    className='btn btn-success ml-2'
                />
            </li>
        
        ) ) }
    </ul>
)


import { getPropiedades } from "../DatosSelect";

const TicketForm = (props) => {
    const { handleSubmit, actualizar, ver, idTicket, setFiles, todosLosDocs } = props;

    const {
        showForm,
        show_form,
        registrarUserDesdeTicket,
        MostrarOcultarModal,
        show_form_usuarios,
        getProyectos,
        proyectos,
        loader,

    } = props;
    console.log("proyectos: ", proyectos);
    return (
        <LoadMask loading={loader} light>
        <form onSubmit={handleSubmit}>
            <br></br>
            <div className="mb-4 card card-small">
                <div className="border-bottom card-header">
                    <h3 className="m-0">
                        {/* {me.first_name} {me.last_name} */}
                        {actualizar ? "Actualizar Ticket" : "Crear Ticket"}
                    </h3>
                    {/* antes del merge Luis */}
                </div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                    <div className="d-flex flex-column flex-1 mx-3">
                        {/* SECCION PARA ELEGIR PROYECTO */}
                        <div className="form-group has-feedback">
                                <label htmlFor="idProyecto">Proyecto</label>

                                <Field
                                    name="idProyecto"
                                    placeholder="idProyecto"
                                    component={CreateModal}
                                    isMulti={false}
                                    loadOptions={getProyecto}
                                    className="form-control"
                                    disabled={ver}
                                    showForm={showForm}
                                    show_form={show_form}
                                >
                                    <Modal showModal={ show_form }
                                    showForm={() => {
                                        showForm(false);
                                    }}
                                    >
                                        <FormularioPro
                                            isNested
                                            showForm={showForm}
                                            onSubmit={props.registrarProyectoDesdeTickets}
                                        />
                                        {/* <span>Hola otra vez</span> */}
                                    </Modal>
                                </Field>
                            </div>
                        {/* SECCION PARA ELEGIR CLIENTE */}
                        <div className="form-group has-feedback ">
                            <label htmlFor="idUsuarioCliente">Cliente</label>
                            <Field
                                name="idUsuarioCliente"
                                placeholder="Cliente"
                                component={AsyncSelectField}
                                loadOptions={(e) =>
                                    getPropiedades(e, "usuario/cliente")
                                }
                                onChange={(e) => {
                                    getProyectos(e.value);
                                    let idSeleccionado = e.value;
                                    console.log("hola estoy dentro", e.value);
                                }}
                                className="form-control"
                                disabled={ver}
                            />

                                <br></br>
                                {/* Boton Crear Usuario */}
                                <a 
                                text-align="left"
                                className= "btn btn-info btn-xs"
                                onClick = {()=>MostrarOcultarModal(true)}
                                > <i style={{width: "30%",marginTop: "-20px",marginRight: "-1px",}}
                                className="material-icons"> playlist_add</i>&nbsp;&nbsp;Cliente </a>
                                 {/* ************************************************************************** */}


                                <Modal
                                showForm = {MostrarOcultarModal}
                                showModal={show_form_usuarios}
                                className=""
                                >
                                    <FormularioCliente
                                    isNested
                                    onSubmit={registrarUserDesdeTicket}
                                    />
                                </Modal>

                        </div>
                        {/* SECCION PARA SELECCIONAR UN ASIGNADO */ }
                        <div className="form-group has-feedback ">
                                <label htmlFor="idUsuarioAsignado">
                                    Asignado
                                </label>
                                <Field
                                    name="idUsuarioAsignado"
                                    placeholder="Asignado"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(e, "usuario/programadorDiseñador")
                                    }
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                        {/* SECCION PARA ELEGIR ASUNTO */}
                        <div className="form-group has-feedback ">
                            <label htmlFor="asunto">Asunto</label>
                            <Field
                                name="asunto"
                                placeholder="Asunto"
                                component={renderField}
                                type="text"
                                className="form-control"
                                disabled={ver}
                            />
                        </div>
                         {/* SECCION PARA el Switch de aprobado */ }
                        <fieldset>
                            <Field
                                name="aprobado"
                                label="Aprobado"
                                value="default"
                                component={renderSwitch}
                                disabled={ver}
                            />
                        </fieldset>
                    </div>
                    
                    {actualizar ? null : (
                        <div className="d-flex flex-column flex-1 mx-3">
                            <div className="form-group has-feedback ">
                            <label htmlFor="idTipo">Tipo</label>
                            <Field
                                name="idTipo"
                                placeholder="Tipo"
                                component={AsyncSelectField}
                                loadOptions={(e) =>
                                    getPropiedades(e, "ticket/tipos")
                                }
                                className="form-control"
                                disabled={ver}
                            />
                        </div>
                            <div className="form-group has-feedback">
                                <label htmlFor="idEstado">Estado</label>
                                <Field
                                    name="idEstado"
                                    placeholder="Estado"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(e, "ticket/estados")
                                    }
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                            <div className="form-group has-feedback">
                                <label htmlFor="idPrioridad">Prioridad</label>
                                <Field
                                    name="idPrioridad"
                                    placeholder="Prioridad"
                                    component={AsyncSelectField}
                                    loadOptions={(e) =>
                                        getPropiedades(e, "ticket/prioridades")
                                    }
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                            <div className="form-group has-feedback">
                                <label htmlFor="idGrupo">Area</label>
                                <Field
                                    name="idGrupo"
                                    placeholder="Area"
                                    component={ AsyncSelectField }
                                    loadOptions={(e) =>
                                        getPropiedades(e, "categoria")
                                    }
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>

                            <div className="form-group has-feedback">
                                <label>Etiquetas</label>
                                <Field
                                    name="idEtiquetas"
                                    placeholder="Empresa"
                                    component={createSelect}
                                    isMulti={false}
                                    loadOptions={(e) =>
                                        getPropiedades(e, "ticket/etiquetas")
                                    }
                                    className="form-control"
                                    // value={valorPro} X
                                    // onChange={registrarEmpresa} X
                                    disabled={ver}
                                />
                            </div>

                        </div>
                    )}

                    {ver ? (
                        <div className="form-group has-feedback">
                            <label htmlFor="creado">Fecha de Creación </label>
                            <Field
                                name="creado"
                                placeholder="creado"
                                component={renderField}
                                type="text"
                                className="form-control"
                                disabled={ver}
                            />
                        </div>
                    ) : null}
                </div>
                <div className="p-0 mr-3 ml-3 flex-md-row"  >
                        {/* SECCION PARA LA DESCRIPCION */ }
                        <div className="form-group has-feedback " >
                            <label htmlFor="descripcion">Descripcion</label>
                            <Field name="descripcion" component={ QuillEditor } />
                            {/* SECCION PARA LA ADJUNTAR ARCHIVO */ }
                            <div className="d-flex justify-content-between">
                                <div className="form-group has-feedback">
                                    <label htmlFor='documentos' className='m-3'>Documentos</label>
                                    <FieldArray name="documentos" component={ renderMisDocumentos } /> 
                                </div>        
                                <div className="form-group has-feedback">
                                    <label htmlFor="archivo">Adjuntar Archivo</label>
                                    <Field
                                        name="archivo"
                                        setFiles={setFiles}
                                        type="file"
                                        multiple
                                        component={renderMyUpload}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                <div className="p-0 pt-3  flex-md-row d-flex mb-2 justify-content-center">
                    <a className="btn-secundario1 " href={
                                idTicket
                                    ? `/#/ticket/${idTicket}/ver`
                                    : `/#/cards`
                            }>
                        Cancelar
                    </a>
                    {!ver && (
                        <button type="submit" className="btn-primario1 ml-3">
                            {actualizar
                                ? "Actualizar Ticket"
                                : "Registrar Ticket"}
                        </button>
                    )}
                </div>
               
                
                <br></br>
            </div>
        </form>
        </LoadMask>
    );
};

export default reduxForm({
    form: "ticketForm", // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            idProyecto: validators.exists()("Este campo es requerido"),
            idUsuarioCliente: validators.exists()("Este campo es requerido"),
            asunto: validators.exists()("Este campo es requerido"),
            descripcion: validators.exists()("Este campo es requerido"),
        });
    },
} )( TicketForm );