import { Component, OnInit } from '@angular/core';
import { HistoryModel } from 'src/app/Models/HistoryModel';
import { productsModel } from 'src/app/Models/productsModel';
import { ProductsService } from 'src/app/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    public localProducts: productsModel[] = [];
    public original: productsModel[] = [];
    public amount: any;
    public productId: any;
    public name: any;
    public products: productsModel[] = [];
    public product: productsModel = new productsModel();
    public selectedProducts: productsModel[] = [];
    public item: HistoryModel = new HistoryModel();

    constructor(private productService: ProductsService, private MatNotificationService: MatSnackBar) { }

    async ngOnInit() {
        this.original = await this.productService.GetAllProducts();
        this.localProducts = this.original;
    }

    public addItemToHistory(productName: string, calories: number, protein: number, carbohydrate: number, fat: number) {
        var item: HistoryModel = {
            productId: this.productId,
            productName: productName,
            amount: this.amount,
            calories: calories,
            protein: protein,
            carbohydrate: carbohydrate,
            fat: fat
        }
        try {
            this.productService.AddItemToHistory(item);
            this.MatNotificationService.open("Item added successfully..");
        }
        catch (err) {
            alert(err.message);
        }
    }
    public AddProductToDb(product: productsModel) {
        try {
            this.productService.AddProductToDB(product);
            this.MatNotificationService.open("Item added successfully..");
            setTimeout(() => {
                location.reload()
            }, 500);
        }
        catch (err) {
            alert(err.message);
        }
    }
    public addProductToTotal(event: any) {
        this.amount = event.target.value;
    }
    public getProductID(Id: string, name: string) {
        this.productId = Id;
        this.name = name;
    }
    public convertToProductsArray(id: number) {
        for (let i = 0; i <= this.localProducts.length; i++) { // runs across the entire array of products, looks for the selected item
            this.localProducts[id].amount = this.amount; // adds input of amount just before pushing to selected array
            this.selectedProducts.push(this.localProducts[id]); // fills the empty array each time the user clicks add button
            break;
        }
        sessionStorage.setItem("selectedProducts", JSON.stringify(this.selectedProducts));
    }

    public onTextChange(event: any) {
        this.localProducts = this.original.filter(p => p.ProductName === event.target.value);
        if (event.target.value == "") {
            this.localProducts = this.original;
        }
    }

    public ItemDelete(id: number) {
        try {
            this.productService.DeleteItemByIntegerId(id);
            this.MatNotificationService.open("Item deleted successfully..");
            location.reload();
        }
        catch (err) {
            alert(err.message);
        }
    }
}



