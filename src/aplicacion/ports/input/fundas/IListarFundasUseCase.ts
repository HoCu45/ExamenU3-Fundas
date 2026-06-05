//INPUT PORTS
//LISTAR FundasS

import { FundasDTO } from "../../../dto/FundasDTO";

export interface IListarFundassUseCase {
    execute(): Promise<FundasDTO[]>;
}