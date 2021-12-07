import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
});

const initialState = {
  items: [],
  totalAmount: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      let updatedItems;
      const index = state.items.findIndex((el) => el.id === action.item.id);
      if (index === -1) {
        updatedItems = [...state.items, action.item];
      } else {
        updatedItems = [...state.items];
        updatedItems[index].amount += action.item.amount;
      }

      return {
        items: updatedItems,
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
      };
    }
    case "REMOVE": {
      let updatedItems;
      const index = state.items.findIndex((el) => el.id === action.id);
      if (state.items[index].amount === 1) {
        updatedItems = state.items.filter((el) => el.id !== action.id);
      } else {
        updatedItems = [...state.items];
        updatedItems[index].amount -= 1;
      }

      return {
        items: updatedItems,
        totalAmount: state.totalAmount - state.items[index].price,
      };
    }
    case "CLEAR": {
      return initialState;
    }
    default:
      return { ...state };
  }

  // using if else and concat()
  // if (action.type === "ADD") {
  //   const updatedItems = state.items.concat(action.payload);
  //   const updatedTotalAmount =
  //     state.totalAmount + action.payload.price * action.payload.amount;
  //   return {
  //     items: updatedItems,
  //     totalAmount: updatedTotalAmount,
  //   };
  // }
};

export const CartProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addItemToCartHandler = (item) => {
    dispatch({ type: "ADD", item: item });
  };
  const removeItemToCartHandler = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatch({ type: "CLEAR" });
  };
  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalAmount: state.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
        clearCart: clearCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export default CartContext;
