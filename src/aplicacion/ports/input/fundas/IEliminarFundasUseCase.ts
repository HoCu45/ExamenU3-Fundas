//INPUT PORT 
//ELIMINAR Fundas

export interface IEliminarFundasUseCase {

    execute(
        id:number
    ): Promise<void>;
}