import React, { Component } from "react";
import AsyncCreatableSelect from "react-select/lib/AsyncCreatable";

export default class CreateSelect extends Component {
    state = {
        isLoading: false,
    };

    // handleCreate = (inputValue) => {
    //     //    Condicionar
    //     this.setState({ isLoading: true });
    //     console.log(inputValue);
    //     // const { inputValue } = this.props;
    //     // showForm(true);
    //     // return inputValue;
    // };
    // handleCreate = (inputValue) => {
    //     //    Condicionar

    //     console.log("creando esto", inputValue);
    //     // const { inputValue } = this.props;

    //     // console.log("creando esto", inputValue);
    //     // showForm(true);
    //     const dato = { label: "holahola", value: 33 };
    //     // this.setState({ datoValue: dato });
    //     return dato;
    // };

    render() {
        const { isLoading } = this.state;
        const {
            loadOptions,
            input,
            disabled,
            inputValue,
            ValorProyecto,
            onCreateOption,
        } = this.props;
        // console.log("desde createSelect multi", this.props);
        return (
            <React.Fragment>
                <div className="d-flex flex-column w-50">
                    {this.props.children}
                </div>
                <AsyncCreatableSelect
                    isClearable
                    isMulti
                    cacheOptions
                    defaultOptions
                    isDisabled={disabled}
                    isLoading={isLoading}
                    loadOptions={loadOptions}
                    onChange={(e) => {
                        input.onChange(e ? e : null);
                        console.log("tecleando");
                    }}
                    // onCreateOption={this.handleCreate}
                    onCreateOption={onCreateOption}
                    value={input.value}
                />
            </React.Fragment>
        );
    }
}
