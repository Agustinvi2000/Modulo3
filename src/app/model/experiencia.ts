//import { Persona } from './persona.entity';

export class Experiencia {

  id?: number;
  empresa: string;
  logo: string;
  url: string;
  puesto: string;
  tipo_empleo: string;
  ubicacion: string;
  tipo_ubicacion: string;
  inicio: string;
  fin: string;
  actual: boolean;
  descripcion: string;
  persona_id: number;

  constructor(
    empresa: string,
    logo: string,
    url: string,
    puesto: string,
    tipo_empleo: string,
    ubicacion: string,
    tipo_ubicacion: string,
    inicio: string,
    fin: string,
    actual: boolean,
    descripcion: string,
    persona_id: number
  ) {
    this.empresa = empresa;
    this.logo = logo;
    this.url = url;
    this.puesto = puesto;
    this.tipo_empleo = tipo_empleo;
    this.ubicacion = ubicacion;
    this.tipo_ubicacion = tipo_ubicacion;
    this.inicio = inicio;
    this.fin = fin;
    this.actual = actual;
    this.descripcion = descripcion;
    this.persona_id = persona_id;
  }

}
