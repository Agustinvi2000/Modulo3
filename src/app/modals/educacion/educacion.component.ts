import { Component, OnInit } from '@angular/core';
// importamos las librerias de formulario que vamos a necesitar
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';

// importamos las librerias de formulario que vamos a necesitar
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
// import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  form: FormGroup;
  persona_idAdd: number = 1;
  selectedFile: File | null;
  // isAdmin = false;


  // Inyectar en el constructor el formBuilder
  constructor(
    private formBuilder: FormBuilder,
    private sEducacion: EducacionService,
    // private tokenService: TokenService
  ) {
    ///Creamos el grupo de controles para el formulario de login

    this.form = this.formBuilder.group({
      institucionAdd: ['', Validators.required],
      tituloAdd: ['', Validators.required],
      logoAdd: [''],
      inicioAdd: ['', [Validators.required, this.fechaInicioValidator]],
      finAdd: [
        '',
        [Validators.required, this.fechasValidator, this.fechaFinValidator],
      ],
      descripcionAdd: [''],
    });

    // this.form.controls['inicioAdd'].valueChanges.subscribe(() => {
    //   this.form.controls['finAdd'].updateValueAndValidity();
    // });

    // this.form.controls['actualAdd'].valueChanges.subscribe((value) => {
    //   if (value) {
    //     this.form.controls['finAdd'].clearValidators();
    //     this.form.controls['finAdd'].updateValueAndValidity();
    //     this.form.controls['finAdd'].setValue('');
    //   } else {
    //     this.form.controls['finAdd'].setValidators([
    //       Validators.required,
    //       this.fechasValidator,
    //       this.fechaFinValidator,
    //     ]);
    //     this.form.controls['finAdd'].updateValueAndValidity();
    //   }
    // });

    if (this.form.controls['inicioAdd']) {
      this.form.controls['inicioAdd'].valueChanges.subscribe(() => {
        this.form.controls['finAdd'].updateValueAndValidity();
      });
    }

    if (this.form.controls['actualAdd']) {
      this.form.controls['actualAdd'].valueChanges.subscribe((value) => {
        if (value) {
          this.form.controls['finAdd'].clearValidators();
          this.form.controls['finAdd'].updateValueAndValidity();
          this.form.controls['finAdd'].setValue('');
        } else {
          this.form.controls['finAdd'].setValidators([
            Validators.required,
            this.fechasValidator,
            this.fechaFinValidator,
          ]);
          this.form.controls['finAdd'].updateValueAndValidity();
        }
      });
    }


    this.selectedFile = null;
  }

  ngOnInit() {
    // this.isAdmin = this.tokenService.isAdmin();
  }

  get Institucion() {
    return this.form.get('institucionAdd');
  }

  get Titulo() {
    return this.form.get('tituloAdd');
  }

  get FechaInicio() {
    return this.form.get('inicioAdd');
  }

  get FechaFin() {
    return this.form.get('finAdd');
  }

  get Descripcion() {
    return this.form.get('descripcionAdd');
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
    const fechaInicio = new Date(control.parent?.get('inicioAdd')?.value);
    const fechaFin = new Date(control.parent?.get('finAdd')?.value);

    if (fechaInicio && fechaFin) {
      const FechaInicioDate = new Date(fechaInicio);
      const FechaFinDate = new Date(fechaFin);

      return FechaFinDate <= FechaInicioDate ? { fechasInvalidas: true } : null;
    }

    return null;
  }

  onCreate(): void {
    const edu = new Educacion(
      this.form.value.institucionAdd,
      this.form.value.tituloAdd,
      this.form.value.logoAdd,
      this.form.value.inicioAdd,
      this.form.value.finAdd,
      this.form.value.descripcionAdd,
      this.persona_idAdd
    );
    this.sEducacion.create(edu).subscribe(
      (data) => {
        window.location.reload();
        alert('Estudio Añadido');
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
      alert('falló en la carga, intente nuevamente');
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template
      this.form.markAllAsTouched();
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.sEducacion.uploadImage(this.selectedFile).subscribe(
        (response) => {
          // Manejar la respuesta del servidor
          console.log('Archivo subido con éxito', response);
        },
        (error) => {
          // Manejar el error
          console.error('Error al subir el archivo', error);
        }
      );
    } else {
      console.warn('No se ha seleccionado ningún archivo.');
    }
  }
}
