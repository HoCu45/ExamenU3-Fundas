// DOMAIN

//DOMAIN - ENTIDAD RICA BLINDADA

export class Fundas {
    //1. CONSTRUCTOR PRIVADO: nadie desde fuera puede hacer 'new Fundas(...)'
private constructor(
    public readonly id: number| null,
    private _modelo: string,
    private _tipo: string
)   {}

// getters públicos de solo lectura

get modelo(): string { return this._modelo; }
get tipo(): string { return this._tipo; }

//2. Metodo de fábrica: para crear Fundass NUEVOS (Sin ID aún)

static crear(modelo: string, tipo: string): Fundas {
    // Validaciones estrictas en el nacimiento
    if (!tipo || !tipo.includes("@")) {
        throw new Error("El formato del tipo es invalido para el nuevo Fundas");
    }
    if (!modelo || modelo.trim().length < 2) {
        throw new Error("El modelo debe tener al menos 2 caracteres");
    }

    //Si todo está bien, la propia clase puede invocar a su constructor privado
    return new Fundas(null, modelo.trim(), tipo.trim());
}

//3. Metodo de fabrica: para reconstruir Fundass que ya existen en postgreSQL
static reconstruir(id: number, modelo: string, tipo: string): Fundas {
    //Aqui no validamos las reglas de creación porque el dato ya es confiable ( viene de la DB)
    return new Fundas(id, modelo, tipo);
}

//4. comportamiento: el único punto para modificar el estado
actualizar(modelo: string, tipo: string): void {
    if(!tipo || !tipo.includes("@")) {
        throw new Error("tipo invalido para actualización");
    }
    this._modelo = modelo.trim();
    this._tipo = tipo.trim();
}
}