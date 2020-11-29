import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";
import "./cards.css";

// console.log(this.props);
import FormularioPro from "../../Proyecto/Formulario";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faObjectGroup,
    faUser,
    faUserCircle,
    faFolderOpen,
    faThumbtack,
} from "@fortawesome/free-solid-svg-icons";

const fomatearTexto = ( descripcion ) => {
    let parrafo = 'click para visualizar mas sobre el ticket'
    let etiquetas = [ '<p>', '<h2>', '<h1>', '<h3>', '<h4>', '<h5>', '<h6>', '<img src="', '<span', ');">', "{'html_content':'<p>" ]
    etiquetas.forEach( ( elemento ) => {
        if ( descripcion.includes( elemento ) ) {
            if ( elemento === '<img src="' ) {
                parrafo = 'click para visualizar mas sobre el ticket' 
            }
            if ( elemento !== '<img src="' ) {
                parrafo = descripcion.substring( descripcion.indexOf( elemento ) + elemento.length, descripcion.indexOf( '</' ) || descripcion.indexOf( '<img' ) )
            }
        }
    } )
    etiquetas.forEach( ( elemento ) => {
        if ( parrafo.includes( elemento ) ) {
            if ( elemento === '<img src="' ) {
                console.log('elemento: ', elemento)
                parrafo = 'click para visualizar imagen del ticket' 
            }
            if ( elemento !== '<img src="' ) {
                parrafo = descripcion.substring( descripcion.indexOf( elemento ) + elemento.length, descripcion.indexOf( '</' ) || descripcion.indexOf( '<img' ) )
            }
        }
    } )
    if (parrafo.length < 5) parrafo += '...'
    return parrafo
}

const Cards = ({ datos, actualizarSeleccion }) => {
    console.log("card:", datos);
    console.log("array desde cards:", actualizarSeleccion);
    // console.log("estado Modal", show_form);
    // console.log("estado Modal2", showForm);

    return (
        <React.Fragment>
            <div className="d-flex flex-row">
                <div className=" pt-5 mx-0">
                    <input
                        name="Fusion"
                        type="checkbox"
                        value={datos.id}
                        onChange={(e) =>
                            actualizarSeleccion(e, datos.asunto, datos.id)
                        }
                    />
                </div>
                <Link
                    to={`ticket/${datos.id}/ver`}
                    style={{ textDecoration: "none", color: "#5a6169" }}
                    className=" pl-2 pr-0 py-0 my-0 w-100"
                >
                    <div
                        className="cardStyle d-flex my-2 rounded"
                        // style={{ borderColor: "red", borderStyle: "solid" }}
                        style={{
                            borderColor: datos.idPrioridad
                                ? datos.idPrioridad.color
                                : "#000000",
                        }}
                    >
                        <div className="d-inline  flex-grow-1 mx-2">
                            <div className="card-body w-100 p-1 pt-2">
                                
                                <span
                                    className="badge "
                                    style={{
                                        backgroundColor: datos.idPrioridad
                                            ? datos.idPrioridad.color
                                            : "#000000",
                                        fontSize: "11px",
                                        fontFamily: "Montserrat-Bold",
                                    }}
                                >
                                    { datos.idPrioridad == null ?
                                        "Sin prioridad" : datos.idPrioridad.nombre
                                         }
                                </span>

                                <span className="txt-12-n ml-3">
                                    {  datos.asunto  == null ? 'Sin Asunto' : datos.asunto }
                                </span>

                                <p className="txt-12-n mt-2 mb-3">

                                    {/* { datos.descripcion ? datos.descripcion.substring(datos.descripcion.indexOf('>') + 1,datos.descripcion.indexOf('<'))  */}
                                    { datos.descripcion ? fomatearTexto(datos.descripcion) 
                                        : 'Sin descripci&oacute;n' }  <strong className="text-muted ml-4">#Ticket 0{datos.id}</strong>
                                </p>
                                

                                <div className="d-flex justify-content-between  align-items-center">
                                    <p className="card-text d-inline mb-1 txt-12">
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="icono-11 color-262 "
                                        />
                                        &nbsp;&nbsp;
                                        {datos.idUsuarioCliente &&
                                            datos.idUsuarioCliente.nombre + " / "}
                                            { datos.idProyecto == null ? 'Sin proyecto' : datos.idProyecto.nombre}
                                    </p>
                                    <small className="txt-13">
                                        hace:{" "}
                                        {formatDistanceToNow(
                                            new Date(datos.creado),
                                            {
                                                locale: es,
                                            }
                                        )}
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div
                            className="pl-3 p-2 bd-highlight d-flex  flex-column  justify-content-center  txt-11 "
                            style={{ width: "150px" }}
                        >
                            <span className="limitCaracter">
                                <i
                                    className="material-icons"
                                    style={{
                                        color: datos.idEstado
                                            ? datos.idEstado.color
                                            : "#000000",
                                    }}
                                >
                                    assistant_photo
                                </i>
                                {datos.idEstado !== null ? datos.idEstado.nombre : 'Sin Estado'}
                            </span>

                            <span className="limitCaracter">
                                <FontAwesomeIcon
                                    icon={faObjectGroup}
                                    className="icono-11 color-262 "
                                />
                                &nbsp;&nbsp;
                                {datos.idGrupo !== null ? datos.idGrupo.nombre: 'Sin Grupo'}
                            </span>
                            <span className="limitCaracter">
                                <FontAwesomeIcon
                                    icon={faUserCircle}
                                    className="icono-11 color-262 "
                                />
                                &nbsp;&nbsp;
                                {datos.idUsuarioAsignado
                                    ? datos.idUsuarioAsignado.nombre
                                    : "No Asignado"}
                            </span>
                            {
                            datos.reabierto > 0? 
                            (<span className="limitCaracter">
                                <FontAwesomeIcon
                                    icon={faFolderOpen}
                                    className="icono-11 color-262 "
                                />
                                &nbsp;&nbsp;
                                {datos.reabierto > 0? datos.reabierto : "0"}
                            </span>)
                            :
                                null
                            }
                             <span className="limitCaracter"
                             
                             >
                                {/* <FontAwesomeIcon
                                    icon={faUserCircle}
                                    className="icono-11 color-262 "
                                />
                                &nbsp;&nbsp; */}
                                {(datos.idEtiquetas.length>0)? 
                                    datos.idEtiquetas.map((etiqueta)=>
                                    <li className="li_card">
                                    <FontAwesomeIcon
                                        icon={faThumbtack}
                                    className="icono-11 color-262 "
                                    />&nbsp;&nbsp;
                                    {etiqueta.nombre}
                                    </li>
                                        
                            )
                                :
                               
                                <li className="li_card">
                                    <FontAwesomeIcon
                                        icon={faThumbtack}
                                    className="icono-11 color-262 "
                                    />&nbsp;&nbsp;
                                    Sin etiquetas
                                    </li>
                            } 
                            </span> 
                        
                        </div>
                    </div>
                </Link>
            </div>
        </React.Fragment>
    );
};

export default Cards;
