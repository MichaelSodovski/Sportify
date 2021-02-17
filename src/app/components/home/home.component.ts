import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private http: HttpClient, private productService: ProductsService) { }

    async ngOnInit() {

    }
}
