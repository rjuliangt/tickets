import React, { Component } from "react";
import PropTypes from "prop-types";
import { BootstrapTable } from "react-bootstrap-table";
import LoadMask from "../LoadMask/LoadMask";
import "./estilos.css";

export default class Grid extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        onPageChange: PropTypes.func,
        onSortChange: PropTypes.func,
    };

    static defaultProps = {
        loading: false,
    };
    rowClassNameFormat = (row, rowIdx) => {
        // row is whole row object
        // rowIdx is index of row
        return rowIdx % 2 === 0 ? "fila-blanca" : "fila-gris";
    };
    render() {
        const {
            loading,
            data,
            page,
            remote = true,
            expandableRow,
            expandComponent,
            cellEditProp,
            afterSave,
            onPageChange,
            onSortChange,
            pagination,
            expanding,
            onExpand,
            trClassName,
            ...other
        } = this.props;
        const options = {
            sizePerPage: 10,
            hideSizePerPage: true,
            paginationSize: 5,
            alwaysShowAllBtns: true,
            noDataText: loading ? "Cargando..." : "No hay datos",
            page,
            onPageChange: onPageChange ? onPageChange : () => {},
            onSortChange: onSortChange ? onSortChange : () => {},
            onExpand: onExpand,
        };

        const paginar = !(pagination === false);

        return (
            <div>
                <LoadMask loading={loading} dark blur>
                    <BootstrapTable
                        tableHeaderClass="grid-head"
                        trClassName={this.rowClassNameFormat}
                        expandableRow={expandableRow}
                        expandComponent={expandComponent}
                        // trClassName={trClassName}
                        cellEdit={cellEditProp}
                        data={loading ? [] : data.results}
                        afterSaveCell={afterSave}
                        remote={remote}
                        pagination={paginar}
                        fetchInfo={{ dataTotalSize: data.count }}
                        options={ options }
                        tableContainerClass= {'grid-width'}
                        {...other}
                    />
                </LoadMask>
            </div>
        );
    }
}
