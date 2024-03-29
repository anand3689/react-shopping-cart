import React from 'react'
import './App.css'
import Products from './components/Products';
import data from "./data.json"
import Filter from './components/Filter'
import Cart from './components/Cart';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            products: data.products,
            cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : [] ,
            size: "",
            sort: ""
        }
    }
    createOrder = (order) => {
        alert("Need to save order for" + order.name)
    }
    removeFromCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        this.setState({
            cartItems: cartItems.filter((x) => x.id !== product.id)
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x) => x.id !== product.id)));
    }

    addToCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        let alreadyInCart = false;
        cartItems.forEach(item => {
            if(item.id === product.id){
                item.count ++;
                alreadyInCart = true;
            }
        })
        if(! alreadyInCart ){
            cartItems.push({...product, count: 1})
        }
        this.setState({cartItems})
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    

    sortProducts = (event) => {
        console.log(event.target.value)
       this.setState({
            sort: event.target.value,
            products : data.products.sort((a,b) => (
                event.target.value === "lowest" ?
                ((a.price > b.price) ? 1 :-1) :
                event.target.value === "highest" ?
                ((a.price < b.price) ? 1 :-1):
                ((a.id > b.id) ? 1 : -1)
            ))
       })
       
    }
    
    filterProducts= (event) => {
        console.log(event.target.value)
        if(event.target.value === ""){
            this.setState({size: event.target.value, product:data.products})
        }else{
        this.setState({
                size: event.target.value,
                products: data.products.filter((product) => product.availableSizes.indexOf(event.target.value) >=0)
        })
        
        }
        
    }
    render() {


        return (
            <div className="grid-container">
                <header>
                    <a href="/">React Shopping Cart</a>
                </header>
                <main>
                    <div className="content">
                        <div className="main">
                        <Filter count={this.state.products.length}
                        size={this.state.size}
                        sort={this.state.sort}
                        filterProducts= {this.filterProducts}
                        sortProducts= {this.sortProducts}
                        ></Filter>
                        <Products products={this.state.products} addToCart = {this.addToCart}></Products>
                    </div>
                    <div className="sidebar">
                        <Cart 
                        cartItems={this.state.cartItems} 
                        removeFromCart={this.removeFromCart}
                        createOrder={this.createOrder}
                        />
</div>
</div>
                </main>
                <footer> All right is reserved
                </footer>
            </div>
        )
    }
}

export default App
