import { Component, Input, OnInit } from '@angular/core';
import { DatosService } from 'src/app/servicios/datos.service';

import { Habilidad } from 'src/app/model/habilidad';
import { HabilidadService } from 'src/app/servicios/habilidad.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-seccionhabilidades',
  templateUrl: './seccionhabilidades.component.html',
  styleUrls: ['./seccionhabilidades.component.css']
})
export class SeccionhabilidadesComponent implements OnInit {
  @Input("mostrarEdicion") mostrarEdicion!:boolean;

  form: FormGroup;
  hab: any;
  persona_id: number = 1;

  habilidades: Habilidad[]=[]; 
  idEditar?: number;
  isTrue: boolean = false;

  // isAdmin = false;



  constructor(private formBuilder: FormBuilder, 
    private sHabilidad:HabilidadService,
    // private tokenService: TokenService
    ){ 
      this.form= this.formBuilder.group({
        nombre:['',Validators.required],
        porcentaje:['',Validators.required],
             
      });
    }

  ngOnInit(): void{
    // this.datos.getDatos().subscribe(data => {
    //   this.habilidades = data.skills;
    // });
    this.cargarHabilidad();
    // this.isAdmin = this.tokenService.isAdmin();

  }

    cargarHabilidad():void{
    this.sHabilidad.list().subscribe(data => {
      this.habilidades=data
    });
  }

  idEdit(id:number){

    this.form.controls['nombre'].setValue(this.habilidades[id].nombre); // Agrega esta línea
    this.form.controls['porcentaje'].setValue(this.habilidades[id].porcentaje); // Agrega esta línea
    

    // Esto es para llevar a la funcion onUpdate que se encarga de editar
    this.idEditar = this.habilidades[id].id  
    this.persona_id = this.habilidades[id].persona_id

  }

  onUpdate(): void{
    this.hab = {
      id: this.idEditar,
      nombre: this.form.value.nombre,
      porcentaje: this.form.value.porcentaje,
      persona_id: this.persona_id,
    }

console.log(this.hab)

    this.sHabilidad.update(this.hab)
    .subscribe(data=>{

      window.location.reload();
      alert("Habilidad Modificada");
    },
      err => {

      }
    );
  }

  delete(id:number | undefined):void{
    if(id){
      this.sHabilidad.delete(id).subscribe(
        data => {

          alert("Habilidad Eliminada correctamente");
          this.cargarHabilidad();
        }, err => {
            alert("No se pudo eliminar la habilidad");
            }
      )
    }
  }

    get Habilidad(){
    return this.form.get("nombre");
    }
 
    get GradoAvance(){
      return this.form.get("porcentaje");
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
        this.onUpdate();
       // alert("Todo salio bien ¡Enviar formuario!")
      }else{
       // alert("falló en la carga, intente nuevamente");
        // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
        this.form.markAllAsTouched(); 
      }
    }
 
}
