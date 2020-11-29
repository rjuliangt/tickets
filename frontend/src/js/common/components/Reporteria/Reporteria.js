import React, { Component } from 'react';
import './reporteria.css';
import moment from 'moment' 
import DayPicker from "../Utils/DayPicker/index"

class Reporteria extends Component {
     
     componentWillMount = () => {
          this.props.getReporteSemanal();
          this.props.getResumenSemanal();
          this.props.getResueltosSemanal();
      };

     render(){
          const {
               dataReporteSemanal,
               dataResumenSemanal,
               dataResueltoSemanal,
               fecha_inicial,
               fecha_final,
               setInitialDate,
               setFinalDate,
          } = this.props;

          // const datosReporteSemanal = dataReporteSemanal;
          const ResumenSemanal = dataResumenSemanal;
          const Resueltos =  dataResueltoSemanal;
          
          let suma = 0;
          let sumaresuelto = 0;

           console.log('PARA SEMANA ', dataReporteSemanal);
          //  console.log('REZAGADO ',ResumenSemanal);
          //  console.log('RESUELTOS:', Resueltos);
          
          return (
               <React.Fragment>
                    { dataReporteSemanal && ResumenSemanal? (
                         <div className="d-flex flex-column w-100 p-3">
                              <div className="d-flex justify-content-between">
                                   <h3 className="txt-22-n color-003  w-40">Tabla de tickets semanal</h3>
                                   <div className="d-flex flex-row mb-2 rep-date-w">
                                        <label htmlFor="fechaInicio" className="color-003 font-weight-bold">Fecha Inicio</label>
                                        <DayPicker
                                             name="fechaInicio"
                                             className="rep-border-solid"
                                             onChange={ setInitialDate }
                                             value={ fecha_inicial } />
                                        <label htmlFor="fechaFin" className="ml-3 mr-2 color-003 font-weight-bold">Fecha Fin</label>
                                        <DayPicker
                                             custume_class={ "rep-DayPicker-Months" }
                                             name="fechaFin"
                                             className="rep-border-solid .rep-DayPicker-Months"
                                             onChange={ setFinalDate }
                                             value={ fecha_final } />
                                   </div>
                                   
                              </div>
                         <div>     
                                   { dataReporteSemanal.map( (datosReporteSemanal) => (

                                   
                                   
                         <table className="table table-striped table-lg">
                              <thead className="rep-borde">
                              <tr>
                                                  <th scope="col" className="rep-borde rep-bg-gray text-center pt-2 pb-2 text-uppercase">
                                                       {/* Del&nbsp;&nbsp; { moment( fecha_inicial ).format( "DD/MM/YYYY" ) }&nbsp;&nbsp;
                                                        al&nbsp;&nbsp; { moment( fecha_final ).format( "DD/MM/YYYY" ) } */}
                                                            { datosReporteSemanal.etiqueta }
                                                       </th>
                                                  <th scope="col"
                                                       colSpan={ datosReporteSemanal.data.encabezado_prioridades.length }
                                                       className="rep-header rep-bg-blue text-center rep-borde pt-2 pb-2 text-uppercase"
                                                  >
                                                       Ticket Solicitados</th>
                                                  <th scope="col"
                                                       colSpan={ datosReporteSemanal.data.encabezado_estados.length }
                                                       className="rep-header rep-bg-orange text-center  rep-borde pt-2 pb-2 text-uppercase"
                                                  >Estado de tickets</th>
                              </tr>
                              </thead>

                              <thead className="rep-borde">
                                   <tr> 
                                        <th className="rep-bg-orange rep-borde"></th>
                                        { datosReporteSemanal.data.encabezado_prioridades.map( ( prioridad, index ) => (
                                             <th key={index} scope="col" className="rep-bg-orange text-center text-white text-uppercase pt-2 pb-2 rep-borde">{prioridad}</th>
                                        ) ) }
                                        { datosReporteSemanal.data.encabezado_estados.map( ( estado, index ) => (
                                             <th key={index} scope="col" className="rep-bg-blue text-center text-uppercase pt-2 pb-2 rep-borde">{estado}</th>
                                        ) ) }
                                   </tr>
                              </thead>
                              <tbody className="table-bordered text-center rep-borde">
                                   <tr> 
                                        <th className="text-uppercase text-white rep-bg-gray pt-2 pb-2 rep-borde">Proyecto</th>
                                        { datosReporteSemanal.data.encabezado_prioridades.map( ( prioridad, index ) => (
                                             <th key={index} className="text-uppercase rep-bg-gray pt-2 pb-2 text-white rep-borde">{datosReporteSemanal.data.conteo_totalp[prioridad]}</th>
                                        ) ) }
                                        { datosReporteSemanal.data.encabezado_estados.map( ( estado, index ) => (
                                             <th key={index} className="text-uppercase rep-bg-gray text-white pt-2 pb-2 rep-borde">{datosReporteSemanal.data.conteo_totalE[estado]}</th>
                                        ) ) }                               
                                   </tr>
     
                                   {datosReporteSemanal.data.proyectos.map((registro, i) => (
                                   <tr key={i}>
                                        <td key={i} className="text-uppercase pt-2 pb-2" >{registro.etiqueta}</td>
                                             {registro.data.prioridades.map( ( prioridad, j ) => (
                                                  
                                                  <td key={j} className={j==0?'font-weight-bold':''} > {prioridad.valor} </td>
                                             ) ) }
                                             {registro.data.estados.map((estado, j) =>(
                                                  <td key={j} className={j==0?'font-weight-bold':''}> {estado.valor} </td>
                                             ) ) }
                                   </tr>
                                   ) ) }

                              </tbody>
                                        </table>
                         ) ) }
                    </div>

                    <div className="d-flex flex-row">
                         <div className="d-flex align-items-center">
                              <p className="pt-1 pb-1 pl-2 pr-2  w-20 bd-highlight card-resumen text-white rep-bg-orange">
                              {ResumenSemanal.forEach(function(elemento, indice) {suma += elemento["resagado"]})}
                                    REZAGO DE TICKETS : &nbsp;&nbsp;{suma} 
                              </p>
                         </div>                                    
                         <div className="d-flex ml-2 align-items-center">
                              <p className="pt-1 pb-1 pl-2 pr-2 bd-highlight text-white card-resumen rep-bg-blue">
                                   {ResumenSemanal.map(name =><span className="text-uppercase ">&nbsp;&nbsp;&nbsp;{name.nombre }:&nbsp;&nbsp;{name.resagado}  </span>)}
                              </p>
                         </div>
                    </div>
                     {Resueltos!==null?             
                    <div className="d-flex flex-row bd-highlight">
                        
                         <div className="d-flex rep-space align-items-center">
                              <p className="pt-1 pb-1 pl-2 pr-2 w-40 bd-highlight card-resumen text-white rep-bg-orange">

                              {Resueltos.forEach(function(elemento, i) {sumaresuelto += elemento["resuelto"]})}
                                    RESUELTOS:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; { sumaresuelto } 
                              </p>
                                      
                         </div>                                    
                         <div className="d-flex ml-2 rep-space align-items-center">
                              <p className="pt-1 pb-1 pl-2 pr-2 bd-highlight text-white card-resumen rep-bg-blue">
                              
                                   
                                   {Resueltos.map(name =><span className="text-uppercase ">&nbsp;&nbsp;&nbsp;{name.nombre}:&nbsp;&nbsp;{name.resuelto} </span>)}
                                  
                              </p>
                         </div>
                        
                    </div>
                    :null} 
                         </div>
                     ) : null}
               </React.Fragment>
          );
     }
}

export default Reporteria;