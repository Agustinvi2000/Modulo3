import { Component, OnInit } from '@angular/core';
// importamos las librerias de formulario que vamos a necesitar
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

// import { ToastrService } from 'ngx-toastr';
// import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  form: FormGroup;
  persona_idAdd: number = 1;
  logoAdd: string ='';
  // isAdmin = false;


  // Inyectar en el constructor el formBuilder
  constructor(
    private formBuilder: FormBuilder,
    private sExperiencia: ExperienciaService,
    // private tokenService: TokenService
  ) {
    ///Creamos el grupo de controles para el formulario de login

    this.form = this.formBuilder.group({
      empresaAdd: ['', Validators.required],
      logoAdd: [''],
      urlAdd: [''],
      puestoAdd: ['', Validators.required],
      tipo_empleoAdd: [''],
      ubicacionAdd: ['', Validators.required],
      tipo_ubicacionAdd: [''],
      inicioAdd: ['', [Validators.required, this.fechaInicioValidator]],
      finAdd: [
        '',
        [Validators.required, this.fechasValidator, this.fechaFinValidator],
      ],
      actualAdd: [false],
      descripcionAdd: [''],
    });

    this.form.controls['inicioAdd'].valueChanges.subscribe(() => {
      this.form.controls['finAdd'].updateValueAndValidity();
    });

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

  ngOnInit(): void {
    // this.isAdmin = this.tokenService.isAdmin();

  }

  get Cargo() {
    return this.form.get('puestoAdd');
  }

  get TipoEmpleo() {
    return this.form.get('tipo_empleoAdd');
  }

  get NombreEmpresa() {
    return this.form.get('empresaAdd');
  }

  get Ubicacion() {
    return this.form.get('ubicacionAdd');
  }

  get TipoUbicacion() {
    return this.form.get('tipo_ubicacionAdd');
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

  get CargoActual() {
    return this.form.get('actualAdd');
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
    const expe = new Experiencia(
      this.form.value.empresaAdd,
      this.form.value.logoAdd,
      this.form.value.urlAdd,
      this.form.value.puestoAdd,
      this.form.value.tipo_empleoAdd,
      this.form.value.ubicacionAdd,
      this.form.value.tipo_ubicacionAdd,
      this.form.value.inicioAdd,
      this.form.value.finAdd,
      this.form.value.actualAdd,
      this.form.value.descripcionAdd,
      this.persona_idAdd
    );
    this.sExperiencia.create(expe).subscribe(
      (data) => {
        window.location.reload();
        alert('Experiencia Añadida');
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
}
