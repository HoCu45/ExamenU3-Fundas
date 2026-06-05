//ADAPTER OUT - REPOSITORY

import { Pool } from "pg";

import type { IFundasRepositoryPort } from "../../../../aplicacion/ports/output/IFundasRepositoryPort";
import { Fundas } from "../../../../dominio/entities/Fundas";

export class FundasRepositoryImpl implements IFundasRepositoryPort {
    constructor(
        private db:Pool
    ){}

    private reconstruirFundas(row:any): Fundas{

        return Fundas.reconstruir(
            row.id,
            row.modelo,
            row.tipo
        );
    }
    async save (Fundas: Fundas): Promise<Fundas> {
        if (Fundas.id === null) {
           const result = await this.db.query(
             `
            INSERT INTO Fundas(modelo, tipo)
            VALUES($1, $2)
            RETURNING *
             `,
            [Fundas.modelo, Fundas.tipo]
            );

            const row = result.rows[0];

            return this.reconstruirFundas(row);
        }

        const result = await this.db.query(
            `
            UPDATE Fundas
            SET modelo = $1,
                tipo = $2
            WHERE id = $3
            RETURNING *
            `,
            [
                Fundas.modelo,
                Fundas.tipo,
                Fundas.id
            ]
        );

        const row = result.rows[0];

        return this.reconstruirFundas(row);
    }

    async findById(id: number): Promise<Fundas | null> {
         const result = await this.db.query(
            `
            SELECT *
            FROM Fundas
            WHERE id = $1
            `,
            [id]
         );

         if (result.rows.length === 0) {
            return null;
         }

         const row = result.rows[0];

         return this.reconstruirFundas(row);
    }

    async findAll(): Promise<Fundas[]> {
        const result = await this.db.query(
            `
            SELECT *
            FROM Fundas
            `
        );

        return result.rows.map(
            row => this.reconstruirFundas(row)
        );
    }

    async deleteById(id: number): Promise<void> {
        await this.db.query(
            `
            DELETE FROM Fundas
            WHERE id = $1
            `,
            [id]
        );
    }

    async existsBytipo(tipo: string): Promise<boolean> {
        const result = await this.db.query(
            `
            SELECT EXISTs (
                SELECT 1
                FROM Fundas
                WHERE tipo = $1
            )
            `,
            [tipo]
        );

        return result.rows[0].exists;
    }
}