import { Component, Input, OnInit } from '@angular/core';
import { DatosService } from 'src/app/servicios/datos.service';

import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-seccioneducacion',
  templateUrl: './seccioneducacion.component.html',
  styleUrls: ['./seccioneducacion.component.css'],
})
export class SeccioneducacionComponent implements OnInit {
  @Input('mostrarEdicion') mostrarEdicion!: boolean;

  form: FormGroup;
  estu: any;
  persona_id: number = 1;
  logo: string = '';


  estudios: Educacion[] = []; //se llama al modelo que es un array
  idEditar?: number;
  selectedFile: File | null;
  isTrue: boolean = false;

  //roles: string[];
  isAdmin = false;

  constructor(
    private formBuilder: FormBuilder,
    private sEducacion: EducacionService,
    private tokenService: TokenService
  ) {
    this.form = this.formBuilder.group({
      institucion: ['', Validators.required],
      titulo: ['', Validators.required],
      logo: [''],
      inicio: ['', [Validators.required, this.fechaInicioValidator]],
      fin: [
        '',
        [Validators.required, this.fechasValidator, this.fechaFinValidator],
      ],
      descripcion: ['']
    });

    // this.form.controls['inicio'].valueChanges.subscribe(() => {
    //   this.form.controls['fin'].updateValueAndValidity();
    // });

    // this.form.controls['actual'].valueChanges.subscribe((value) => {
    //   if (value) {
    //     this.form.controls['fin'].clearValidators();
    //     this.form.controls['fin'].updateValueAndValidity();
    //     this.form.controls['fin'].setValue('');
    //   } else {
    //     this.form.controls['fin'].setValidators([
    //       Validators.required,
    //       this.fechasValidator,
    //       this.fechaFinValidator,
    //     ]);
    //     this.form.controls['fin'].updateValueAndValidity();
    //   }
    // });

    if (this.form.controls['inicio']) {
      this.form.controls['inicio'].valueChanges.subscribe(() => {
        this.form.controls['fin'].updateValueAndValidity();
      });
    }

    if (this.form.controls['actual']) {
      this.form.controls['actual'].valueChanges.subscribe((value) => {
        if (value) {
          this.form.controls['fin'].clearValidators();
          this.form.controls['fin'].updateValueAndValidity();
          this.form.controls['fin'].setValue('');
        } else {
          this.form.controls['fin'].setValidators([
            Validators.required,
            this.fechasValidator,
            this.fechaFinValidator,
          ]);
          this.form.controls['fin'].updateValueAndValidity();
        }
      });
    }


    this.selectedFile = null;
  }

  ngOnInit(): void {
    this.cargarEducacion();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cargarEducacion(): void {
    this.sEducacion.list().subscribe((data) => {
      this.estudios = data;
    });


  }

  getDiferenciaAnios(id: number) {
    const fechaActual = new Date();
    const fechaFin = this.estudios[id].fin
      ? new Date(this.estudios[id].fin)
      : fechaActual;

    const fechaInicio = new Date(this.estudios[id].inicio);

    const diferencia =
      fechaFin.getFullYear() +
      (fechaFin.getMonth() + 1) / 12 -
      fechaInicio.getFullYear() +
      (fechaInicio.getMonth() + 1) / 12;

    return diferencia.toFixed(1);
  }

  idEdit(id: number) {
    var datePipe = new DatePipe('en-US');
    var valorInicio = datePipe.transform(
      this.estudios[id].inicio,
      'yyyy-MM-dd'
    );

    var datePipe = new DatePipe('en-US');
    var valorFin = datePipe.transform(this.estudios[id].fin, 'yyyy-MM-dd');

    this.form.controls['titulo'].setValue(this.estudios[id].titulo); // Agrega esta línea
    this.form.controls['institucion'].setValue(this.estudios[id].institucion); // Agrega esta línea
    this.form.controls['inicio'].setValue(valorInicio);
    this.form.controls['fin'].setValue(valorFin);
    this.form.controls['descripcion'].setValue(
      this.estudios[id].descripcion
    ); // Agrega esta línea

    // Esto es para llevar a la funcion onUpdate que se encarga de editar
    this.idEditar = this.estudios[id].id;
    this.persona_id = this.estudios[id].persona_id;

    this.form.controls['logo'].setValue(this.estudios[id].logo); // Agrega esta línea
  }

  onUpdate(): void {
    this.estu = {
      id: this.idEditar,
      institucion: this.form.value.institucion,
      titulo: this.form.value.titulo,
      inicio: this.form.value.inicio,
      fin: this.form.value.fin,
      descripcion: this.form.value.descripcion,
      persona_id: this.persona_id,
      logo: this.logo,
    };

    console.log(this.estu);

    this.sEducacion.update(this.estu).subscribe(
      (data) => {
        window.location.reload();
        alert('Estudio Modificado');
      },
      (err) => {}
    );
  }

  delete(id: number | undefined): void {
    if (id) {
      this.sEducacion.delete(id).subscribe(
        (data) => {
          alert('Estudio Eliminado correctamente');
          this.cargarEducacion();
        },
        (err) => {
          alert('No se pudo eliminar el Estudio');
        }
      );
    }
  }

  get Institucion() {
    return this.form.get('institucion');
  }

  get Titulo() {
    return this.form.get('titulo');
  }

  get FechaInicio() {
    return this.form.get('inicio');
  }

  get FechaFin() {
    return this.form.get('fin');
  }

  get Descripcion() {
    return this.form.get('descripcion');
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
    const fechaInicio = new Date(control.parent?.get('inicio')?.value);
    const fechaFin = new Date(control.parent?.get('fin')?.value);

    if (fechaInicio && fechaFin) {
      const FechaInicioDate = new Date(fechaInicio);
      const FechaFinDate = new Date(fechaFin);

      return FechaFinDate <= FechaInicioDate ? { fechasInvalidas: true } : null;
    }

    return null;
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
