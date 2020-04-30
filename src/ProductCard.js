import React from 'react';
import { productStore } from './products-store';
import './ProductCard.css'
/**
 * Represents a product
 * props: {
 *  product: instance of Product
 *  onDelete: cb to be invoked passing the deleted product id
 * }
 */
class ProductCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          checked: this._product.checked
        };
    }
    get _product(){
        return this.props.product;
    }
    get _className(){
        let className = 'product-card__text';
        if(this.state.checked){
            className += ' product-card__text--checked'
        } else {
            className += ' product-card__text--pending'
        }
        return className;
    }
    _onChange = (ev) => {
        const checked = ev.target.checked;
        this.setState({checked});
        this._product.toggle();
        productStore.save();
    }
    _onDelete = () => {
        this.props.onDeleted && this.props.onDeleted(this._product.id);
    }
    render(){
        return (
            <div className="product-card">
                <span className={this._className}>{this._product.name}</span>
                <input type="checkbox" className="product-card__checkbox" checked={this._product.checked} onChange={this._onChange}/>
                <button className="product-card__delete" onClick={this._onDelete}>-</button>
            </div>
        );
    }
}

export default ProductCard;