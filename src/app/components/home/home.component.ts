import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { HistoryModel } from 'src/app/Models/HistoryModel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public selectedProducts: HistoryModel[] = [];
    public totalCalories: number;
    public totalProtein: number;
    public totalCarbohydrates: number;
    public totalFat: number;

    constructor(private productService: ProductsService, private MatNotificationService: MatSnackBar) { }

    async ngOnInit() {
        this.selectedProducts = await this.productService.GetItemsFromHistory();
        this.calculateTotalStats();
    }
    public ItemDelete(id: Date) {
        try {
            this.productService.DeleteItem(id);
            this.MatNotificationService.open("Item deleted successfully..");
            location.reload();
        }
        catch (err) {
            alert(err.message);
        }
    }
    public calculateTotalStats() {
        this.totalCalories = 0;
        this.totalProtein = 0;
        this.totalCarbohydrates = 0;
        this.totalFat = 0;
        for (const product of this.selectedProducts) {
            this.totalCalories += product.calories * (product.amount/100); 
            this.totalProtein += product.protein * (product.amount/100);
            this.totalCarbohydrates += product.carbohydrate  * (product.amount/100);
            this.totalFat += product.fat  * (product.amount/100);
        }
    }
}
