import React from "react";
// import formatDistanceToNow from "date-fns/formatDistanceToNow";
// import { es } from "date-fns/locale";
// import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
// import "../../../../../../style/ticket";
import { Link } from "react-router-dom";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faReply, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { faFile } from "@fortawesome/free-regular-svg-icons";

const Comentarios = ({ datos, leer, idUsuario, idTicket }) => {
    return (
        <React.Fragment>
            {datos.idAutor.rol == "Cliente" ? (
                <div className="cardTicketStyle px-3 py-2 my-2 ">
                    <div className="d-flex justify-content-between">
                        <p className="mb-2 txt-12">
                            <span className="text-dark txt-12-n">
                                Cliente: &nbsp;&nbsp;
                            </span>

                            {datos.idAutor.nombre}

                            <span className="txt-11">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {formatDistanceToNow(
                                    new Date(datos.actualizado),
                                    {
                                        locale: es,
                                    }
                                )}
                                ,&nbsp;
                                {moment(datos.actualizado).format("L, h:mm a")}
                            </span>
                        </p>
                        <div>
                            <Link
                                to={`/comentario/${datos.id}/editar`}
                                style={{
                                    textDecoration: "none",
                                    color: "#FFC817",
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faPen}
                                    className="icono color-FFC"
                                />
                            </Link>
                        </div>
                    </div>
                    <p className="txt-11">{datos.contenido}</p>
                </div>
            ) : (
                <div className="d-flex flex-row">
                    <div className=" pt-5 mx-3">
                        {datos.comentario ? (
                            <FontAwesomeIcon
                                icon={faReply}
                                className="icono color-003 "
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faFile}
                                className="icono color-003 "
                            />
                        )}
                    </div>
                    <div
                        className=" px-3 py-2 my-2 w-100"
                        style={{
                            backgroundColor: datos.comentario
                                ? "#E5E5E5"
                                : "#FFF0E9",
                            borderRadius: 12,
                        }}
                    >
                        <div className="d-flex justify-content-between txt-12 color-003">
                            <p className="mb-2">
                                <span className="color-003 txt-12-n">
                                    {datos.comentario
                                        ? "Respuesta: "
                                        : "Nota: "}
                                    &nbsp;&nbsp;
                                </span>

                                {datos.idAutor.nombre}

                                <span className="txt-11">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {formatDistanceToNow(
                                        new Date(datos.actualizado),
                                        {
                                            locale: es,
                                        }
                                    )}
                                    ,&nbsp;
                                    {moment(datos.actualizado).format(
                                        "L, h:mm a"
                                    )}
                                </span>
                            </p>

                            <div>
                                {idUsuario == datos.idAutor.id ? (
                                    <Link
                                        to={`/comentario/${datos.id}/editar`}
                                        style={{
                                            textDecoration: "none",
                                            color: "#FFC817",
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            className="icono color-FFC"
                                        />
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                        {datos.comentario && (
                            <p className="mb-2 color-003 txt-11-n color-FF4">
                                Para: &nbsp;&nbsp;
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className=" "
                                />
                                &nbsp;&nbsp;
                                <span className="txt-11 color-FF4">
                                    {datos.idUsuarioCliente
                                        ? datos.idUsuarioCliente.email
                                        : "Correo No Definido"}
                                </span>
                            </p>
                        )}
                            {/* <p className="txt-11">{ datos.contenido }</p> */}
                            <div className="box-image"
                                    dangerouslySetInnerHTML={{
                                        __html: datos.contenido,
                                    }}
                            />
                            
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default Comentarios;
