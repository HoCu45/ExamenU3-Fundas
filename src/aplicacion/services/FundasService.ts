import type { IFundasRepositoryPort } from "../ports/output/IFundasRepositoryPort";

import { FundasDTO } from "../dto/FundasDTO";

import { CreateFundasRequest } from "../dto/CreateFundasRequest";
import { ActualizarFundasRequest } from "../dto/ActualizarFundasRequest";

import { Fundas} from "../../dominio/entities/Fundas";
import type { ICrearFundasUseCase } from "../ports/input/fundas/ICrearFundasUseCase";
import type { IActualizarFundasUseCase } from "../ports/input/fundas/IActualizarFundasUseCase";
import type { IEliminarFundasUseCase } from "../ports/input/fundas/IEliminarFundasUseCase";
import type { IObtenerFundasUseCase } from "../ports/input/fundas/IObtenerFundasUseCase";
import type { IListarFundassUseCase } from "../ports/input/fundas/IListarFundasUseCase";

export class FundasService {
    constructor(
    private CrearFundassUseCase: ICrearFundasUseCase,
    private ObtenerFundassUseCase: IObtenerFundasUseCase,
    private ListarFundassUseCase: IListarFundassUseCase,
    private ActualizarFundassUseCase: IActualizarFundasUseCase,
    private EliminarFundassUseCase: IEliminarFundasUseCase,
  ) {}

  async listarFundass(): Promise<FundasDTO[]> {
    const Fundass = await this.ListarFundassUseCase.execute();

    return Fundass.map(
        Fundas => new FundasDTO(
            Fundas.id!,
            Fundas.modelo,
            Fundas.tipo
        )

    );
      

}

async crearFundas(
    request: CreateFundasRequest
): Promise<FundasDTO> {
    const Fundas = await this.CrearFundassUseCase.execute(request);

    return new FundasDTO(
        Fundas.id!,
        Fundas.modelo,
        Fundas.tipo
    )
}

async obtenerFundas(id: number): Promise<FundasDTO|null>{

    const Fundas = await this.ObtenerFundassUseCase.execute(id);

    if(!Fundas){
        return null;
    }
    else{
    return new FundasDTO(
    Fundas.id!,
    Fundas.modelo,
    Fundas.tipo
    )
    }
    
    

}

async actualizarFundas(
id: number,
request: ActualizarFundasRequest
): Promise<FundasDTO>{
    const Fundas =
await this.ActualizarFundassUseCase.execute(
id,
request
)

return new FundasDTO(
Fundas.id!,
Fundas.modelo,
Fundas.tipo
)
}

async eliminarFundas(id: number): Promise<void>{
await this.EliminarFundassUseCase.execute(id);
}

}
