import { createContext, useMemo, useReducer } from "react";

const initCartState = { cart: [] };

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("Action Payload ADD is missing");
      }
      const { sku, name, image, price } = action.payload;

      const filteredCart = state.cart.filter((item) => item.sku !== sku);
      const itemExist = state.cart.find((item) => item.sku === sku);
      const qty = itemExist ? itemExist.qty + 1 : 1;

      return {
        ...state,
        cart: [...filteredCart, { sku, name, image, price, qty }],
      };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("Action Payload REMOVE is missing");
      }
      const { sku } = action.payload;

      const filteredCart = state.cart.filter((item) => item.sku !== sku);

      return { ...state, cart: [...filteredCart] };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("Action Payload Quantity is missing");
      }
      const { sku, qty } = action.payload;
      const itemExist = state.cart.find((item) => item.sku === sku);
      if (!itemExist) {
        throw new Error("Item must Exist in Order to update Quantity");
      }
      const updatedItem = { ...itemExist, qty };
      const filteredCart = state.cart.filter((item) => item.sku !== sku);
      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error("Unidentified Reducer Action Type");
  }
};

const useCartContext = (initCartState) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems = state.cart.reduce((prevValue, cartItem) => {
    return prevValue + cartItem.qty;
  }, 0);

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((prevValue, cartItem) => {
      return prevValue + cartItem.qty * cartItem.price;
    }, 0),
  );
  const cart = [...state.cart].sort((a, b) => {
    const itemA = Number(a.sku.slice(-4));
    const itemB = Number(b.sku.slice(-4));

    return itemA - itemB;
  });

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

const initCartContextState = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

export const CartContext = createContext(initCartContextState);

export const CartProvider = ({ children }) => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
