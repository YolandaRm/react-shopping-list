import React from 'react';
import AddProductForm from './AddProductForm';
import ProductCard from './ProductCard';
import {Product} from './product';
import {productStore} from './products-store';
import './App.css'
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: [...productStore.products]
    }
  }
  _onProductAdded = (name) => {
    const newProduct = new Product(name);
    productStore.add(newProduct);
    this.setState({
      products: [newProduct, ...this.state.products]
    });
    
  }
  _onDeleted = (id) => {
    productStore.delete(id);
    this.setState({
      products: this.state.products.filter((product) => product.id !== id)
    });
  }
  render() {
    return (
      <main className="app"> 
        <AddProductForm onProductAdded={this._onProductAdded}/>
        {this.state.products.map((product) => {
          return <ProductCard key={product.id} product={product} onDeleted={this._onDeleted}/>
        })}
      </main>
    );
  }
}

export default App;
