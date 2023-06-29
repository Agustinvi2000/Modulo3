import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
// import { interceptorProvider } from './interceptors/prod-interceptor.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { MainComponent } from './main/main.component';
import { RedesComponent } from './modals/redes/redes.component';
import { PresentacionComponent } from './modals/presentacion/presentacion.component';
import { AcercadeComponent } from './modals/acercade/acercade.component';
import { ExperienciaComponent } from './modals/experiencia/experiencia.component';
import { EducacionComponent } from './modals/educacion/educacion.component';
import { HabilidadesComponent } from './modals/habilidades/habilidades.component';
import { ProyectosComponent } from './modals/proyectos/proyectos.component';
import { SeccionbannerComponent } from './secciones/seccionbanner/seccionbanner.component';
import { SeccionacercadeComponent } from './secciones/seccionacercade/seccionacercade.component';
import { SeccionexperienciaComponent } from './secciones/seccionexperiencia/seccionexperiencia.component';
import { SeccioneducacionComponent } from './secciones/seccioneducacion/seccioneducacion.component';
import { SeccionhabilidadesComponent } from './secciones/seccionhabilidades/seccionhabilidades.component';
import { SeccionproyectosComponent } from './secciones/seccionproyectos/seccionproyectos.component';

// external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './modals/login/login.component';
// import { LoginComponent } from './auth/login.component';
// import { RegistroComponent } from './auth/registro.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
// import { SendEmailComponent } from './change-password/send-email.component';
// import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ErrorComponent,
    MainComponent,
    RedesComponent,
    PresentacionComponent,
    AcercadeComponent,
    ExperienciaComponent,
    EducacionComponent,
    HabilidadesComponent,
    ProyectosComponent,
    SeccionbannerComponent,
    SeccionacercadeComponent,
    SeccionexperienciaComponent,
    SeccioneducacionComponent,
    SeccionhabilidadesComponent,
    SeccionproyectosComponent,
    LoginComponent,
    // RegistroComponent,
    MenuComponent,
    IndexComponent,
    // SendEmailComponent,
    // ChangePasswordComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  // providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
