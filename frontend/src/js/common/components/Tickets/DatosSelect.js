import { api } from "../../../utility/api";

export const getPropiedades = (search, nombre, filtrar = false) => {
    let datos = [];
    if (filtrar) {
        datos.push({ label: "Todos", value: "" });
        search = { search };
    } else {
        search = { search, activo: true };
    }
    console.log("este es seeeee", search);

    // console.log("dentro de getPropiedades #2", search);
    // console.log("dentro de getPropiedades #nombre", nombre);
    return api
        .get(nombre, search)
        .then((response) => {
            if (response) {
                response.results.forEach((grupo) => {
                    datos.push({
                        value: grupo.id,
                        label: grupo.nombre,
                    });
                });
            }

            return datos;
        })
        .catch(() => {
            return [];
        });
};

export const getAgente = (search) => {
    let agentes = [{ label: "Todos", value: "" }];
    return api
        .get("user", { search })
        .then((response) => {
            if (response) {
                response.results.forEach((agente) => {
                    agentes.push({
                        value: agente.id,
                        label: agente.first_name,
                    });
                });
            }

            return agentes;
        })
        .catch(() => {
            return [];
        });
};
