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
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      return {
        items: [...state.items, action.payload],
        totalAmount: updatedTotalAmount,
      };
    }
    default:
      return { ...state };
  }

  // using If ELSE and concat()
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
    dispatch({ type: "ADD", payload: item });
  };
  const removeItemToCartHandler = (item) => {};
  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalAmount: state.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export default CartContext;
