//iNPUT PORT
//CREAR Fundas

import { CreateFundasRequest } from "../../../dto/CreateFundasRequest";
import { FundasDTO } from "../../../dto/FundasDTO";

export interface ICrearFundasUseCase {
    execute(
        request: CreateFundasRequest
    ): Promise<FundasDTO>;
}