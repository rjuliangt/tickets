import React from "react";
// import formatDistanceToNow from "date-fns/formatDistanceToNow";
// import { es } from "date-fns/locale";
// import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
// import "../../../../../../style/ticket";
import { Link } from "react-router-dom";
const Comentarios = ({ datos, leer, idUsuario }) => {
    return (
        <React.Fragment>
            {/* <div className=" px-3 py-2 my-2 "></div> */}
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
                                to={`/comentarioCliente/${datos.id}/editar`}
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
                    <i className="material-icons pt-5 mx-3">
                        {datos.comentario ? "reply" : "insert_drive_file"}
                    </i>
                    <div
                        className=" px-3 py-2 my-2 w-100"
                        style={{
                            backgroundColor: datos.comentario
                                ? "#E5E5E5"
                                : "#FFF0E9",
                            borderRadius: 12,
                        }}
                        // style={{ backgroundColor: ", borderRadius: 12 }}
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
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    Hace:{" "}
                                    {formatDistanceToNow(
                                        new Date(datos.actualizado),
                                        {
                                            locale: es,
                                        }
                                    )}
                                </span>
                            </p>
                            <div>
                                {idUsuario == datos.idAutor.id ? (
                                    <Link
                                        to={`/comentarioCliente/${datos.id}/editar`}
                                        style={{
                                            textDecoration: "none",
                                            color: "#FFC817",
                                        }}
                                    >
                                        <i className="material-icons">edit</i>
                                    </Link>
                                ) : null}
                                {datos.comentario ? (
                                    <Link
                                        to={`/comentarioCliente/${datos.id}/editar`}
                                        style={{
                                            textDecoration: "none",
                                            color: "##0571CD",
                                        }}
                                    >
                                        <i className="awesome5">pen</i>
                                    </Link>
                                ) : null}
                            </div>
                            {/* <span>editar</span> */}
                        </div>

                        <p className="txt-11">{datos.contenido}</p>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default Comentarios;
