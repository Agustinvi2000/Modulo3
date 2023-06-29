import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RedesService } from 'src/app/servicios/redes.service';
// import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.css']
})
export class RedesComponent implements OnInit {
  form: FormGroup;
  // validateLinkedIn = false;
  // validateGithub = false;
  // isAdmin = false;
  persona_id: number = 1;
  id: number | undefined;
  icono!: string;
  url!: string;
  red: any;
  

  constructor(
    private formBuilder: FormBuilder,
    private sRedes: RedesService,
    // private tokenService: TokenService
  ) {
    ///Creamos el grupo de controles para el formulario de login

    this.form = this.formBuilder.group({
      icono: ['', Validators.required],
      url: ['', Validators.required]
      });
  }

  ngOnInit() {  
    // this.isAdmin = this.tokenService.isAdmin();
  }

  cargarRedes():void{
    this.sRedes.list().subscribe(data => {
      this.id = data[0].id;
      this.icono = data[0].icono;
      this.url = data[0].url;     

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
      id: this.id,
      icono:this.form.value.icono,
      url:this.form.value.url
    };

    console.log(this.red);

    this.sRedes.update(this.red).subscribe(
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
  















  // constructor(private formBuilder: FormBuilder, 
  //   private sRedes:RedesService,
  //   private tokenService: TokenService
  //   ){ 
     
  //   this.form= this.formBuilder.group({
  //     linkedinCheck: [false],
  //     linkedin: ['',[Validators.required, Validators.pattern(/^(ftp:\/\/|http(s)?:\/\/)?((www\.|ftp\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{3,}(\.[a-z]{2,})?|([a-z0-9]+[\-\.]{1})?([a-z0-9]+)\.[a-z]{3,}(\.[a-z]{2,})?(\/.*)?)$/i)]],
  //     githubCheck: [false],
  //     github: ['',[Validators.required, Validators.pattern(/^(ftp:\/\/|http(s)?:\/\/)?((www\.|ftp\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{3,}(\.[a-z]{2,})?|([a-z0-9]+[\-\.]{1})?([a-z0-9]+)\.[a-z]{3,}(\.[a-z]{2,})?(\/.*)?)$/i)]]
  //   }, {
  //     validator: this.customValidation
  //   });

  //   this.form.get('linkedinCheck')?.valueChanges.subscribe(value => {
  //     this.validateLinkedIn = value;
  //     if (!value) {
  //       this.form.get('linkedin')?.setValue('');
  //       this.form.get('linkedin')?.setErrors(null);
  //     }
  //   });


  //   this.form.get('githubCheck')?.valueChanges.subscribe(value => {
  //     this.validateGithub = value;
  //     if (!value) {
  //       this.form.get('github')?.setValue('');
  //       this.form.get('github')?.setErrors(null);
  //     }
  //   });

  // }


    // customValidation(group: FormGroup) {
  //   const linkedinCheck = group.get('linkedinCheck')?.value;
  //   const githubCheck = group.get('githubCheck')?.value;
  //   const linkedin = group.get('linkedin')?.value;
  //   const github = group.get('github')?.value;

  //   if ((linkedinCheck && !linkedin) || (githubCheck && !github)) {
  //     return {required: true};
  //   }

  //   return null;
  // }



  // get LinkedinCheck(){
  //  return this.form.get("linkedinCheck");
  // }

  // get Linkedin(){
  //  return this.form.get("linkedin");
  // }

  // get GithubCheck(){
  //   return this.form.get("githubCheck");
  // }

  // get Github(){
  //   return this.form.get("github");
  // }

