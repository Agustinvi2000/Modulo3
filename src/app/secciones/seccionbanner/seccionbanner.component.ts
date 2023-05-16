import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/model/persona';
import { DatosService } from 'src/app/servicios/datos.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TokenService } from 'src/app/servicios/token.service';
import { SeccionacercadeComponent } from '../../secciones/seccionacercade/seccionacercade.component';



@Component({
  selector: 'app-seccionbanner',
  templateUrl: './seccionbanner.component.html',
  styleUrls: ['./seccionbanner.component.css']
})
export class SeccionbannerComponent implements OnInit {
  @Input("mostrarEdicion") mostrarEdicion!:boolean;
  
  //esto es para traer distintos datos
  resumen: any;
  fotoPerfil: File | undefined; // variable que almacenará el archivo seleccionado
  fileBanner: File | undefined; // variable que almacenará el archivo seleccionado

  form: FormGroup;
  perso: any;
  persona_id: number = 1;
  
  personas: Persona[]=[]; //se llama al modelo que es un array
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
  
  constructor(private formBuilder: FormBuilder, 
    private sPersona:PersonaService,
    private tokenService: TokenService
    ) { 
      this.form= this.formBuilder.group({
        banner:['',Validators.required],
        foto:['',Validators.required], 
        nombre:['',Validators.required],
        apellido:['',Validators.required],
        nacimiento:['',Validators.required],
        titular:['',Validators.required],
        ubicacion:['',Validators.required],
        telefono:['',Validators.required]      
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

  ngOnInit(): void{
    this.cargarDatos();
    this.isAdmin = this.tokenService.isAdmin();
  }

  
  // Método que maneja la selección de archivo de imagen
  onFileSelected(event: any): void {
    this.fotoPerfil = event.target.files[0];
  }
  
  // Método que valida que la selección sea un archivo de imagen
  isValidImage(): boolean {
    if (!this.fotoPerfil) {
      return false;
    }
    const acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    return acceptedTypes.includes(this.fotoPerfil.type);
  }


  onUpload() {
    if (this.fotoPerfil) {
      this.sPersona.uploadImage(this.fotoPerfil).subscribe(
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


    // Método que maneja la selección de archivo de imagen
    onFileSelectedBanner(event: any): void {
      this.fileBanner = event.target.files[0];
    }
    
    // Método que valida que la selección sea un archivo de imagen
    isValidImageBanner(): boolean {
      if (!this.fileBanner) {
        return false;
      }
      const acceptedTypes = ['image/png', 'image/jpeg', 'image/gif'];
      return acceptedTypes.includes(this.fileBanner.type);
    }

    onUploadBanner() {
      if (this.fileBanner) {
        this.sPersona.uploadImage(this.fileBanner).subscribe(
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
  

    idEdit() {
      this.form.controls['nombre'].setValue(this.nombre);
      this.form.controls['apellido'].setValue(this.apellido);
      this.form.controls['titular'].setValue(this.titular);
      this.form.controls['nacimiento'].setValue(this.nacimiento);
      this.form.controls['ubicacion'].setValue(this.ubicacion);
      this.form.controls['telefono'].setValue(this.telefono);
      this.form.controls['foto'].setValue(this.foto);
      this.form.controls['banner'].setValue(this.banner);

    }
  
    onUpdate(): void {

      this.perso = {
        id: this.id,
        about: this.about,
        banner:this.form.value.banner,
        foto:this.form.value.foto, 
        nombre:this.form.value.nombre,
        apellido:this.form.value.apellido,
        nacimiento:this.form.value.nacimiento,
        titular:this.form.value.titular,
        ubicacion:this.form.value.ubicacion,
        telefono:this.form.value.telefono  
      };

      console.log(this.perso);
  
      this.sPersona.update(this.perso).subscribe(
        (data) => {
          window.location.reload();
          alert('Datos Modificados');
        },
        (err) => {}
      );
    }
  
    get Banner() {
      return this.form.get('banner');
    }

    get Foto() {
      return this.form.get('foto');
    }

    get Nombre() {
      return this.form.get('nombre');
    }

    get Apellido() {
      return this.form.get('apellido');
    }

    get Nacimiento() {
      return this.form.get('nacimiento');
    }

    get Titular() {
      return this.form.get('titular');
    }

    get Ubicacion() {
      return this.form.get('ubicacion');
    }

    get Telefono() {
      return this.form.get('telefono');
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
  
