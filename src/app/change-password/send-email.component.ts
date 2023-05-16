import { EmailValuesDTO } from './../model/email-values-dto';
import { ToastrService } from 'ngx-toastr';
import { EmailPasswordService } from './../servicios/email-password.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  mailTo!: string;
  dto!: EmailValuesDTO;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  onSendEmail(): void {
    this.dto = new EmailValuesDTO(this.mailTo);
    this.emailPasswordService.sendEmail(this.dto).subscribe(
      data => {

          alert(data.mensaje + " OK");

      },
      err => {

        alert(err.error.mensaje + " FAIL");


      }
    );
  }

}