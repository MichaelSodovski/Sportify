import { productsModel } from '../Models/productsModel';

export class appState {

    public products: productsModel[];
    
    public constructor() {
        this.products = [];
    }
}

export const defaultAppState = new appState();