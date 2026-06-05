// index.ts

// Arquitectura Hexagonal + Bun + PostgreSQL

import { db } from "./infraestructura/database/postgress";

import { FundasRepositoryImpl } from "./infraestructura/adaptadores/output/postgres_sql/FundasRepositoryImpl";

import { FundasService } from "./aplicacion/services/FundasService";

import { FundasController } from "./infraestructura/adaptadores/input/http/FundasController";
import { EliminarFundasUseCase } from "./aplicacion/caso_uso/EliminarFundasUseCase";
import { ActualizarFundasUseCase } from "./aplicacion/caso_uso/ActualizarFundasUseCase";
import { CrearFundassUseCase } from "./aplicacion/caso_uso/CrearFundasUseCase";
import { ObtenerFundassUseCase } from "./aplicacion/caso_uso/ObtenerFundasUseCase";
import { ListarFundassUseCase } from "./aplicacion/caso_uso/ListarFundasUseCase";
import { CreateFundasRequest } from "./aplicacion/dto/CreateFundasRequest";
import { ActualizarFundasRequest } from "./aplicacion/dto/ActualizarFundasRequest";

/*

DEPENDENCY INJECTION

*/

const fundasRepository =
new FundasRepositoryImpl (db);

/*

USE CASE INSTANCES

*/

const crearfundasUseCase =

new CrearFundassUseCase (

fundasRepository
);

const obtenerfundasUseCase =

new ObtenerFundassUseCase (

fundasRepository

);

const listarfundassUseCase =

new ListarFundassUseCase (

fundasRepository

);

const actualizarfundasUseCase =

new ActualizarFundasUseCase (

fundasRepository

);

const eliminarfundasUseCase =

new EliminarFundasUseCase (

fundasRepository

);

/*

SERVICE INSTANCE

*/



const fundassService =

new FundasService (

crearfundasUseCase,

obtenerfundasUseCase,

listarfundassUseCase,

actualizarfundasUseCase,

eliminarfundasUseCase

);

const fundassController =

new FundasController(

    fundassService

);

/*

HELPER JSON RESPONSE

*/

function json (data: unknown, status = 200) : Response {

return new Response (

JSON. stringify (data, null, 2),

{

status,

headers: {

"Content-Type": "application/json",
        },
    }
)
};


/*

SERVIDOR

*/

const server = Bun.serve({

    port:3001,
    
    async fetch(req) {

        try {

            /*
            REQUEST INFO
            */

            const url = new URL(req.url);

            const pathname = url.pathname;

            const method = req.method;

            console.log (`\n${method} ${pathname}`);

            /*

            fundass

            */

            if (pathname === "/fundas") {

                /*

                get /fundass

                */

                if (method === "GET") {
                    const fundass = 
                        await fundassController.listarFundass();

                    return json(fundass);
                }

                /*

                POST /fundass

                */

                if (method === "POST") {

                    const body = await req.json() as {
                           modelo?: string;
                           tipo?: string;
                        };

                    const modelo = body.modelo?.trim();

                    const tipo = body.tipo?.trim();

                    /*

                    VALIDACIONES

                    */

                    if (!modelo || !tipo) {
                        return json(
                            {
                                error: "modelo y tipo son obligatorios",
                            },
                            400

                        );
                    }

                    /*

                    CREAR fundas

                    */

                    const dtoUser = new CreateFundasRequest(modelo, tipo);
                    const fundas= 
                        await fundassController.crearFundas(dtoUser);

                    return json (fundas, 201);
                }

                /*

                método no permitido

                */

                return json(
                    {
                        error: "method not allowed",
                    },
                    405
                );
            }

            /*

            /fundass/id

            */

            if (pathname.startsWith("/fundas/")) {

                /*

                obtener ID

                */

                const idStr = pathname.split("/")[2];

                const id = Number(idStr);

                /*Validad ID

                */

                if (!Number.isInteger(id) || id<= 0) {

                    return json (
                        {
                            error: "ID inválida",
                        },
                        400
                    );
                }
                /*

                GET /fundass/id

                */

                if(method==="GET") {
                    
                    const fundas = await fundassController.obtenerFundas(id);

                    if (!fundas) {

                        return json(
                        {
                            error: "fundas no encontrado",
                        },
                        400
                    );
                    }

                    return json(fundas);
                }

                /*

                PUT /fundass/id

                */

            if (method == "PUT") {

                const body = await req.json() as {

                    modelo?: string;
                    tipo?: string;
                    };

                const modelo = body.modelo?.trim();

                const tipo = body.tipo?.trim();

                /*

                VALIDACIONES

                */

                if (!modelo || !tipo) {

                    return json (
                        {
                            error: "modelo y tipo son obligatorios",
                        },
                        400
                    );
                }

                try {

                    const dtoActualizarfundas = new ActualizarFundasRequest(id, modelo, tipo);

                    const fundas = await fundassController.actualizarFundas(dtoActualizarfundas);
                
                    return json(fundas);
                } catch (error: any) {

                    return json (
                        {
                            error: error.message,
                        },
                        404
                    );
                }
            }

            /*

            DELETE /fundass/:ID

            */

            if (method === "DELETE") {

                try {
                    const fundas = await fundassController.obtenerFundas(id );

                if (!fundas) {
                    return json(
                        {
                            error: "fundas no encontrado",
                        },
                        404
                    );
                }

                await fundassController.eliminarFundas(id);

                return json ({
                    message: "fundas eliminado",
                    fundas,
                });

                } catch (error: any) {

                    return json(
                        {
                            error: error.message,
                        },
                        500
                    );
                }
            }

            /*

            METODO NO PERMITIDO

            */

            return json (
                {
                    error: "method not allowed",
                },
                405
            );
            }
            /*

            RUTA NO ENCONTRADA

            */

            return json (
                {
                    error: "Ruta no encontrada",
                },
                404
            );

        } catch (error) {

            /*

            error interno

            */

            console.error("\n ERROR INTERNO");

            console.error(error);

            return json (
                {
                    error: "internal server error",
                },
                500
            );
        }


    },



});