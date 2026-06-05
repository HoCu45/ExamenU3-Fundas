//INPUT PORT
//OBTENER Fundas

import { FundasDTO } from "../../../dto/FundasDTO"

export interface IObtenerFundasUseCase {
    execute(
        id: number
    ): Promise<FundasDTO | null>;
}