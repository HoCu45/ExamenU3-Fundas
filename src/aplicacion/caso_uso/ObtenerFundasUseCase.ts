import type { IFundasRepositoryPort } from "../ports/output/IFundasRepositoryPort";

import { FundasDTO } from "../dto/FundasDTO";
import type { IObtenerFundasUseCase } from "../ports/input/fundas/IObtenerFundasUseCase";

export class ObtenerFundassUseCase implements IObtenerFundasUseCase {
    
    constructor (
        private FundasRepository: IFundasRepositoryPort
    ){}

    async execute (
        id:number
    ): Promise <FundasDTO | null> {
        const Fundas = await this.FundasRepository.findById(id);

        if(!Fundas) {
            return null;
        }

        return new FundasDTO(
            Fundas.id!,
            Fundas.modelo,
            Fundas.tipo
        )
    }
}