export class Habilidad {
    
  id?: number;
  nombre: string;
  porcentaje: string;
  color: string;
  persona_id: number;

  constructor(
    nombre: string,
    porcentaje: string,
    color: string,
    persona_id: number
  ) {
 
    this.nombre = nombre;
    this.porcentaje = porcentaje;
    this.color = color;
    this.persona_id = persona_id;
    }

}
