import React, { Component } from 'react'
import formatCurrency from '../util';

export default class Cart extends Component {
    render() {
        const {cartItems} = this.props;
        return (
            <>
            <div>
                {cartItems.length === 0 ? (
                <div className = "cart cart-header">
                    Cart is Empty
                    </div>):
                (<div className = "cart cart-header">
                    You have {cartItems.length} in the cart{ " "}
                    </div>
                )}
            </div>
            <div className="cart">
                <ul className="cart-items">
                    {cartItems.map(item =>(
                        <li key = {item.id}>
                            <div>
                                <img src ={item.image} alt={item.title}></img>
                            </div>
                            <div>
                              <div>{item.title}</div>
                              <div className="right">
                                  {formatCurrency(item.price)} x {item.count}
                              <button  onClick={() => this.props.removeFromCart(item)}>
                                  Remove
                              </button>
                              </div>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>
            {cartItems.length!==0 && (
                <div className="cart-total">
                    <div className="total">
                        Total:{" "}
                        {formatCurrency(cartItems.reduce((a,b) => a + b.price * b.count, 0))}
                    </div>
                    <div>
                        <button className="button-primary">Proceed</button>
                    </div>
                </div>
            )}
            </>
        )
    }
}
