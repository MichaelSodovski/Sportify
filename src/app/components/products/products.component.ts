import { Component, OnInit } from '@angular/core';
import { pl } from 'date-fns/locale';
import { productsModel } from 'src/app/Models/productsModel';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    public localProducts: productsModel[] = [];
    public original: productsModel[] = [];

    constructor(private productService: ProductsService) { }

    async ngOnInit() {
        this.original = await this.productService.GetAllProducts();
        this.localProducts = this.original;
    }

    public addProductToTotal() {
        
    }

    public onTextChange(event: any) {
        this.localProducts = this.original.filter(p => p.ProductName === event.target.value);
        if(event.target.value == "") {
            this.localProducts = this.original;
        }
    }
}



