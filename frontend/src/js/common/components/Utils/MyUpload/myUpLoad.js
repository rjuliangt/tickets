const React = require("react");
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

class Upload extends React.Component {
    state = {
        archivos: [],
        url_archivos: [],
    };

    handleChange = (event) => {
        console.log("EVENT: ", event.target.files);

        //add...
        let archivos = [];
        if (this.props.multiple) {
            archivos = this.state.archivos;
        }

        //const archivos = this.state.archivos; //mod
        const listaArchivos = event.target.files;

        let indice_acumulado = archivos.length;

        for (let iterador = 0; iterador < listaArchivos.length; iterador++) {
            const archivo = listaArchivos.item(iterador);
            const indice = iterador + 1 + indice_acumulado; //mod
            const name = "archivo" + indice.toString();
            archivos.push({ name, file:archivo });
            // this.handleChange(archivos);
            console.log("desde for ");
            const img = URL.createObjectURL(archivo);

            //add...
            let url_archivos = [];
            if (this.props.multiple) {
                url_archivos = this.state.url_archivos;
            }

            //let url_archivos = this.state.url_archivos;
            url_archivos.push(img);

            this.setState({ url_archivos, archivos });
            this.props.setFiles(archivos);
        }
    };

    removeFile = (index) => {
        const url_archivos = this.state.url_archivos.filter((item, key) => {
            if (key !== index) {
                return item;
            }
        });

        const archivos = this.state.archivos.filter((item, key) => {
            if (key !== index) {
                return item;
            }
        });

        // this.props.removeFile(archivos);
        this.setState({ url_archivos, archivos });
        this.props.setFiles(archivos);
    };

    getData = () => {
        return this.state.archivos;
    };

    render() {
        return (
            <div className="d-flex flex-row flex-wrap">
                {this.state.url_archivos.length > 0 ? (
                    <React.Fragment>
                        {this.state.url_archivos.map((item, i) => {
                            let pdf = false;
                            let extension= this.state.archivos[ i ].file.name.substring( this.state.archivos[ i ].file.name.length -4 )
                            console.log( 'extension: ', extension )
                            let nombre_img = 'upload'
                            try {
                                if (
                                    this.state.archivos[
                                        i
                                    ].file.name.includes(".pdf")
                                ) {
                                    pdf = true;
                                }
                            } catch (e) {
                                console.log("error: ", e);
                            }
                            if ( extension.includes( 'xls' ) ) {
                                nombre_img = 'excel'
                            }
                            else if ( extension.includes( 'doc' ) ) {
                                nombre_img = 'doc'
                            }
                            else if ( extension.includes( 'ppt' ) ) {
                                nombre_img = 'ppt'
                            }
                            else {
                            //    nombre_img =  extension.substring(1,extension.length)
                               nombre_img =  'upload'
                            }
                            return (
                                <div
                                    key={i}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        marginRight: 20,
                                        alignContent: "right",
                                        position: "relative",
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => this.removeFile(i)}
                                        style={{
                                            borderRadius: 10,
                                            background: "red",
                                            color: "white",
                                            fontWeight: "bold",
                                            border: "none",
                                            width: 21,
                                            height: 21,
                                            textAlign: "center",
                                            alignItems: "center",
                                            padding: "",
                                            position: "absolute",
                                            cursor: "pointer",
                                            right: 5,
                                            top: 5,
                                        }}
                                    >
                                        x
                                    </button>
                                    {nombre_img ? (
                                        // <img src={require("../../../../../assets/img/icons/pdf.png")} style={{width:100, height:100}}/>
                                        <React.Fragment>
                                        <img
                                            src={require(`../../../../../assets/img/${nombre_img}.png`)}
                                            style={{ width: 100, height: 100 }}
                                            />
                                            <label>
                                                {
                                                    this.state.archivos[ i ].file.name.slice(0,15)
                                                }
                                            </label>
                                        </React.Fragment>
                                    ) : (
                                        <img
                                            src={item}
                                            style={{ width: 100, height: 100 }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </React.Fragment>
                ) : null}

                <label
                    className="d-flex m-3 flex-row font-weight-bolder justify-content-center align-items-center"
                    // style={{
                    //     width: 100,
                    //     height: 100,
                    //     background: "#dcdcdc",
                    //     cursor: "pointer",
                    // }}
                >
                    
                    <input
                        type="file"
                        onChange={this.handleChange}
                        multiple={this.props.multiple}
                        style={{
                            display: "none",
                        }}
                    />
                    <div
                        className="d-flex flex-row justify-content-center align-items-center"
                        // style={{
                        //     width: 40,
                        //     height: 40,
                        //     background: "#7F7F7F",
                        //     textAlign: "center",
                        //     borderRadius: 5,
                        // }}
                    >
                        <FontAwesomeIcon
                            icon={faPaperclip}
                            className="icono color-057"
                        />
                    Adjuntar archivo
                    </div>
                </label>

                <input
                    type="file"
                    onChange={this.handleChange}
                    multiple={this.props.multiple}
                    style={{
                        display: "none",
                    }}
                />
            </div>
        );
    }
}

export default Upload;
