import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
export default function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const context = useContext(CartContext);
  const totalAmount = `$${context.totalAmount.toFixed(2)}`;
  const hasItems = context.items.length > 0;

  const cartItemAddHandler = (item) => {
    context.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    context.removeItem(id);
  };

  const orderHandler = (id) => {
    setIsCheckout(true);
  };

  const submitOrderhandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://reducer-store-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: context.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    context.clearCart();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {context.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          // bind expects keyword this, hence null; 2nd argument are arguments to be provided to bind function
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderhandler} />
      )}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button onClick={orderHandler} className={classes.button}>
            Order
          </button>
        )}
      </div>
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmittingModalContent = (
    <>
      <p>Successfully sent the order...</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmittingModalContent}
    </Modal>
  );
}
