//ACTUALIZAR Fundas USE CASE

import type {IFundasRepositoryPort} from "../ports/output/IFundasRepositoryPort";

import { FundasDTO } from "../dto/FundasDTO";

import { ActualizarFundasRequest } from "../dto/ActualizarFundasRequest";
import type { IActualizarFundasUseCase } from "../ports/input/fundas/IActualizarFundasUseCase";

export class ActualizarFundasUseCase implements IActualizarFundasUseCase {

constructor (
private FundasRepository: IFundasRepositoryPort
){}

async execute (
id: number,
request: ActualizarFundasRequest
): Promise<FundasDTO> {

    //Buscar Fundas

    const Fundas =

await this. FundasRepository
.findById (id) ;

if (!Fundas) {
throw new Error (
"Fundas no encontrado"
);
}


//actualizar entidad

Fundas. actualizar (

request . modelo,
request . tipo
);

/*

GUARDAR CAMBIOS

*/

const updated =
await this.FundasRepository

. save (Fundas) ;

/*

RESPUESTA
*/
return new FundasDTO (
updated. id!,
updated. modelo,
updated. tipo
);
}
}