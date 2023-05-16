import { Component, Input, OnInit } from '@angular/core';
import { DatosService } from 'src/app/servicios/datos.service';
import { TokenService } from '../servicios/token.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RedesService } from '../servicios/redes.service';
import { Redes } from '../model/redes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // mostrarEdicion = true;
  @Input('mostrarEdicion') mostrarEdicion!: boolean;

  //esto es para traer distintos datos
  red: any;

  redes: Redes[]=[]; 

  isLogged = false;
  isAdmin = false;

  persona_id: number = 1;
  id: number | undefined;
  icono!: string;
  url!: string;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sRedes: RedesService,
    private tokenService: TokenService
  ) {
    this.form = this.formBuilder.group({
      icono: ['', Validators.required],
      url: ['', Validators.required]
      });
  }

  ngOnInit(): void {
    // this.datos.getDatos().subscribe((data) => {
    //   this.redes = data.networks;
    // });
    this.cargarRedes();
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();
    this.isLogin()
  }

  public isLogin(): boolean{
    let currentPath = window.location.pathname;
    if(currentPath === '/login' || currentPath === '/registro' || currentPath === '/sendemail') {
      return true;
    }
    return false;
  }

  onLogOut(): void {
    this.tokenService.logOut();
  }


  cargarRedes():void{
    this.sRedes.list().subscribe(data => {
      // this.id = data[0].id;
      // this.icono = data[0].icono;
      // this.url = data[0].url;     
        this.redes=data
      });
    
  }

  get Icono() {
    return this.form.get('icono');
  }

  get Url() {
    return this.form.get('url');
  }

  idEdit() {
    this.form.controls['url'].setValue(this.url);
    this.form.controls['icono'].setValue(this.icono);
    

  }

  onUpdate(): void {

    this.red = {
      // id: this.id,
      icono:this.form.value.icono,
      url:this.form.value.url,
      persona_id: this.persona_id

    };

    console.log(this.red);

    this.sRedes.create(this.red).subscribe(

    // this.sRedes.update(this.red).subscribe(
      (data) => {
        window.location.reload();
        alert('Datos Modificados');
      },
      (err) => {}
    );
  }

  limpiar(): void{
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
