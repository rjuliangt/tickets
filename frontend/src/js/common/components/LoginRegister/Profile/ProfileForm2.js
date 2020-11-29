import React from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";
import {
    renderField,
    renderFilePicker,
    SelectField,
    renderNumber,
    AsyncSelectField,
} from "../../Utils/renderField/renderField";
import { email } from "../../../../utility/validation";
import { api } from "../../../../utility/api";
import Modal from "../../Utils/Modal/ReactModal";
import { FullModal } from "../../Utils/Modal/FullModal";
import CreateModal from "../../Utils/renderField/createModal";
import FormularioPro from "../../Proyecto/Formulario";

const estados = [
    { label: "Activo", value: true },
    { label: "Inactivo", value: false },
];


// const renderPermisos = ({ fields, meta: { error, submitFailed } }) => (
//   <ul style={{marginTop:'0px', width:'40%' }}>    
//       {submitFailed && error && <span>{error}</span>}    
//         {fields.map( ( member, index ) => (
//             <li key={ index } style={ {listStyle: 'None'}}>
                
//                 <Field
//                     name={fields.get(index).nombre}
//                     label={fields.get(index).nombre}
//                     checked={fields.get(index).asignado}
//                     value={ fields.get( index ).id }
//                     component={ renderFieldCheck }
//                 />
//             </li>
        
//         ) ) }
//     </ul>
// )

const getGrupos = (search) => {
    let grupos = [];
    return api
        .get("categoria", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((Res) => {
                    grupos.push({ value: Res.id, label: Res.nombre });
                });
            }
            return grupos;
        })
        .catch(() => {
            return [];
        });
};

const getRoles = (search) => {
    let roles = [];
    return api
        .get("roles", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((Res,index) => {
                    roles.push( { value: Res.id, label: Res.nombre } );
                } );
                
            }
            console.log('Roles?',roles);
            return roles;
        })
        .catch(() => {
            return [];
        });
};
const getRolesCliente = (search) => {
    let roles = [];
    let roleCliente = []
    return api
        .get("roles", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((Res,index) => {
                    roles.push( { value: Res.id, label: Res.nombre } );
                    if ( roles[ index ].label == 'Cliente' ) {
                        roleCliente.push( roles[ index ] );
                    }
                } );
                
            }
            return roleCliente;
        })
        .catch(() => {
            return [];
        });
};

const getProyecto = (search) => {
    let proyecto = [];
    return api
        .get("proyecto", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((Res) => {
                    proyecto.push({ value: Res.id, label: Res.nombre });
                });
            }
            console.log('proyecto',proyecto);
            return proyecto;
        })
        .catch(() => {
            return [];
        });
};

const getScrum = (search) => {
    let scrum = [];
    return api
        .get("user/userScrum")
        .then((response) => {
            if (response) {
                response.results.forEach((Res) => {
                    scrum.push({ value: Res.id, label: Res.first_name + ' '+ Res.last_name });
                });
            }
            console.log('user scrum ',scrum);
            return scrum;
        })
        .catch(() => {
            return [];
        });
};

const getPuesto = (search) => {
    let puesto = [];
    return api
        .get("puesto", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((Res) => {
                    puesto.push({ value: Res.id, label: Res.nombre });
                });
            }
            console.log('place user: ',puesto);
            return puesto;
        })
        .catch(() => {
            return [];
        });
};



const Roles = [
    { label: "Administrador", value: 0 },
    { label: "Cliente", value: 1 },
    { label: "Agente", value: 2 },
    { label: "Programador", value: 3 },
    { label: "root", value: 4 },
    { label: "otros", value: 5 },
];

const ProfileForm2 = (props) => {
     const { handleSubmit, me, actualizar, ver, setAvatar, isNested } = props;
    const {
        showForm,
        show_form,
        value,
        registrarProyecto,
        registrarEmpresa,
        registrarUserDesdeTicket,
        MostrarOcultarModal,
    } = props;
    let styleForm='p-0 pt-3 d-flex flex-column flex-md-row'
    let styleHeader = 'mb-4 card card-small'
    const setStyle = ( style ) => {
        styleHeader = ''
        styleHeader = style
        
    }
    console.log("Hola desde aqui sho:", show_form);
    // console.log(props);
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                { isNested? (setStyle('card card-small w-100')):<br></br>}
                <div className={ styleHeader} style={{minWidth:'500px'}}>
                    <div className="border-bottom card-header m-1">
                        { isNested? <h5 className="m-0 p-0 color-003"><strong>Agregar Cliente</strong></h5>:
                        <h3 className="m-0 txt-22-n color-003">
                            { actualizar && !ver? "Actualizar Usuario": null}
                            { !actualizar && !ver? "Agregar Usuario": null}
                            { actualizar && ver? "Ver Usuario": null}
                        </h3>}
                    </div>
                    { isNested? ()=>(styleForm='p-0 m-0 d-flex flex-column flex-md-row'):null }
                    <div className={styleForm}>
                        <div className="d-flex flex-column flex-1 mx-3">
                            <div className="form-group has-feedback flex-1 mx-3">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="first_name"
                                >
                                    Nombre
                                </label>
                                <Field
                                    name="first_name"
                                    placeholder="Nombre"
                                    component={renderField}
                                    type="text"
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>

                            <div className="form-group has-feedback flex-1 mx-3">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="last_name"
                                >
                                    Apellido
                                </label>
                                <Field
                                    name="last_name"
                                    placeholder="Apellido"
                                    component={renderField}
                                    type="text"
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>

                            <div className="form-group has-feedback flex-1 mx-3">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="email"
                                >
                                    correo
                                </label>
                                <Field
                                    name="email"
                                    placeholder="correo"
                                    component={renderField}
                                    // validate={email}
                                    type="email"
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>

                            <div className="form-group has-feedback flex-1 mx-3">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="phone"
                                >
                                    Telefono
                                </label>
                                <Field
                                    // validate="renderNumber"
                                    name="phone"
                                    placeholder="Telefono"
                                    component={renderField}
                                    type="text"
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-column flex-1 mx-3">
                            <div className="form-group has-feedback">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="idCategoria"
                                >
                                    &Aacute;rea
                                </label>
                                <Field
                                    name="idCategoria"
                                    placeholder="Area"
                                    component={AsyncSelectField}
                                    loadOptions={getGrupos}
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>
                            <div className="form-group has-feedback">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="activo"
                                >
                                    Activo
                                </label>
                                <Field
                                    name="activo"
                                    placeholder="Activo"
                                    component={SelectField}
                                    options={estados}
                                    className="form-control"
                                    disabled={ver}
                                />
                            </div>

                            <div className="form-group has-feedback">
                                <label
                                    className="txt-12-n color-057"
                                    htmlFor="Rol"
                                >
                                    Rol
                                </label>
                                { isNested? 
                                <Field
                                    name="idRoles"
                                    placeholder="Rol"
                                    component={AsyncSelectField}
                                    loadOptions={getRolesCliente}
                                    options={Roles}
                                    className="form-control"
                                    disabled={ver}
                                    />
                                    :<Field
                                    name="idRoles"
                                    placeholder="Rol"
                                    component={ AsyncSelectField }
                                    // onChangeAction={seleccionRol}
                                    loadOptions={getRoles}
                                    options={Roles}
                                    className="form-control"
                                    disabled={ver}
                                    />}
                            </div>
                            <label className="txt-12-n color-057">
                                Proyectos
                            </label>
                            <Field
                                name="proyecto"
                                placeholder="Proyecto"
                                component={CreateModal}
                                isMulti={true}
                                loadOptions={getProyecto}
                                className="form-control"
                                disabled={ver}
                                showForm={showForm}
                                show_form={show_form}
                            >
                                <Modal
                                    showModal={show_form}
                                    showForm={() => {
                                        showForm(false);
                                    }}
                                >
                                    <FormularioPro
                                        isNested
                                        showForm={showForm}
                                        onSubmit={props.registrarProyecto}
                                    />
                                </Modal>
                            </Field>
                            
                        </div>
                        {
                            isNested ? null : (
                                <div className="d-flex flex-column flex-1 mx-3">
                                
                                    <div className="form-group has-feedback">
                                        <label
                                            className="txt-12-n color-057"
                                            htmlFor="scrum_master"
                                        >
                                            Scrum
                                    </label>
                                        <Field
                                            name="scrum_master"
                                            placeholder="Nombre"
                                            component={ AsyncSelectField }
                                            loadOptions={ getScrum }
                                            type="text"
                                            className="form-control"
                                            disabled={ ver }
                                        />
                                    </div>
                        
                            
                                    <div className="form-group has-feedback flex-1">
                                        <label
                                                className="txt-12-n color-057"
                                                htmlFor="idPuesto"
                                            >
                                                Puesto
                                            </label>
                                            <Field
                                                name="idPuesto"
                                                placeholder="puesto de usuario"
                                                component={ AsyncSelectField }
                                                loadOptions={getPuesto}
                                                type="text"
                                                className="form-control"
                                                disabled={ver}
                                            />
                                    </div>
                                    {/* <div className="form-group has-feedback flex-1">
                                        <label
                                                className="txt-12-n color-057"
                                                htmlFor="permisos"
                                            >
                                                Permisos
                                            </label>
                                            <FieldArray name="permisos" component={ renderPermisos } /> )
                                    </div> */}

                                </div>
                            )
                        }
                    </div>
                    <br />
                    <br />
                    <div className=" d-flex justify-content-center  my-4">
                   
                        { isNested || registrarUserDesdeTicket ?
                            (
                                // <a 
                                // type="button"
                                // className= "btn btn-info"
                                // onClick= {()=>MostrarOcultarModal(false)}
                                // className="btn-secundario2 ml-2" 
                                // >
                                //     Cancelar
                                // </a>
                                null
                            )
                        : 
                        (<a 
                        className="btn-secundario2 ml-2" 
                        href="/#/usuarios" >Regresar </a>)}

                        {!ver && (
                            <button
                                type={isNested || registrarUserDesdeTicket ? "button" : "submit"}
                                onClick={isNested ? handleSubmit : null}
                                className="btn-primario2 ml-2"
                            >
                                {actualizar ? "Actualizar" : "Registrar"}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};

export default reduxForm({
    form: "profile2", // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            first_name: validators.exists()("Este campo es requerido"),
            email: validators.exists()("Este campo es requerido"),
            last_name: validators.exists()("Este campo es requerido"),
        });
    },
} )( ProfileForm2 );
