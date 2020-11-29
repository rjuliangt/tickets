import React, { Component } from 'react';
import './reporteria.css';
import DayPicker from "../Utils/DayPicker/index"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import '../../../../../node_modules/react-vis/dist/style.css'; 
import { getPropiedades } from "../Tickets/DatosSelect";
import { Field, reduxForm } from "redux-form";
import { AsyncSelectField } from "../Utils/renderField/renderField";
import {
     XYPlot,
     XAxis,
     YAxis,
     VerticalBarSeriesCanvas
} from 'react-vis';  

class Reporteria extends Component {
     
     componentWillMount = () => {
          this.props.getReporteProgramador();
      };

     render(){
          const {
               fecha_inicial,
               fecha_final,
               setInitialDate,
               setFinalDate,
               dataReportePorProgramador,
               seleccionUsuario,
          } = this.props;
          const BarSeries = VerticalBarSeriesCanvas;
          console.log('RESUELTOS POR PROGRAMADOR:', dataReportePorProgramador);
          
          return (
               <React.Fragment>
                    { dataReportePorProgramador? (
                         <div className="d-flex flex-column w-100 p-3">
                              <div className="d-flex justify-content-between">
                                   <h3 className="txt-22-n color-003 ">Reporte por programador</h3>
                                   <div className="flex-fill d-flex mb-3 align-items-center ml-3 mr-3">
                                        {/* <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => searchChange(e.target.value)}
                                            placeholder="Nombre programador/dise&ntilde;ador"
                                            style={{
                                                border: "2px solid #E5E5E5",
                                                borderRadius: "12px",
                                                paddingRight: "35px",
                                            }}
                                        /> */}
                                        <Field
                                        type="text"
                                        name="first_name"
                                        placeholder="nombre programador/dise&ntilde;ador"
                                        component={ AsyncSelectField }
                                        classCostumise= 'w-100'     
                                        loadOptions={(e) =>
                                            getPropiedades(e, "usuario/programadorDiseñador")
                                        }
                                        onChangeAction={seleccionUsuario}
                                        />
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            className="icono color-4AC"
                                            style={{
                                                marginLeft: -35,
                                            }}
                                        />
                                   </div>
                                   <div className="d-flex flex-row mb-2 rep-date-w">
                                        <label htmlFor="fechaInicio" className="color-057 txt-12 font-weight-bold">Fecha Inicio</label>
                                        <DayPicker name="fechaInicio" className="rep-border-solid" onChange={ setInitialDate } value={ fecha_inicial } />
                                        <label htmlFor="fechaFin" className="ml-3 mr-2 color-057 txt-12 font-weight-bold">Fecha Fin</label>
                                        <DayPicker custume_class={"rep-DayPicker-Months"} name="fechaFin" onChange={ setFinalDate } value={ fecha_final } />
                                   </div>
                                   
                              </div>
                         
                              <div>
                                   <table className="table table-striped table-lg">
                                        <thead className="rep-borde">
                                                  <tr> 
                                                       <th className="text-center text-white rep-bg-gray pt-2 pb-2 rep-borde">PROYECTO</th>
                                                  { dataReportePorProgramador.encabezados.map( ( estado, index ) => (
                                                       
                                                       <th key={ index } scope="col" className="rep-bg-gray text-center text-uppercase pt-2 pb-2 rep-borde">
                                                            {dataReportePorProgramador.encabezados.length === index + 1 ?
                                                                 '' : 'Tickets ' }
                                                            {estado }
                                                       </th>
                                                  ) ) }
                                             </tr>
                                        </thead>
                                        <tbody className="table-bordered text-center rep-borde">
                                             {dataReportePorProgramador.proyectos.map((proyecto, i) => (
                                             <tr key={i}>
                                                  <td key={i} className="text-uppercase pt-2 pb-2" >{proyecto.etiqueta}</td>
                                                       {proyecto.data.estados.map((estado, j) =>(
                                                            <td key={j} > {estado.valor} </td>
                                                       ) ) }
                                             </tr>
                                             ) ) }
                                             <td className="text-uppercase pt-2 pb-2 rep-bg-orange text-white" >Total</td>
                                             { dataReportePorProgramador.data_estados.map( ( sub_total, i ) => (
                                                  <td key={i} className="text-uppercase pt-2 pb-2 rep-bg-orange text-white" >{sub_total.y} </td>
                                             ) ) }
                                        </tbody>
                                   </table>
                              </div>
                                 
                              <div className="d-flex flex-row mt-3  bd-highlight">
                                   <div className="d-flex rep-space align-items-center">
                                        <p className="pt-1 pb-1 pl-1 pr-3 w-40 bd-highlight card-resumen text-white rep-bg-blue">
                                             { dataReportePorProgramador.data_resumen.map( dato_resumen => <span className="text-uppercase ">
                                                 &nbsp;&nbsp;&nbsp; { Object.keys(dato_resumen) } : &nbsp;&nbsp; {Object.values(dato_resumen)}
                                                  </span> ) }
                                        </p>
                                   </div>                                    
                              </div>
                              <div className="m-2">
                                   <h3 className="txt-22-n color-003  w-40">GR&Aacute;FICA POR PROGRAMADOR</h3>
                                   <h3 className="txt-22-n color-003  w-40">TOTAL DE TICKETS REALIZADOS - ESTADO DE TICKETS</h3>
                                   <XYPlot
                                        xType="ordinal"
                                        height={ 380 }
                                        width={ 380 }
                                        margin={{left: 40, right: 0, top: 12, bottom: 32}}
                                        >
                                        { dataReportePorProgramador.data_estados.map( (posicion) => (
                                             <BarSeries
                                                  xDistance={0}
                                                  className="ml-2 mb-2"
                                                  cluster="2015"
                                                  color={ posicion.color }
                                                  data={[
                                                  {x: posicion.x, y: posicion.y}
                                                  ] }
                                                  
                                             />
                                        ))}
                                        <XAxis
                                        style={{
                                             line: {stroke: "0c0c9e"},
                                             ticks: {stroke: '#ADDDE1'},
                                             text: {stroke: 'none', fill: '#ff4f00', fontWeight: 600}
                                             } }
                                             marginTop={ 20 }
                                             marginLeft={40}
                                        />
                                        <YAxis style={{
                                             line: {stroke: "0c0c9e"},
                                             ticks: {stroke: '#ADDDE1'},
                                             text: { stroke: '#0c0c9e', fill: '#0c0c9e', fontWeight: 600 }
                                        } }
                                             marginLeft={ 35 }
                                             marginRight={ 0 }
                                             className={'ml-2'}
                                        />
                                   </XYPlot>
                              </div>
                         </div>
                        
                     ) : null}
               </React.Fragment>
          );
     }
}

// export default Reporteria;
export default reduxForm({
     form: "reporteProgramadorForm", // a unique identifier for this form
} )( Reporteria );
