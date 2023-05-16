export class Persona {
    id?: number;
    banner: string;
    foto: string;
    nombre: string;
    apellido: string;
    nacimiento: string;
    titular: string;
    ubicacion: string;
    telefono: string;
    about: string;
  
    constructor(
      banner: string,
      foto: string,
      nombre: string,
      apellido: string,
      nacimiento: string,
      titular: string,
      ubicacion: string,
      telefono: string,
      about: string,
    ) {
        this.banner = banner;
        this.foto = foto;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nacimiento = nacimiento;
        this.titular = titular;
        this.ubicacion = ubicacion;
        this.telefono = telefono;
        this.about = about;
    }
  
}
