import { Component, OnInit } from '@angular/core';
// import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // isLogged = false;
  // isAdmin =false;

  constructor(
    // private tokenService: TokenService
    ) { }

  ngOnInit() {
    // this.isLogged = this.tokenService.isLogged();
    // this.isAdmin = this.tokenService.isAdmin();
  }

  onLogOut(): void {
    // this.tokenService.logOut();
//    window.location.reload();
  }

}