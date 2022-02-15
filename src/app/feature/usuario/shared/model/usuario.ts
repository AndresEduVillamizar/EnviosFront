export class Usuario {
    nombre: string;
    clave: string;
    premium: boolean;

    constructor(nombre: string, clave: string, premium: boolean) {
        this.nombre = nombre;
        this.clave = clave;
        this.premium = premium;
    }
}
