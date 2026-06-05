//ADAPTER IN - CONTROLLER

import { FundasService } from "../../../../aplicacion/services/FundasService";
import { FundasDTO } from "../../../../aplicacion/dto/FundasDTO";
import { CreateFundasRequest } from "../../../../aplicacion/dto/CreateFundasRequest";
import type { ActualizarFundasRequest } from "../../../../aplicacion/dto/ActualizarFundasRequest";
export class FundasController {

    constructor (
        private FundasService: FundasService
    ){}

    crearFundas = async ( dtoUser:CreateFundasRequest) => {

        try {

            const Fundas = await this.FundasService.crearFundas(dtoUser);

            return (Fundas);
        } catch (error: any) {

            return {
                error: error.message
            };
        }
    };

    obtenerFundas = async (id:number) => {

        const Fundas = await this.FundasService.obtenerFundas(id);

        if (!Fundas) {
            return null;
        }

        return Fundas;
    };

    listarFundass = async () => {
        const Fundass = await this.FundasService.listarFundass();

        return Fundass;
    };

    actualizarFundas = async ( dtoActualizarFundas: ActualizarFundasRequest) => {

        try {

            const Fundas = await this.FundasService.actualizarFundas(dtoActualizarFundas.id,dtoActualizarFundas);

            return Fundas;
        } catch (error: any) {
            return error
        }
    };

    eliminarFundas = async (
        id: number
    ) => {
        try{
            await this.FundasService.eliminarFundas(id);
        }catch (error: any) {
            return error
        }
    };
}