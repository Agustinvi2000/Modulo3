import { Component, OnInit } from '@angular/core';
// importamos las librerias de formulario que vamos a necesitar
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/model/persona';
import { SeccionbannerComponent } from 'src/app/secciones/seccionbanner/seccionbanner.component';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {

  form: FormGroup;

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

  isAdmin = false;

  // Inyectar en el constructor el formBuilder
  constructor(private formBuilder: FormBuilder,
    private sPersona: PersonaService,
    private tokenService: TokenService,
    // private banner: SeccionbannerComponent
    ){ 
    ///Creamos el grupo de controles para el formulario de login
    this.form= this.formBuilder.group({
      about:['',Validators.required]
   })
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

  ngOnInit() {
    this.cargarDatos();
    this.isAdmin = this.tokenService.isAdmin();
  }

  get AcercadeDescripcion(){
   return this.form.get("about");
  }

  get AcercadeDescripcionValid() {
    return this.AcercadeDescripcion?.touched && !this.AcercadeDescripcion?.valid;
  }
 
   onCreate(): void{
    const perso = new Persona(
      this.form.value.about,
      this.banner,
      this.foto, 
      this.form.value.nombre,
      this.form.value.apellido,
      this.form.value.nacimiento,
      this.form.value.titular,
      this.form.value.ubicacion,
      this.form.value.telefono    
      );
    this.sPersona.create(perso)
    .subscribe(data=>{

    window.location.reload();
    alert("Acerca de Añadido");
    },
    err => { 

    }
  );
  }

  limpiar(): void{
    this.form.reset();
  }


  onEnviar(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      this.onCreate();
      alert("Todo salio bien ¡Enviar formuario!")
    }else{
      alert("falló en la carga, intente nuevamente");
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form.markAllAsTouched(); 
      
    }
 
  }


  
}

