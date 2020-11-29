import React, { Component } from 'react';
import './reporteria.css';
// import { Field } from "redux-form";

class Reporteria extends Component {
     
     componentWillMount = () => {
          this.props.getReporteSemanal();
          this.props.getResumenSemanal();
          this.props.getResueltosSemanal();
          this.props.getResumenGeneral();
      };

     render(){
          const {dataReporteSemanal,
               dataResumenSemanal,
               dataResueltoSemanal,
               fecha_inicial,
               fecha_final,
               setInitialDate,
               setFinalDate,
               dataGeneral,
          } = this.props;

          const datosReporteSemanal = dataReporteSemanal;
         
          const DatosGeneral = dataGeneral;
        
           console.log("Resumen General: ", DatosGeneral);
          
          return (
               <React.Fragment>
                    { DatosGeneral ? (
                         <div className="d-flex flex-column w-100 p-3">
                              <div class="d-flex justify-content-between">
                                   <h3 className="txt-22-n color-003  w-40">REPORTE GENERAL DE TICKETS</h3>
                                   {/* <div className="d-flex flex-row mb-2 rep-date-w">
                                        <label htmlFor="fechaInicio" className="color-003 font-weight-bold">Fecha Inicio</label>
                                        <DayPicker name="fechaInicio" className="rep-border-solid" onChange={ setInitialDate } value={ fecha_inicial } />
                                        <label htmlFor="fechaFin" className="ml-3 mr-2 color-003 font-weight-bold">Fecha Fin</label>
                                        <DayPicker custume_class={"rep-DayPicker-Months"} name="fechaFin" className="rep-border-solid .rep-DayPicker-Months" onChange={ setFinalDate } value={ fecha_final } />
                                   </div> */}
                                   
                              </div>
                    <div>
                         <table className="table table-striped table-lg">
                              <thead className="rep-borde">
                                   <tr>
                                       <th 
                                        className="rep-header rep-bg-orange text-center  rep-borde pt-2 pb-2 text-uppercase"
                                        colSpan={ "1" + DatosGeneral.encabezado_prioridades.length +
                                                        DatosGeneral.encabezado_estados.length }    >
                                       Tabla de totales general
                                       </th>
                                   </tr>
                            
                              <tr>
                                   <th scope="col" className="  rep-borde 
                                                                rep-bg-gray
                                                                rep-alligned-sup
                                                                text-uppercase
                                                                ">Proyectos</th>
                                                  <th scope="col"
                                                       colSpan={ DatosGeneral.encabezado_prioridades.length }
                                                       className="rep-header rep-bg-orange text-center  rep-borde pt-2 pb-2 text-uppercase"
                                                  >
                                                       Solicitados</th>
                                                  <th scope="col"
                                                       colSpan={ DatosGeneral.encabezado_estados.length }
                                                       className="rep-header rep-bg-blue text-center rep-borde pt-2 pb-2 text-uppercase"
                                                  >Estado de tickets</th>
                              </tr>
                              </thead>

                              <thead className="rep-borde">
                                   <tr> 
                                        <th className="rep-borde rep-bg-gray text-center pt-2 pb-2 text-uppercase"></th>
                                        { DatosGeneral.encabezado_prioridades.map( ( prioridad, index ) => (
                                             <th key={index} scope="col" className="rep-bg-orange text-center text-white text-uppercase pt-2 pb-2 rep-borde">{prioridad}</th>
                                        ) ) }
                                        { DatosGeneral.encabezado_estados.map( ( estado, index ) => (
                                             <th key={index} scope="col" className="rep-bg-blue text-center text-uppercase pt-2 pb-2 rep-borde">{estado}</th>
                                        ) ) }
                                   </tr>
                              </thead>
                              <tbody className="table-bordered text-center rep-borde">
                                   <tr> 
                                        <th className="text-uppercase pt-2 pb-2 rep-bg-gray2 rep-borde">Totales</th>
                                        { DatosGeneral.encabezado_prioridades.map( ( prioridad, index ) => (
                                             <th key={index} className="text-uppercase pt-2 pb-2 rep-bg-gray2 rep-borde">{DatosGeneral.conteo_totalp[prioridad]}</th>
                                        ) ) }
                                        { DatosGeneral.encabezado_estados.map( ( estado, index ) => (
                                             <th key={index} className="text-uppercase pt-2 pb-2 rep-bg-gray2 rep-borde">{DatosGeneral.conteo_totalE[estado]}</th>
                                        ) ) }                               
                                   </tr>
     
                                   {DatosGeneral.proyectos.map((registro, i) => (
                                   <tr key={i}>
                                        <td key={i} className="text-uppercase pt-2 pb-2" >{registro.etiqueta}</td>
                                             {registro.data.prioridades.map( ( prioridad, j ) => (
                                             
                                                  <td key={j} className={j==0?'font-weight-bold':''}> {prioridad.valor} </td>
                                             ) ) }
                                             {registro.data.estados.map((estado, j) =>(
                                                  <td key={j} className={j==0?'font-weight-bold':''}> {estado.valor} </td>
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

export default Reporteria;