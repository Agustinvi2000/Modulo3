import { Component, OnInit } from '@angular/core';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLogged = false;
  isAdmin = false;

  constructor(
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
  this.isLogged = this.tokenService.isLogged();
  this.isAdmin = this.tokenService.isAdmin();
  }
}
