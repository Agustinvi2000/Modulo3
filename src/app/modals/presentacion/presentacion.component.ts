import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/model/persona';
import { SeccionacercadeComponent } from 'src/app/secciones/seccionacercade/seccionacercade.component';
import { PersonaService } from 'src/app/servicios/persona.service';
// import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent implements OnInit {

  form: FormGroup;
  persona_id: number = 1;
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

  // isAdmin = false;


  // Inyectar en el constructor el formBuilder
  constructor(private formBuilder: FormBuilder,
    private sPersona:PersonaService,
    // private tokenService: TokenService,
    // private acercaDe:SeccionacercadeComponent
    ){ 
    ///Creamos el grupo de controles para el formulario de login
     
    this.form= this.formBuilder.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      titular:['',Validators.required],
      ubicacion:['',Validators.required],
      telefono:['',Validators.required],
      email:['',[Validators.required, Validators.email]]
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

  ngOnInit() {
    // this.isAdmin = this.tokenService.isAdmin();
  }

  get Nombre(){
   return this.form.get("nombre");
  }

  get Apellido(){
    return this.form.get("apellido");
   }
   
   get Titular(){
    return this.form.get("titular");
   }
 
  get Ubicacion(){
    return this.form.get("ubicacion");
   }
 
  get Telefono(){
    return this.form.get("telefono");
   }

  //  get Email(){
  //   return this.form.get("email");
  //  }




   onCreate(): void{
    const perso = new Persona(
      this.about,
      this.banner,
      this.foto, 
      this.form.value.nombre,
      this.form.value.apellido,
      this.form.value.nacimiento,
      this.form.value.titular,
      this.form.value.ubicacion,
      this.form.value.telefono    
      );
  //   const expe = new Persona(
  //     this.acercaDe.Acercade?.value,
  //     this.form.value.Banner,
  //     this.form.value.Foto, 
  //     this.form.value.nombre,
  //     this.form.value.apellido,
  //     this.form.value.nacimiento,
  //     this.form.value.titular,
  //     this.form.value.ubicacion,
  //     this.form.value.telefono    );
    this.sPersona.create(perso)
    .subscribe(data=>{

    window.location.reload();
    alert("Datos Añadidos");
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

