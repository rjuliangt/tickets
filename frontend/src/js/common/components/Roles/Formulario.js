import React from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";

import { renderField, renderFieldCheck } from "../Utils/renderField";
import InputCheckBox from '../Utils/renderField/Chekbox'

const renderPermisos = ({ fields, meta: { error, submitFailed } }) => (
  <ul style={{marginTop:'0px', width:'40%' }}>    
      {submitFailed && error && <span>{error}</span>}    
        {fields.map( ( member, index ) => (
            <li key={ index } style={ {listStyle: 'None'}}>
                
                <Field
                    name={fields.get(index).nombre}
                    label={fields.get(index).nombre}
                    checked={fields.get(index).asignado}
                    value={ fields.get( index ).id }
                    component={ renderFieldCheck }
                />
            </li>
        
        ) ) }
    </ul>
)

const RolForm = ( props ) => {

    const { handleSubmit, actualizar, ver, getPermisos , todosLosPermisos } = props;
    console.log('valores de formulario__', todosLosPermisos)
    return (
        <div className="d-flex flex-column w-100">
            <form onSubmit={handleSubmit}>
                <br></br>
                <div
                    className="mb-1 card card-small p-3"
                    style={{
                        maxWidth: 500,
                    }}
                >
                    <div>
                        <h3 className="m-0 txt-22-n color-003">
                            {actualizar ? "Actualizar" : "Crear"} Rol
                        </h3>
                    </div>

                    <div className="p-0 pt-3">
                        <div className="form-group has-feedback flex-1 w-75">
                            <label className="txt-12-n color-057">Nombre</label>
                            <Field
                                component={renderField}
                                name="nombre"
                                disabled={ver}
                            />
                        </div>
                    </div>
                    
                    <fieldset>
                        <p className="txt-12-n color-057 mb-0">Permisos:</p>
                        { actualizar ? (
                            <FieldArray name="permisos" component={ renderPermisos } /> ) :
                            (<FieldArray name="results" component={renderPermisos}/>) }
                        
                        
                    </fieldset>
                    <br />
                    <br />
                    <div className=" d-flex justify-content-center">
                        <a className="btn-secundario2 mr-2" href="/#/roles">
                            Cancelar
                        </a>
                        {!ver && (
                            <button type="submit" className="btn-primario2">
                                {actualizar ? "Actualizar" : "Registrar"}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: "RolForm", // a unique identifier for this form
})(RolForm);
