import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "main", component: MainComponent },
    { path: "home", component: HomeComponent },
    { path: "products", component: ProductsComponent },
    { path: "calendar", component: CalendarComponent },
    { path: "register", component: RegisterComponent },
    { path: "sighIn", component: SignInComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
