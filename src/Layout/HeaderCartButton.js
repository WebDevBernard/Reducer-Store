import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../store/cart-context";
export default function HeaderCartButton(props) {
  const context = useContext(CartContext);
  const numberofCartItems = context.items.reduce((current, item) => {
    return current + item.amount;
  }, 0);
  console.log(numberofCartItems);
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberofCartItems}</span>
    </button>
  );
}
