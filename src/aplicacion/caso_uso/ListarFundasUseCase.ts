import type { IFundasRepositoryPort } from "../ports/output/IFundasRepositoryPort";

import { FundasDTO } from "../dto/FundasDTO";
import type { IListarFundassUseCase } from "../ports/input/fundas/IListarFundasUseCase";

export class ListarFundassUseCase implements IListarFundassUseCase {

    constructor (
        private FundasRepository: IFundasRepositoryPort
    ){}

    async execute(): Promise<FundasDTO[]> {
        const Fundass = await this.FundasRepository.findAll();

        return Fundass.map(
            Fundas =>
                new FundasDTO(
                    Fundas.id!,
                    Fundas.modelo,
                    Fundas.tipo
                )
        );
    }
}