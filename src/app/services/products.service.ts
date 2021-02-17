import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { store } from 'src/app/redux/store';
import { actionType } from 'src/app/redux/action-type';
import { productsModel } from '../Models/productsModel';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

   public products: productsModel[] = [];

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
}
