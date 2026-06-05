//CREAR Fundas USE CASE

import type { IFundasRepositoryPort } from "../ports/output/IFundasRepositoryPort";
import { Fundas} from "../../dominio/entities/Fundas";
import { FundasDTO } from "../dto/FundasDTO";
import { CreateFundasRequest } from "../dto/CreateFundasRequest";
import type {ICrearFundasUseCase} from "../ports/input/fundas/ICrearFundasUseCase";

export class CrearFundassUseCase implements ICrearFundasUseCase {

    constructor(
        private FundasRepository: IFundasRepositoryPort
    ){}

    async execute (
        request: CreateFundasRequest
    ): Promise<FundasDTO> {

        //VALIDAR tipo DUPLICADO

        const exists = await this.FundasRepository.existsBytipo(request.tipo);

        if(exists){
            throw new Error(
                "El tipo ya Existe"
            );
        }

        //CREAR ENTIDAD

        const fundas = Fundas.crear(
            request.modelo,
            request.tipo
        );

        //guardar

        const saved = await this.FundasRepository.save(fundas);

        //respuesta

        return new FundasDTO (
            saved.id!,
            saved.modelo,
            saved.tipo
        );
    }
}