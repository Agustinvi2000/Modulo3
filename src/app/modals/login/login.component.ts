import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { LoginUsuario } from 'src/app/model/login-usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {

  form: FormGroup;

  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;

  errMsj!: string;

  // Inyectar en el constructor el formBuilder
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router

    ){ 
    ///Creamos el grupo de controles para el formulario de login
     
    this.form= this.formBuilder.group({
    // password:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?])/),Validators.minLength(8)]],
      password:['',[Validators.required]],
      nombreUsuario:['',[Validators.required]],
    });
  }

  ngOnInit() {}

  get Password(){
   return this.form.get("password");
  }

   get NombreUsuario(){
    return this.form.get("nombreUsuario");
   }


  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
      this.authService.login(this.loginUsuario).subscribe(
        data => {

      //     console.log(data);

      //     this.router.navigate(['/dashboard']);
      // },
      // err => {
      //   this.errMsj = err.error.mensaje;

      //   alert(this.errMsj);

      // }
      // );

      // console.log(data);
 
      if (data.message == "Email not exits")
      {
    
        alert("El usuario no existe");
  

      }
      else if(data.message == "Login Success")
  
       {
        this.router.navigateByUrl('/dashboard');
      }
      else
      {
        alert("Usuario o Contraseña incorrectos");
      }
    });


    }



}
