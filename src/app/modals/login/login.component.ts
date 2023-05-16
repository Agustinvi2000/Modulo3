import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {

  form: FormGroup;

  // Inyectar en el constructor el formBuilder
  constructor(private formBuilder: FormBuilder){ 
    ///Creamos el grupo de controles para el formulario de login
     
    this.form= this.formBuilder.group({
      password:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?])/),Validators.minLength(8)]],
      email:['',[Validators.required, Validators.email]]
   });
  }

  ngOnInit() {}

  get Password(){
   return this.form.get("password");
  }

   get Email(){
    return this.form.get("email");
   }

  //  get InstitucionValid() {
  //   return this.Institucion?.touched && !this.Institucion?.valid;
  // }
  
  //  get TituloValid() {
  //    return this.Titulo?.touched && !this.Titulo?.valid;
  //  }

  //  get DisciplinaValid() {
  //   return this.Disciplina?.touched && !this.Disciplina?.valid;
  // }


  onEnviar(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      alert("Todo salio bien ¡Enviar formuario!")
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      this.form.markAllAsTouched(); 
    }
 
  }

}
