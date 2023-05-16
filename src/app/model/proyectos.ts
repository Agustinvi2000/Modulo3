export class Proyectos {
    id?: number;
    titulo: string;
    url: string;
    descripcion: string;
    persona_id: number;

    constructor(
        titulo: string,
        url:string,
        descripcion: string,
        persona_id: number
        ){
        this.titulo = titulo;
        this.url = url;
        this.descripcion = descripcion;
        this.persona_id = persona_id;
    }
}
