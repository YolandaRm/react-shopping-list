import { Product } from "./product";

const STORAGE_KEY = 'PRODUCTS_STORE';

class ProductsStore {
    constructor(){
        this.products = this._getProductsFromStorage();
    }
    add(product){
        this.products.unshift(product);
        this.save();
    }
    delete(id){
        const index = this.products.findIndex((product) => product.id === id);
        if(index === -1){
            return;
        }
        this.products.splice(index, 1);
        this.save();
    }
    save(){
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products));
    }
    _getProductsFromStorage(){
        const products = window.localStorage.getItem(STORAGE_KEY);
        if(!products){
            return [];
        }
        return JSON.parse(products).map((product) => Product.fromJSON(product));
    }

}

export const productStore = new ProductsStore();