//input port
//actualizar Fundas

import { ActualizarFundasRequest } from "../../../dto/ActualizarFundasRequest";
import { FundasDTO } from "../../../dto/FundasDTO";
export interface IActualizarFundasUseCase {
    execute(
        id: number,
        request: ActualizarFundasRequest
    ): Promise<FundasDTO>;
}