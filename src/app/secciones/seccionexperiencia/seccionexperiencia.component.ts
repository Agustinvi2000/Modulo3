import { Component, Input, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { DatosService } from 'src/app/servicios/datos.service';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../servicios/token.service';


@Component({
  selector: 'app-seccionexperiencia',
  templateUrl: './seccionexperiencia.component.html',
  styleUrls: ['./seccionexperiencia.component.css']
})
export class SeccionexperienciaComponent implements OnInit {
  @Input("mostrarEdicion") mostrarEdicion!:boolean;

  form: FormGroup;
  expe: any;
  persona_id: number = 1;
  logo: string = '';
  
  experiencias: Experiencia[]=[]; 
  idEditar?: number;
  selectedFile: File | null;
  isTrue: boolean = false;

  isAdmin = false;


  constructor(private formBuilder: FormBuilder, 
    private sExperiencia:ExperienciaService,
    private tokenService: TokenService
    ){ 
this.form= this.formBuilder.group({
  empresa:['',Validators.required],
  logo:[''], 
  url:[''],
  puesto:['',Validators.required],
  tipo_empleo:[''],
  ubicacion:['',Validators.required],
  tipo_ubicacion:[''],
  inicio:['',[Validators.required
  , this.fechaInicioValidator
  ]],
  fin:['',[Validators.required
  , this.fechasValidator, this.fechaFinValidator
  ]],
  actual: [false],
  descripcion:[''],

});

this.form.controls['inicio'].valueChanges.subscribe(() => {
this.form.controls['fin'].updateValueAndValidity();
});

this.form.controls['actual'].valueChanges.subscribe((value) => {
if (value) {
this.form.controls['fin'].clearValidators();
this.form.controls['fin'].updateValueAndValidity();
this.form.controls['fin'].setValue('');

} else {
this.form.controls['fin'].setValidators([Validators.required, this.fechasValidator, this.fechaFinValidator]);
this.form.controls['fin'].updateValueAndValidity();
}
});

this.selectedFile = null;


}





  ngOnInit(): void{
    this.cargarExperiencia();
    this.isAdmin = this.tokenService.isAdmin();
   }

  cargarExperiencia():void{
    this.sExperiencia.list().subscribe(data => {
      this.experiencias=data
    });
  }

  getDiferenciaAnios(id:number){
    const fechaActual = new Date()
    const fechaFin = this.experiencias[id].fin ? new Date(this.experiencias[id].fin) : fechaActual;


    const fechaInicio = new Date(this.experiencias[id].inicio);

    const diferencia = fechaFin.getFullYear() + (fechaFin.getMonth() + 1)/12  - fechaInicio.getFullYear() + (fechaInicio.getMonth() + 1)/12
    

  return diferencia.toFixed(1);
  }

  idEdit(id:number){

    var datePipe = new DatePipe('en-US');
    var valorInicio = datePipe.transform(this.experiencias[id].inicio, 'yyyy-MM-dd');

    var datePipe = new DatePipe('en-US');
    var valorFin = datePipe.transform(this.experiencias[id].fin, 'yyyy-MM-dd');

    this.form.controls['puesto'].setValue(this.experiencias[id].puesto); // Agrega esta línea
    this.form.controls['tipo_empleo'].setValue(this.experiencias[id].tipo_empleo); // Agrega esta línea
    this.form.controls['empresa'].setValue(this.experiencias[id].empresa); // Agrega esta línea
    this.form.controls['url'].setValue(this.experiencias[id].url); // Agrega esta línea
    this.form.controls['ubicacion'].setValue(this.experiencias[id].ubicacion); // Agrega esta línea
    this.form.controls['tipo_ubicacion'].setValue(this.experiencias[id].tipo_ubicacion); // Agrega esta línea
    this.form.controls['inicio'].setValue(valorInicio);
    this.form.controls['fin'].setValue(valorFin);
    this.form.controls['actual'].setValue(this.experiencias[id].actual); // Agrega esta línea
    this.form.controls['descripcion'].setValue(this.experiencias[id].descripcion); // Agrega esta línea


    // Esto es para llevar a la funcion onUpdate que se encarga de editar
    this.idEditar = this.experiencias[id].id  
    this.persona_id = this.experiencias[id].persona_id

    this.form.controls['logo'].setValue(this.experiencias[id].logo); // Agrega esta línea

  }

  onUpdate(): void{
    
// const filePath = this.form.value.logo;

// const fileName = filePath.substring(filePath.lastIndexOf('\\') + 1);

// const url = URL.createObjectURL(new Blob([filePath], { type: 'application/octet-stream' }));

// const finalUrl = `http://localhost:4200/assets/img/images/${fileName}`;
// console.log(finalUrl);
 
const finalUrl = `http://localhost:4200/assets/img/images/microsoft.png`;


    this.expe = {
      id: this.idEditar,
      empresa: this.form.value.empresa,
      url: this.form.value.url,
      puesto: this.form.value.puesto,
      tipo_empleo: this.form.value.tipo_empleo,
      ubicacion: this.form.value.ubicacion,
      tipo_ubicacion: this.form.value.tipo_ubicacion,
      inicio: this.form.value.inicio,
      fin: this.form.value.fin,
      actual: this.form.value.actual,
      descripcion: this.form.value.descripcion,
      persona_id: this.persona_id,
      logo: finalUrl
    }

console.log(this.expe)

    this.sExperiencia.update(this.expe)
    .subscribe(data=>{

      window.location.reload();
      alert("Experiencia Modificada");
    },
      err => {

      }
    );
  }

  delete(id:number | undefined):void{
    if(id){
      this.sExperiencia.delete(id).subscribe(
        data => {

          alert("Experiencia Eliminada correctamente");
          this.cargarExperiencia();
        }, err => {
            alert("No se pudo eliminar la experiencia");
            }
      )
    }
  }

    get Cargo(){
    return this.form.get("puesto");
    }
 
    get TipoEmpleo(){
      return this.form.get("tipo_empleo");
    }
  
    get NombreEmpresa(){
     return this.form.get("empresa");
    }
 
    get Ubicacion(){
     return this.form.get("ubicacion");
    }
  
    get TipoUbicacion(){
     return this.form.get("tipo_ubicacion");
    }
  
    get FechaInicio(){
     return this.form.get("inicio");
    }
  
   get FechaFin(){
     return this.form.get("fin");
    }
 
    get Descripcion(){
     return this.form.get("descripcion");
    }
  
    get CargoActual(){
     return this.form.get("actual");
    }
    
 
   fechaInicioValidator(control: AbstractControl) {
     const fechaInicio = new Date(control.value);
     const fechaActual = new Date();
     return fechaInicio > fechaActual ? { fechaInicioInvalida: true } : null;
   }
 
   fechaFinValidator(control: AbstractControl) {
     const fechaFin = new Date(control.value);
     const fechaActual = new Date();
     return fechaFin > fechaActual ? { fechaFinInvalida: true } : null;
   }
 
   fechasValidator(control: AbstractControl) {
     const fechaInicio = new Date(control.parent?.get("inicio")?.value);
     const fechaFin = new Date(control.parent?.get("fin")?.value);
 
     if (fechaInicio && fechaFin){
       const FechaInicioDate = new Date(fechaInicio);
       const FechaFinDate = new Date(fechaFin);
 
       return FechaFinDate <= FechaInicioDate ? { fechasInvalidas: true } : null;
     }
 
     return null;
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



   onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
  onUpload() {
    if (this.selectedFile) {
      this.sExperiencia.uploadImage(this.selectedFile).subscribe(
        response => {
          // Manejar la respuesta del servidor
          console.log('Archivo subido con éxito', response);
        },
        error => {
          // Manejar el error
          console.error('Error al subir el archivo', error);
        }
      );
    } else {
      console.warn('No se ha seleccionado ningún archivo.');
    }
  }
  

  
   

}
