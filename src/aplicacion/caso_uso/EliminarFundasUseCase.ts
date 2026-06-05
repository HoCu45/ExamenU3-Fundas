//Eliminar Fundas Use Case

import type { IEliminarFundasUseCase } from "../ports/input/fundas/IEliminarFundasUseCase";
import type { IFundasRepositoryPort } from "../ports/output/IFundasRepositoryPort";

export class EliminarFundasUseCase implements IEliminarFundasUseCase {

    constructor (
        private FundasRepository: IFundasRepositoryPort
    ) {}

    async execute (id: number): Promise<void> {
        

        //Verificar existencia

        const Fundas = await this.FundasRepository.findById(id);

        if(!Fundas) {
            throw new Error(
                "Fundas no encontrado"
            );
        }

        //ELIMINAR

        await this.FundasRepository.deleteById(id);
    }
}