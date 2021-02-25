import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/userService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public user = new userModel();
    public preview?: string;
    public files: any = null as any;
    public defaultUserRole: number = 3;
    
    constructor(private userService: UserService,
        private MatNotificationService: MatSnackBar,
        private myAuthService: AuthService,
        private Router: Router) { }

    ngOnInit(): void {
    }

    public DisplayPreview(e: Event): void {
        const target = e.target as HTMLInputElement;
        this.files = target.files?.[0];
        this.user.image = this.files;
        const fileReader = new FileReader();
        fileReader.onload = args => this.preview = args.target?.result?.toString();
        fileReader.readAsDataURL(this.files);
    }
    public async Register() {
        this.user.roleId = this.defaultUserRole;
        const success = await this.myAuthService.register(this.user);
        if (success) {
            this.MatNotificationService.open("registered successfully");
            setTimeout(() => {
                this.Router.navigateByUrl("/login");
            }, 1500);
        }
        else if (!success) this.MatNotificationService.open("something went wrong");
    }
    public async AddUser() {
        this.user.roleId = this.defaultUserRole;
        try {
            await this.userService.AddUser(this.user);
            this.MatNotificationService.open("user added");
            setTimeout(() => {
                location.reload()
            }, 1500);
        }
        catch (err) {
            alert(err.message);
        }
    }
}
