export class Educacion {
  id?: number;
  institucion: string;
  titulo: string;
  logo: string;
  inicio: string;
  fin: string;
  descripcion: string;
  persona_id: number;

  constructor(
    institucion: string,
    titulo: string,
    logo: string,
    inicio: string,
    fin: string,
    descripcion: string,
    persona_id: number
  ) {
    this.institucion = institucion;
    this.titulo = titulo;
    this.logo = logo;
    this.inicio = inicio;
    this.fin = fin;
    this.descripcion = descripcion;
    this.persona_id = persona_id;
  }
}
