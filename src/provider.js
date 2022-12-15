import { createContext, useState } from "react";

export const CartContext = createContext(null);

export function Provider({ children }) {
  const [cart, setCart] = useState({ userId: null, items: [] });

  console.log(cart);

  function add(item) {
    const itemExist = cart.items.find(function (i) {
      return i._id === item._id;
    });

    if (!itemExist) {
      setCart(function (prevCart) {
        return {
          ...prevCart,
          items: [...prevCart.items, { ...item, quantity: 1 }],
        };
      });
    }

    if (itemExist) {
      setCart(function (prevCart) {
        const items = prevCart.items.map(function (i) {
          if (i._id === item._id) {
            return { ...i, quantity: i.quantity + 1 };
          } else {
            return i;
          }
        });

        return { ...prevCart, items: items };
      });
    }
  }

  function remove(item) {
    setCart(function (prevCart) {
      const items = prevCart.items.map(function (i) {
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
        items: items.filter(function (i) {
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

// loadNextPage: async function () {
//   fetch(
//     `${baseURL}products?limit=${LIMIT}&page=${page}&category=${item.name}`
//   )
//     .then(function (response) {
//       // setState(function (prevState) {
//       //   return [
//       //     ...prevState,
//       //     {
//       //       hasNextPage: true,
//       //       isNextPageLoading: true,
//       //       items: [],
//       //       totalResults: 0,
//       //     },
//       //   ];
//       // });
//       return response.json();
//     })
//     .then(function ({ items, pageInfo: { totalResults } }) {
//       setPage(function (prevPage) {
//         return prevPage + 1;
//       });

//       setState(function (prevState) {
//         return {
//           ...prevState,
//           hasNextPage: prevState.items.length < totalResults,
//           isNextPageLoading: false,
//           items: [...prevState.items].concat(items),
//           totalResults: totalResults,
//         };
//       });
//     });
// },
