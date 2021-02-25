import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsModel } from 'src/app/Models/Credentials.Model';
import { userModel } from 'src/app/models/user.model';
import { actionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    public async register(user: userModel): Promise<Boolean> {
        const formData = new FormData();
        formData.append("firstName", user.firstName as string);
        formData.append("lastName", user.lastName as string);
        formData.append("identificationNumber", user.identificationNumber?.toString() as any);
        formData.append("userName", user.userName as string);
        formData.append("dateOfBirth", user.dateOfBirth as any);
        formData.append("gender", user.gender as string);
        formData.append("email", user.email as string);
        formData.append("passWord", user.passWord as any);
        formData.append("roleId", user.roleId?.toString() as any);
        formData.append("image", user.image as any, user.image?.name);
        try {
            const registeredUser = await this.http.post<userModel>(environment.authURL + "/register", formData).toPromise();
            store.dispatch({ type: actionType.Register, payLoad: registeredUser });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: actionType.GotError, payLoad: httpErrorResponse });
            return false;
        }
    }
    public async Login(credentials: CredentialsModel): Promise<Boolean> {
        try {
            const LoggedInUser = await this.http.post<userModel>(environment.authURL + "/login", credentials).toPromise();
            switch(LoggedInUser.roleId) {
                case 1: LoggedInUser.role = "Admin";
                break;
                case 2: LoggedInUser.role = "Agent";
                break;
                case 3: LoggedInUser.role = "user";
                break;
            }
            store.dispatch({ type: actionType.login, payLoad: LoggedInUser });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: actionType.GotError, payLoad: httpErrorResponse });
            return false;
        }
    }
    public LogOut(): void {
        store.dispatch({ type: actionType.LogOut });
    }
}
