import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyectos } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { TokenService } from 'src/app/servicios/token.service';



@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit{
  form: FormGroup;
  persona_idAdd: number = 1;
  isAdmin = false;

  // Inyectar en el constructor el formBuilder
  constructor(private formBuilder: FormBuilder, 
    private sProyectos:ProyectosService,
    private tokenService: TokenService
    ) { 
      this.form= this.formBuilder.group({
        tituloAdd:['',Validators.required],
        urlAdd:[''], 
        descripcionAdd:['',Validators.required],
      });

  }


  ngOnInit() {
    this.isAdmin = this.tokenService.isAdmin();
  }

  get NombreProyecto(){
   return this.form.get("tituloAdd");
  }

  get URLProyecto(){
    return this.form.get("urlAdd");
   }

   
  get ResumenProyecto(){
    return this.form.get("descripcionAdd");
   }



   onCreate(): void {
    const proye = new Proyectos(
      this.form.value.tituloAdd,
      this.form.value.urlAdd,
      this.form.value.descripcionAdd,
      this.persona_idAdd
    );

    console.log(proye);

    this.sProyectos.create(proye).subscribe(
      (data) => {
        window.location.reload();

        alert('Proyecto Añadido');
      },
      (err) => {}
    );
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
      this.onCreate();
      alert('Todo salio bien ¡Enviar formuario!');
    } else {
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template
      this.form.markAllAsTouched();
    }
  }
}
