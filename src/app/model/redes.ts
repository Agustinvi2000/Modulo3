export class Redes {
    id?: number;
    icono: string;
    url: string;
    persona_id: number;

    constructor(
        icono: string,
        url:string,
        persona_id: number
        ){
        this.icono = icono;
        this.url = url;
        this.persona_id = persona_id;
    }
}
