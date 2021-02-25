import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { userModel } from 'src/app/models/user.model';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private myHttpClient: HttpClient) { }

    public GetAllUsers(): Promise<userModel[]> {
        const observable = this.myHttpClient.get<userModel[]>(environment.usersURL + "/");
        return observable.toPromise();
    }
    public GetSingleUser(id: number): Promise<userModel> {
        const observable = this.myHttpClient.get<userModel>(environment.usersURL + "/" + id);
        return observable.toPromise();
    }
    public GetSingleUserByIdentificationNumber(identificationNumber: number): Promise<userModel> {
        const observable = this.myHttpClient.get<userModel>(environment.usersURL + "/GetSingleUserByIdentificationNumber" + "/" + identificationNumber);
        return observable.toPromise();
    }
    public AddUser(user: userModel): Promise<userModel> {
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
        const observable = this.myHttpClient.post<userModel>(environment.usersURL + "/UserAdd", formData);
        return observable.toPromise();
    }
    public UpdateFullUser(user: userModel): Promise<userModel> {
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
        const observable = this.myHttpClient.put<userModel>(environment.usersURL + "/UpdateFullUser" + "/" + user.userId, formData);
        return observable.toPromise();
    }
    public UpdatePartialUser(user: userModel): Promise<userModel> {
        const formData = new FormData();
        if (!user.image) {
            formData.append("firstName", user.firstName as string);
            formData.append("lastName", user.lastName as string);
            formData.append("identificationNumber", user.identificationNumber?.toString() as any);
            formData.append("userName", user.userName as string);
            formData.append("dateOfBirth", user.dateOfBirth as any);
            formData.append("gender", user.gender as string);
            formData.append("email", user.email as string);
            formData.append("passWord", user.passWord as any);
            formData.append("roleId", user.roleId?.toString() as any);
            formData.append("imageFileName", user.imageFileName as string);
        }
        else {
            formData.append("firstName", user.firstName as string);
            formData.append("lastName", user.lastName as string);
            formData.append("identificationNumber", user.identificationNumber?.toString() as any);
            formData.append("userName", user.userName as string);
            formData.append("dateOfBirth", user.dateOfBirth as any);
            formData.append("gender", user.gender as string);
            formData.append("email", user.email as string);
            formData.append("passWord", user.passWord as any);
            formData.append("roleId", user.roleId?.toString() as any);
            formData.append("imageFileName", user.imageFileName as string);
            formData.append("image", user.image as any, user.image?.name);
        }
        const observable = this.myHttpClient.patch<userModel>(environment.usersURL + "/UpdatePartialUser" + "/" + user.userId, formData);
        return observable.toPromise();
    }
    public DeleteUser(id: number): Promise<undefined> {
        const observable = this.myHttpClient.delete<undefined>(environment.usersURL + "/" + id);
        return observable.toPromise();
    }
}