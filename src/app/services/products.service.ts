import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { store } from 'src/app/redux/store';
import { actionType } from 'src/app/redux/action-type';
import { productsModel } from '../Models/productsModel';
import { HistoryModel } from '../Models/HistoryModel';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    public products: productsModel[] = [];
    public items: HistoryModel[] = [];

    constructor(private http: HttpClient) { }

    public async GetAllProducts(): Promise<productsModel[]> {
        try {
            this.products = await this.http.get<productsModel[]>("https://localhost:44394/api/Products/GetAllProducts").toPromise();
            store.dispatch({ type: actionType.GetAllProducts, payLoad: this.products });
            return this.products;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: actionType.GotError, payLoad: httpErrorResponse });
        }
    }

    public async GetItemsFromHistory(): Promise<HistoryModel[]> {
        try {
            this.items = await this.http.get<HistoryModel[]>("https://localhost:44394/api/History/GetItemsFromHistory").toPromise();
            store.dispatch({ type: actionType.GetAllProducts, payLoad: this.items });
            return this.items;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: actionType.GotError, payLoad: httpErrorResponse });
        }
    }

    public async AddItemToHistory(item: HistoryModel) {
        try {
            await this.http.post<HistoryModel>("https://localhost:44394/api/History/AddItemToHistory", item).toPromise();
            store.dispatch({ type: actionType.AddItemToHistory, payLoad: item });
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: actionType.GotError, payLoad: httpErrorResponse });
        }
    }

    public async AddProductToDB(product: productsModel) {
        try {
            await this.http.post<productsModel>("https://localhost:44394/api/Products/AddProductToDB", product).toPromise();
            store.dispatch({ type: actionType.AddItemToDB, payLoad: product });
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: actionType.GotError, payLoad: httpErrorResponse });
        }
    }

    public async DeleteItem(id: Date): Promise<undefined> {
        const observable = this.http.delete<undefined>("https://localhost:44394/api/History/" + id);
        return observable.toPromise();
    }

    public async DeleteItemByIntegerId(id: number): Promise<undefined> {
        const observable = this.http.delete<undefined>("https://localhost:44394/api/Products/" + id);
        return observable.toPromise();
    }

}
