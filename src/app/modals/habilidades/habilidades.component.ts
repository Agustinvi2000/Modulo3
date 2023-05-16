import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HabilidadService } from 'src/app/servicios/habilidad.service';
import { Habilidad } from 'src/app/model/habilidad';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css'],
})
export class HabilidadesComponent implements OnInit {
  form: FormGroup;
  persona_idAdd: number = 1;
  isAdmin = false;



  // Inyectar en el constructor el formBuilder
  constructor(
    private formBuilder: FormBuilder,
    private sHabilidad: HabilidadService,
    private tokenService: TokenService
  ) {
    ///Creamos el grupo de controles para el formulario de login

    this.form = this.formBuilder.group({
      nombreAdd: ['', Validators.required],
      porcentajeAdd: ['', Validators.required],
      colorAdd: [''],
    });
  }

  ngOnInit() {
    this.isAdmin = this.tokenService.isAdmin();
  }

  get Habilidad() {
    return this.form.get('nombreAdd');
  }

  get GradoAvance() {
    return this.form.get('porcentajeAdd');
  }

  onCreate(): void {
    const hab = new Habilidad(
      this.form.value.nombreAdd,
      this.form.value.porcentajeAdd,
      this.form.value.colorAdd,
      this.persona_idAdd
    );

    console.log(hab);

    this.sHabilidad.create(hab).subscribe(
      (data) => {
        console.log('Antes de reload');
        window.location.reload();
        console.log('Después de reload');

        alert('Habilidad Añadida');
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
