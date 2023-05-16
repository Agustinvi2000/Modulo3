import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/model/persona';
import { DatosService } from 'src/app/servicios/datos.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TokenService } from 'src/app/servicios/token.service';
import { SeccionbannerComponent } from '../../secciones/seccionbanner/seccionbanner.component';


@Component({
  selector: 'app-seccionacercade',
  templateUrl: './seccionacercade.component.html',
  styleUrls: ['./seccionacercade.component.css'],
})
export class SeccionacercadeComponent implements OnInit {
  @Input('mostrarEdicion') mostrarEdicion!: boolean;



  perso: any;

  form: FormGroup;
  persona_id: number = 1;

  personas: Persona[] = []; //se llama al modelo que es un array
  idEditar?: number;
  isTrue: boolean = false;

  //roles: string[];
  // roles: string[] = [];
  isAdmin = false;

  id: number | undefined;
  about!: string;
  banner!: string;
  foto!: string;
  nombre!: string;
  apellido!: string;
  nacimiento!: string;
  titular!: string;
  ubicacion!: string;
  telefono!: string;

  constructor(
    private formBuilder: FormBuilder,
    private sPersona: PersonaService,
    private tokenService: TokenService,
    // private banner: SeccionbannerComponent
  ) {
    this.form = this.formBuilder.group({
      about: ['', Validators.required]
    });
  }


  cargarDatos(): void {
    this.sPersona.list().subscribe(data => {
      this.id = data[0].id;
      this.about = data[0].about;
      this.banner = data[0].banner;     
      this.foto = data[0].foto;     
      this.nombre = data[0].nombre;     
      this.apellido = data[0].apellido;     
      this.nacimiento = data[0].nacimiento;     
      this.titular = data[0].titular;     
      this.ubicacion = data[0].ubicacion;     
      this.telefono = data[0].telefono;     
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
    this.isAdmin = this.tokenService.isAdmin();

    // console.log(this.id + " - " +this.about+ " - " +this.banner+ " - " +this.foto+ " - " +this.nombre+ " - " +this.apellido+ " - " +this.nacimiento+ " - " +this.titular+ " - " +this.ubicacion+ " - " +this.telefono);
  }



  idEdit() {
    this.form.controls['about'].setValue(this.about);
  }

  onUpdate(): void {
    this.perso = {
      id: this.id,
      about: this.form.value.about,
      banner:this.banner,
      foto:this.foto, 
      nombre:this.nombre,
      apellido:this.apellido,
      nacimiento:this.nacimiento,
      titular:this.titular,
      ubicacion:this.ubicacion,
      telefono:this.telefono  
    };
    console.log(this.perso);

    this.sPersona.update(this.perso).subscribe(
      (data) => {
        window.location.reload();
        alert('Acerca de Modificado');
      },
      (err) => {}
    );
  }

  get Acercade() {
    return this.form.get('about');
  }

  limpiar(): void {
    this.form.reset();
  }

  onEnviar(event: Event) {
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault;
    if (this.form.valid) {
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      this.onUpdate();
      // alert("Todo salio bien ¡Enviar formuario!")
    } else {
      // alert("falló en la carga, intente nuevamente");
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template
      this.form.markAllAsTouched();
    }
  }
}
