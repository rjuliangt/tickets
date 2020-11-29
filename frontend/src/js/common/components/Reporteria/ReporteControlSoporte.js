import React, { Component } from "react";
import "./reporteria.css";
import DayPicker from "../Utils/DayPicker/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { getPropiedades } from "../Tickets/DatosSelect";
import { Field, reduxForm } from "redux-form";
import {
     renderField,
     renderFilePicker,
     SelectField,
     renderNumber,
     AsyncSelectField,
 } from "../Utils/renderField/renderField";

class Reporteria extends Component {
     
     componentWillMount = () => {
          this.props.getReporteControlSoporte();
      };

     render(){
          const {
               fecha_inicial,
               fecha_final,
               setInitialDate,
               setFinalDate,
               dataReporteControlSoporte,
              searchChange,
               seleccionUsuario,
               searchEmpresaChange,
          } = this.props;

           console.log('Control soporte', dataReporteControlSoporte);
          
          return (
               <React.Fragment>
                    { dataReporteControlSoporte? (
                         <div className="d-flex flex-column w-100 p-3">
                              {/* titulo y buscador */}
                              <div className="d-flex justify-content-between">
                                   <h3 className="txt-22-n color-003  w-50">Control de soporte</h3>
                                   <div className=" flex-fill mb-3 d-flex align-items-center ml-3">
                                        <input
                                            type="text"
                                            className="form-control "
                                            onChange={(e) => searchEmpresaChange(e.target.value)}
                                            placeholder="Buscar empresa"
                                            style={{
                                                  border: "2px solid #E5E5E5",
                                                  borderRadius: "12px",
                                                  paddingRight: "35px",
                                                 maxWidth: '480px',
                                                 justifyContent: 'flex-end', 
                                            }}
                                        />
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            className="icono color-4AC"
                                            style={{
                                                marginLeft: -35,
                                            }}
                                        />
                                   </div>
                              </div>
                              {/* Segunda fila */}
                              <div  className="d-flex justify-content-between">
                                   <div className="flex-fill mb-3 mr-3">
                                        <label htmlFor='first_name'
                                             className=" color-057  txt-12 font-weight-bold">
                                             Programador/dise&ntilde;ador: &nbsp;&nbsp;&nbsp;&nbsp;</label>
                                        
                                   <Field
                                        type="text"
                                        name="first_name"
                                        placeholder="nombre"
                                        component={AsyncSelectField}
                                        loadOptions={(e) =>
                                            getPropiedades(e, "usuario/programadorDiseñador")
                                        }
                                        onChangeAction={seleccionUsuario}
                                        className="form-control"
                                    />
                                       
                                   </div>
                                   <div className="flex-fill mb-3 mx-3">
                                        <label
                                             htmlFor='idCategoria__nombre' className=" text-center txt-12 color-057  font-weight-bold ">
                                             &Aacute;rea: &nbsp;&nbsp;&nbsp;&nbsp;</label>
                                        <Field
                         
                                             component={renderField}
                                             name='idCategoria__nombre'
                                             className="form-control"
                                             placeholder="Nombre Del Area"
                                             disabled="True"
                                             isMulti="False"
                                             type="text"
                                        />
                                   </div>
                                   <div className="flex-fill mb-3 ml-3">
                                        <label htmlFor='scrum_master__first_name' className="color-057 txt-12 text-center font-weight-bold">Scrum Master:  &nbsp;</label>
                                        <Field
                                             component={renderField}
                                             name='scrum_master__first_name'
                                             className="form-control"
                                             placeholder="Scrum Master"
                                             disabled="True"
                                             isMulti="False"
                                             type="text"
                                            
                                        />
                                   </div>
                              </div>
                              <div className="d-flex justify-content-between">
                                   <div className="flex-fill d-flex mb-3 align-items-center w-45  ">
                                             <label htmlFor='idPuesto__nombre' className="color-057 txt-12 font-weight-bold">Puesto: &nbsp;&nbsp;&nbsp;&nbsp;</label>
                                             <Field
                                                  component={renderField}
                                                  name='idPuesto__nombre'
                                                  // className="form-control"
                                                  classname="400px"
                                                  placeholder="Nombre Del Puesto"
                                                  disabled="True"
                                                  isMulti="False"
                                                  type="text"
                                                  
               
                                             />
                                   </div>
                             
                                   <div className="d-flex justify-content-end d-flex mb-3 align-items-center ">
                                        <label htmlFor="fechaInicio" className="color-057 txt-12 font-weight-bold">Fecha Inicio</label>
                                        <DayPicker
                                             name="fechaInicio"
                                             custume_class={ "rep-DayPicker-border rep_form_control" }
                                             onChange={ setInitialDate }
                                             value={ fecha_inicial }
                                             style={{
                                                       border: "2px solid black",
                                                  }}
                                        />
                                   </div>
                                   <div className="d-flex justify-content-end mb-3 align-items-center ">
                                         <label htmlFor="fechaFin" className="ml-3 mr-2 color-057 txt-12 font-weight-bold">Fecha Fin</label>
                                        <DayPicker
                                             custume_class={ "rep-DayPicker-Months rep-DayPicker-border rep_form_control" }
                                             name="fechaFin"
                                             onChange={ setFinalDate }
                                             value={ fecha_final }
                                             style={{
                                                       border: "2px solid black",
                                                  }}
                                        />
                                   </div>
                               </div>
                              <div>
                                   <table className="table table-striped table-lg">
                                        <thead className="rep-borde">
                                                  <tr> 
                                                  { dataReporteControlSoporte.encabezados.map( ( encabezado, index ) => (
                                                       <th key={ index }
                                                            scope="col"
                                                            style={index==1 || index==3 || index==5 || index==6?{maxWidth:'128px'}:{maxWidth:'165px', textAlign:'initial !important'}}
                                                            className="rep-bg-orange text-white text-uppercase pt-3 pb-3 rep-borde">
                                                            { encabezado }
                                                       </th>
                                                  ) ) }
                                             </tr>
                                        </thead>
                                        <tbody className="table-bordered text-center rep-borde">
                                             {dataReporteControlSoporte.data.map((datos, i) => (
                                             <tr key={i}>
                                                       {Object.keys( datos ).map( ( ticket, j ) => (
                                                            <React.Fragment>
                                                                 { j < 8 ?
                                                                      <td key={ j } className="text-center text-uppercase pt-2 pb-2">
                                                                      { j===0? datos[ ticket ]:null}
                                                                      { j===1? ('#' + datos[ ticket ]):null }
                                                                      { (j===2&&datos[ ticket ])?  (datos[ ticket ]):null}
                                                                      { (j===2&&datos[ ticket ])==null?  '00:00:00':null}
                                                                      { (j===3&&datos[ ticket ])?  (datos[ ticket ]):null}
                                                                      { (j===3&&datos[ ticket ])==null?  '00:00:00':null}
                                                                      { (j===4&&datos[ ticket ])?  (moment( datos[ ticket ] ).format( 'L' )):null}
                                                                      { (j===4&&datos[ ticket ])==null?  'DD/MM/YY':null}
                                                                      { (j===5&&datos[ ticket ])?  (moment( datos[ ticket ] ).format( 'L' )):null}
                                                                      { (j===5&&datos[ ticket ])==null?  'DD/MM/YY':null}
                                                                      { (j===6&&datos[ ticket ])?  (moment( datos[ ticket ] ).format( 'L' )):null}
                                                                      { (j===6&&datos[ ticket ])==null?  'DD/MM/YY':null}
                                                                      { (j===7&&datos[ ticket ])?  (<React.Fragment> {datos[ ticket ]} <div style={ {
                                                                                               backgroundColor: datos['idEstado__color'],
                                                                                               width: 15,
                                                                                               height: 15,
                                                                                               padding: 0,
                                                                                               borderRadius: 10,
                                                                                               display:'inline-block',
                                                                                } }>
                                                                                </div></React.Fragment> ) :null}
                                                                           { ( j === 7 && datos[ ticket ] ) == null ?
                                                                                ( <React.Fragment>'Sin Estado' <div style={ {
                                                                                               backgroundColor: 'black',
                                                                                               width: 15,
                                                                                               height: 15,
                                                                                               padding: 0,
                                                                                               borderRadius: 10,
                                                                                } }>
                                                                                </div></React.Fragment> )
                                                                                : null }
                                                                      </td>
                                                                      : null }
                                                            </React.Fragment>
                                                       ) ) }
                                             </tr>
                                             ) ) }
                                        </tbody>
                                   </table>
                              </div>
                                 
                         </div>
                        
                     ) : null}
               </React.Fragment>
          );
     }
}

// export default Reporteria;
export default reduxForm({
     form: "reporteForm", // a unique identifier for this form
     fields: ['idPuesto__nombre', 'scrum_master__first_name', 'idCategoria__nombre']
})(Reporteria);