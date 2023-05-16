import { Component, OnInit } from '@angular/core';
import { TokenService } from '../servicios/token.service';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { NuevoUsuario } from '../model/nuevo-usuario';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nuevoUsuario!: NuevoUsuario;
  nombre!: string;
  nombreUsuario!: string;
  email!: string;
  password!: string;
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        alert(data.mensaje + " OK");

        this.router.navigate(['/login']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        alert(this.errMsj);

      }
    );
  }

}
