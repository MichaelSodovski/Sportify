import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/Models/Credentials.Model';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    public credentials = new CredentialsModel();

    constructor(private MyAuthService: AuthService, private router: Router, private MatNotificationService: MatSnackBar) { }

    ngOnInit(): void {
    }

    public async Login() {
        const success = await this.MyAuthService.Login(this.credentials);
        if (success) {
            this.MatNotificationService.open("Successfully logged in");
            setTimeout(() => {
                this.router.navigateByUrl("/home");
            }, 1000);
        }
        else this.MatNotificationService.open("Something went Wrong");
    }

}
