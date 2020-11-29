import React, { Component } from 'react';
import './reporteria.css';
import DayPicker from "../Utils/DayPicker/index"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment' 

class ReporteriaActividades extends Component {
     
     componentWillMount = () => {
          // this.props.getReporteControlSoporte();
      };

     render(){
          // const {
          // } = this.props;
          return (
               <React.Fragment>
                         <div className="d-flex flex-column w-100 p-3">
                              {/* titulo y buscador */}
                              <div className="d-flex justify-content-between">
                                   <h3 className="txt-22-n color-003  w-50">Control de Actividad</h3>
                                   <div className=" flex-fill d-flex mb-3 align-items-center ml-3">
                                        <input
                                            type="text"
                                            className="form-control "
                                        //     onChange={(e) => searchEmpresaChange(e.target.value)}
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
                                   <div className="flex-fill d-flex mb-3 align-items-center w-40 ">
                                        <label htmlFor='field_search'
                                             className="text-center color-057  txt-12 font-weight-bold">
                                             Programador/dise&ntilde;ador: &nbsp;&nbsp;&nbsp;&nbsp;</label>
                                        <input
                                             type="text"
                                             name='field_search'
                                             className="form-control"
                                             // onChange={(e) => searchChange(e.target.value)}
                                             placeholder="Nombre"
                                             style={{
                                                  border: "2px solid black",
                                                  borderRadius: "8px",
                                                  paddingRight: "35px",
                                                  paddingLeft: '20px',
                                                  maxHeight: '30px'
                                             }}
                                        />
                                       
                                   </div>
                                   <div className="flex-fill d-flex mb-3 align-items-center ">
                                        <label
                                             htmlFor='field_area' className=" text-center txt-12 color-057  font-weight-bold ">
                                             &Aacute;rea: &nbsp;&nbsp;&nbsp;&nbsp;</label>
                                        <input
                                             type="text"
                                             name='field_area'
                                             className="form-control"
                                             // onChange={(e) => searchChange(e.target.value)}
                                             // placeholder="Nombre"
                                            style={{
                                                  border: "2px solid black",
                                                  borderRadius: "8px",
                                                  paddingRight: "35px",
                                                  paddingLeft: '20px',
                                                  maxHeight: '30px'
                                             }}
                                        />
                                   </div>
                                   <div className="flex-fill d-flex mb-3 align-items-center ">
                                        <label htmlFor='field_scrum' className="color-057 txt-12 text-center font-weight-bold">Scrum Master:  &nbsp;</label>
                                        <input
                                             type="text"
                                             name='field_scrum'
                                             className="form-control rep_form_control"
                                             // onChange={(e) => searchChange(e.target.value)}
                                             // placeholder="Nombre"
                                             style={{
                                                  border: "2px solid black",
                                                  borderRadius: "8px",
                                                  paddingLeft: '20px',
                                                  maxHeight: '30px'
                                             }}
                                        />
                                   </div>
                              </div>
                              <div className="d-flex justify-content-between">
                                   <div className="flex-fill d-flex mb-3 align-items-center w-45  ">
                                             <label htmlFor='field_area' className="color-057 txt-12 font-weight-bold">Puesto: &nbsp;&nbsp;&nbsp;&nbsp;</label>
                                             <input
                                                  type="text"
                                                  name='field_area'
                                                  className="form-control "
                                                  // onChange={(e) => searchChange(e.target.value)}
                                                  // placeholder="Nombre"
                                                  style={{
                                                       border: "2px solid black",
                                                       borderRadius: "8px",
                                                       paddingRight: "30px",
                                                       paddingLeft: '20px',
                                                       maxHeight: '30px',
                                                       maxWidth: '87%',
                                                  }}
                                             />
                                   </div>
                             
                                   <div className="d-flex justify-content-end d-flex mb-3 align-items-center ">
                                        <label htmlFor="fechaInicio" className="color-057 txt-12 font-weight-bold">Fecha Inicio</label>
                                        {/* <DayPicker
                                             name="fechaInicio"
                                             custume_class={ "rep-DayPicker-border rep_form_control" }
                                             onChange={ setInitialDate }
                                             value={ fecha_inicial }
                                             style={{
                                                       border: "2px solid black",
                                                  }}
                                        /> */}
                                   </div>
                                   <div className="d-flex justify-content-end mb-3 align-items-center ">
                                         <label htmlFor="fechaFin" className="ml-3 mr-2 color-057 txt-12 font-weight-bold">Fecha Fin</label>
                                        {/* <DayPicker
                                             custume_class={ "rep-DayPicker-Months rep-DayPicker-border rep_form_control" }
                                             name="fechaFin"
                                             onChange={ setFinalDate }
                                             value={ fecha_final }
                                             style={{
                                                       border: "2px solid black",
                                                  }}
                                        /> */}
                                   </div>
                               </div>
                              <div>
                                   <table className="table table-striped table-lg">
                                        <thead className="rep-borde">
                                                  <tr> 
                                                 
                                                  <th className="rep-bg-orange text-white text-uppercase pt-3 pb-3 rep-borde">
                                                       
                                                  </th>
                                             </tr>
                                        </thead>
                                        <tbody className="table-bordered text-center rep-borde">
                                        </tbody>
                                   </table>
                              </div>
                                 
                         </div>
               </React.Fragment>
          );
     }
}

export default ReporteriaActividades;