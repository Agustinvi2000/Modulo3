import { ChangePasswordDTO } from './../model/change-password-dto';
import { EmailPasswordService } from './../servicios/email-password.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password!: string;
  confirmPassword!: string;
  tokenPassword!: string;

  dto!: ChangePasswordDTO;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onChangePassword(): void {
    if(this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    this.tokenPassword = this.activatedRoute.snapshot.params['tokenPassword'];
    this.dto = new ChangePasswordDTO(this.password, this.confirmPassword, this.tokenPassword);
    this.emailPasswordService.changePassword(this.dto).subscribe(
      data => {

        alert(data.mensaje + " OK");

        this.router.navigate(['/login']);
    },
    err => {

      alert(err.error.mensaje + " FAIL");

    }
    );
  }

}