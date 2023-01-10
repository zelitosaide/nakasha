import { createContext, useState } from "react";

export const CartContext = createContext(null);

export function Provider({ children }) {
  const [cart, setCart] = useState({
    userId: null,
    boxes: [],
    products: [],
    recipes: [],
    // items: [],
  });

  console.log(cart);

  function add(item, type) {
    const itemExist = cart[type].find(function (i) {
      return i._id === item._id;
    });

    if (!itemExist) {
      setCart(function (prevCart) {
        return {
          ...prevCart,
          [type]: [...prevCart[type], { ...item, quantity: 1 }],
        };
      });
    }

    if (itemExist) {
      setCart(function (prevCart) {
        const items = prevCart[type].map(function (i) {
          if (i._id === item._id) {
            return { ...i, quantity: i.quantity + 1 };
          } else {
            return i;
          }
        });

        return { ...prevCart, [type]: items };
      });
    }
  }

  function remove(item, type) {
    setCart(function (prevCart) {
      const items = prevCart[type].map(function (i) {
        if (i._id === item._id) {
          if (i.quantity === 1) {
            return null;
          }
          return { ...i, quantity: i.quantity - 1 };
        } else {
          return i;
        }
      });

      return {
        ...prevCart,
        [type]: items.filter(function (i) {
          return i;
        }),
      };
    });
  }

  function clear() {}

  function swap({ boxId, productId, product: newProduct }) {
    const rancho = cart.items.find(function (item) {
      return boxId === item._id;
    });

    if (rancho) {
      const products = rancho.products.map(function (product) {
        return product._id === productId ? newProduct : product;
      });

      rancho.products = products;
      const ranchos = cart.items.map(function (item) {
        if (item._id === boxId) {
          return rancho;
        } else {
          return item;
        }
      });

      setCart(function (prevCart) {
        return { ...prevCart, items: ranchos };
      });
    }
  }

  function update({ _id, products }) {
    const ranchos = cart.items.map(function (item) {
      if (item._id === _id) {
        return { ...item, products };
      } else {
        return item;
      }
    });

    setCart(function (prevChart) {
      return { ...prevChart, items: ranchos };
    });
  }

  return (
    <CartContext.Provider value={{ cart, add, remove, clear, swap, update }}>
      {children}
    </CartContext.Provider>
  );
}
