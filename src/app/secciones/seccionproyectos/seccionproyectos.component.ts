import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyectos } from 'src/app/model/proyectos';
import { DatosService } from 'src/app/servicios/datos.service';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
// import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-seccionproyectos',
  templateUrl: './seccionproyectos.component.html',
  styleUrls: ['./seccionproyectos.component.css']
})
export class SeccionproyectosComponent implements OnInit {
  @Input("mostrarEdicion") mostrarEdicion!:boolean;

  form: FormGroup;
  persona_id: number = 1;
  
  proyectos: Proyectos[]=[]; 
  idEditar?: number;
  isTrue: boolean = false;

  // isAdmin = false;
  proye: any;


  
  constructor(private formBuilder: FormBuilder, 
    private sProyectos:ProyectosService,
    // private tokenService: TokenService
    ) { 
      this.form= this.formBuilder.group({
        titulo:['',Validators.required],
        url:[''], 
        descripcion:[''],
      });
      }

      ngOnInit(): void{
        this.cargarProyectos();
        // this.isAdmin = this.tokenService.isAdmin();
       }
    
       cargarProyectos():void{
        this.sProyectos.list().subscribe(data => {
          this.proyectos=data
        });
      }
  

      idEdit(id:number){

        this.form.controls['titulo'].setValue(this.proyectos[id].titulo); 
        this.form.controls['url'].setValue(this.proyectos[id].url); 
        this.form.controls['descripcion'].setValue(this.proyectos[id].descripcion); 
    
        // Esto es para llevar a la funcion onUpdate que se encarga de editar
        this.idEditar = this.proyectos[id].id  
        this.persona_id = this.proyectos[id].persona_id
    
      }
    
      onUpdate(): void{
        this.proye = {
          id: this.idEditar,
          titulo: this.form.value.titulo,
          url: this.form.value.url,
          descripcion: this.form.value.descripcion,
          persona_id: this.persona_id
        }
    
    console.log(this.proye)
    
        this.sProyectos.update(this.proye)
        .subscribe(data=>{
    
          window.location.reload();
          alert("Proyecto Modificado");
        },
          err => {
    
          }
        );
      }
    
      delete(id:number | undefined):void{
        if(id){
          this.sProyectos.delete(id).subscribe(
            data => {
    
              alert("Proyecto Eliminado correctamente");
              this.cargarProyectos();
            }, err => {
                alert("No se pudo eliminar el proyecto");
                }
          )
        }
      }
    
      get NombreProyecto(){
        return this.form.get("titulo");
       }
     
       get URLProyecto(){
         return this.form.get("url");
        }
     
        
       get ResumenProyecto(){
         return this.form.get("descripcion");
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
    