//IFundasUse Case

import { Fundas } from "../../../dominio/entities/Fundas";

export interface IFundasRepositoryPort {
    save(Fundas: Fundas): Promise<Fundas>;

    findById(id: number): Promise<Fundas | null>;

    findAll(): Promise<Fundas[]>;

    deleteById(id: number): Promise<void>;

    existsBytipo(tipo: string): Promise<boolean>;
}