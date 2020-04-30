import uuid from './uuid';
export class Product {
    static fromJSON(product){
        return new this(product.name, product.id, product.checked);
    }
    constructor(name, id, checked){
        this.name = name;
        this.id = id || uuid();
        this.checked = checked || false;
    }
    toggle(){
        this.checked = !this.checked;
    }
    toJSON(){
        // permite especificar cómo se convierte esta clase a JSON
        return {
            name: this.name,
            id: this.id,
            checked: this.checked
        };
    }
}