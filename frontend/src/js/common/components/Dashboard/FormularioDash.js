import React, { Component } from "react";
import './dashboard.css';

class Dashboard extends Component {
    componentWillMount = () => {
        this.props.getDashboard();
        this.props.getDashBoardSemanal();
    };

    render() {
        const { dataDashboard,
                dataDashBoardSemanal,
       } = this.props;
       const DatosDashboard = dataDashboard;
       const DashBoardSeamanal = dataDashBoardSemanal;
     
        console.log("Datos de DASHBOARD: ", DatosDashboard);
        console.log("DASHBOARD Semanal: ", DashBoardSeamanal);



        return (
            <React.Fragment>
                {DatosDashboard && DashBoardSeamanal ? (
                    <div className="d-flex flex-column w-100 px-3">
                        <div className="page-header pl-1 pt-3 no-gutters row">
                    <div className="text-sm-left text-center text-md-left mb-sm-0 col-12 col-sm-4">
                        <div
                            style={{
                                border: "1px solid #B3B8BC",
                                borderRadius:
                                    "0.8640833497047424px 22px 22px 0.8640833497047424px",
                                width: 100,
                                height: 25,
                                lineHeight: "23px",
                                textAlign: "center",
                                letterSpacing: "-0.36px",
                            }}
                            className="txt-12"
                        >
                            DASHBOARD
                        </div>
                    </div>
                </div>
                        <div className="d-flex flex-wrap mb-2  mt-4">
                            <h3 className="txt-22-n color-003 w-50">Dashboard</h3>
                        </div> 

                        {/* inicio de dahsboard */}

                        {/* Primer Flex */}
                        <div className="d-flex bd-highlight example-parent ">

                            {Object.keys(DatosDashboard.Results.Dashboard_estados).map(
                                (estado,i) => (
                                    <React.Fragment>
                                        <div className="p-2 flex-fill bd-highlight col-example dash_card-resumen">
                                            {
                                                estado
                                            }
                                            <div className="dash_card_inside">
                                                {DatosDashboard.Results.Dashboard_estados[estado]}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            )}

                            
                        </div>

                        {/* Segundo Flex */}
                      
                        <div className="d-flex bd-highlight example-parent ">
                            <div className="p-2 box2 bd-highlight col-example dash_card-resumen">
                                Total de Tickets 
                                <div className="d-flex bd-highlight example-parent dash_card_puntuacion">
                                    <div className="p-2 flex-fill bd-highlight col-example">
                                        (Global)
                                        <div className="dash_card_inside_puntuacion">
                                        {DatosDashboard.Results.Total_Tickets}
                                        </div>
                                    </div>
                                   
                                </div>
                                <a href="/#/cards" style={{ color: "#3e9ac1" }}>
                                    Ir a Tickets
                                </a>
                            </div>

                            <div className="p-2 box2 bd-highlight col-example dash_card-resumen">
                                Top de tickets resueltos hoy
                                <div className="dash_card_inside">
                                    {DatosDashboard.Results.resueltos_hoy}
                                </div>
                            </div>

                            <div className="p-2 flex-fill bd-highlight col-example dash_card-resumen2">
                                Rezago de ticket Abiertos
                                <div className="dash_card_inside">
                                {DatosDashboard.Results.rezago_NoAprobados}
                                  
                                </div>
                            </div>

                            <div className="p-2 flex-fill bd-highlight col-example dash_card-resumen2">
                                Resueltos + Cerrados
                                <div></div>
                                <div className="dash_card_inside">
                                {DatosDashboard.Results.resueltos_cerrados} 
                                </div>
                            </div>

                            <div className="p-2 flex-fill bd-highlight col-example dash_card-resumen2">
                                Promedio de respuesta de ticket
                                <div className="dash_card_inside">_ _ </div>
                            </div>
                        </div>

                        {/* Tercer Flex */}
                        <div className="d-flex bd-highlight example-parent ">
                            {/* <div className="dash_card-title">
                                {" "}
                                {" "}
                            </div> */}
                            <h3 className="txt-22-n color-003 w-40 dash_card-title">Estado de tickets general</h3>

                               {Object.keys(DatosDashboard.Results.prioridad.conteo_totalp).map(
                                (prioridad,i) => (
                                    <React.Fragment>
                                        <div className="p-2 flex-fill bd-highlight col-example dash_card-resumen">
                                            {
                                                prioridad
                                            }
                                            <div className="dash_card_inside">
                                                {DatosDashboard.Results.prioridad.conteo_totalp[prioridad]}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            )}

                           
                        </div>

                        {/* Cuarto Flex */}
                        <div className="d-flex bd-highlight example-parent ">
                            {/* <div className="dash_card-title">
                                {" "}
                                Estado de tickets Semanal{" "}
                            </div> */}
                            <h3 className="txt-22-n color-003 w-40 dash_card-title">Estado de tickets Semanal</h3>
                            
                            {Object.keys(DashBoardSeamanal.Results.prioridad.conteo_totalp).map(
                                (prioridad,i) => (
                                    <React.Fragment>
                                        <div className="p-2 flex-fill bd-highlight col-example dash_card-resumen">
                                            {
                                                prioridad
                                            }
                                            <div className="dash_card_inside">
                                                {DashBoardSeamanal.Results.prioridad.conteo_totalp[prioridad]}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            )}
                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        );
    }
}

export default Dashboard;
