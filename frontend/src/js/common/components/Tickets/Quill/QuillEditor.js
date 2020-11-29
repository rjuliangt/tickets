/**
 * Este código fue extraído de: https://github.com/riemmra/react-quill-for-redux-form-component
 *
 * @version             1.0
 *
 * @author              Ricky Raymundo <riemmra@gmail.com>
 * @copyright           Respetar términos de la licencia GPL-3.0 License.
 *
 * History
 * v1.0 – Primera versión
 *
 */

import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
//npm i quill-image-resize-module-react
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/darcula.css";
import "./quill.css";
import hljs from "highlight.js";

Quill.register("modules/imageResize", ImageResize);
const modules = {
    syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
    },
    toolbar: [
        ["bold", "italic", "underline", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
        ["code-block"],
    ],
    clipboard: {
        matchVisual: false,
    },
    imageResize: {
        modules: ["Resize", "DisplaySize"],
    },
};

class QuillEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            loaded: false,
        };

        this.quillRef = null;
        this.reactQuillRef = null;
    }

    objToStr = (ob) => {
        let cad = "";
        let i = true;
        for (const [key, value] of Object.entries(ob)) {
            cad += ` ${key}="${value}"`;
        }
        return cad;
    };

    componentDidMount = () => {
        if (this.state.loaded) {
            this.attachQuillRefs();
        }
    };

    componentDidUpdate() {
        const { input } = this.props;

        if (!this.state.loaded && !!this.props.input.value.html_content) {
            this.setState({ text: input.value.html_content, loaded: true });
        }

        this.attachQuillRefs();
    }

    attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== "function") return;
        this.quillRef = this.reactQuillRef.getEditor();
    };

    imageExtension = (url) => {
        if (url.includes("base64")) {
            var inputMIME = url.split(",")[0].split(":")[1].split(";")[0];
            let tipo = "png";
            if (inputMIME === "image/jpeg") {
                tipo = "jpg";
            } else if (inputMIME === "image/gif") {
                tipo = "gif";
            }
            return tipo;
        } else {
            return url.split(".").pop().split(/\#|\?/)[0];
        }
    };

    extractImages = async () => {
        const { input } = this.props;
        let html_content;
        const obs = [];
        this.setState({ images: [] });
        const media_url = "https://test115.ciancoders.com/media/Imagenes/";
        // const media_url = "http://localhost:8080/media/Imagenes/";
        if (!!this.reactQuillRef && !!this.quillRef) {
            html_content = this.state.text;
            const delta = this.quillRef.getContents();
            delta.forEach((op) => {
                const attr = op.attributes ? this.objToStr(op.attributes) : "";
                if (
                    typeof op.insert === "object" &&
                    op.insert.hasOwnProperty("image")
                ) {
                    const extension = this.imageExtension(op.insert.image);
                    const name = Math.random().toString(36).slice(-8);
                    const new_tag = `<img src="${media_url}${name}.${extension}"${attr} />`;
                    html_content = html_content.replace(
                        `<img src="${op.insert.image}"${attr}>`,
                        new_tag
                    );
                    html_content = html_content.replace(
                        `<img src="${op.insert.image}"${attr} style="">`,
                        new_tag
                    );
                    html_content = html_content.replace(
                        `<img src="${op.insert.image}"${attr} style="cursor: nwse-resize;">`,
                        new_tag
                    );

                    obs.push({
                        url: op.insert.image,
                        name,
                        extension,
                    });
                }
            });
        }

        const promises = obs.map(async (ob) => {
            const complete_name = `${ob.name}.${ob.extension}`;
            const blob = await fetch(ob.url).then((r) => r.blob());
            const file = new File([blob], complete_name, { type: blob.type });
            return { name: complete_name, file };
        });

        const images = await Promise.all(promises);

        const object = { images, html_content };
        input.onChange(object);
    };

    handleChange = (value) => {
        this.setState({ text: value });
        this.extractImages();
    };

    render() {
        return (
            <React.Fragment>
                <ReactQuill
                    ref={ ( el ) => {
                        this.reactQuillRef = el;
                    } }
                    modules={ modules }
                    value={ this.state.text }
                    onChange={ this.handleChange }
                    style={ { minHeight: "110px" } }
                />
            </React.Fragment>
        );
    }
}

export default QuillEditor;
