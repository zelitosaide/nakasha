import { useEffect, useContext } from "react";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";

import { CartContext } from "../../../provider";

const baseURL = "http://localhost:5000/";

export async function loader({ params }) {
  const boxId = params.boxId;
  const boxResponse = await fetch(baseURL + "boxes/" + boxId);
  const box = await boxResponse.json();

  if (box.boxItemsId) {
    const boxItemsResponse = await fetch(
      baseURL + "boxItems/" + box.boxItemsId
    );
    const { products } = await boxItemsResponse.json();
    return { ...box, products };
  }
  return box;
}

export function Box() {
  const { products = [], ...box } = useLoaderData();
  const {
    cart: { items },
    add,
    remove,
    update,
  } = useContext(CartContext);
  const { boxId } = useParams();

  const boxFoundInCart = items.find(function (item) {
    return item._id === box._id;
  }) || { ...box, products };

  useEffect(function () {
    if (boxFoundInCart && !boxFoundInCart.products) {
      update({ _id: box._id, products });
    }
  }, []);

  return (
    <div>
      {boxFoundInCart && (
        <>
          <h3 style={{ color: "#333" }}>{boxFoundInCart.name}</h3>

          <p>
            <b>Imagem da Caixa</b>:
            <img
              src={boxFoundInCart.imageUrl}
              alt={boxFoundInCart.name}
            />
          </p>

          <p>
            <b>Descricao:</b> {boxFoundInCart.description}
          </p>

          {boxFoundInCart.products && (
            <>
              <p>
                <b>Lista dos Produtos:</b>
              </p>
              <ul>
                {boxFoundInCart.products.map(function (product) {
                  return (
                    <li key={product._id}>
                      {product.name}{" "}
                      {items.find(function (item) {
                        return item._id === box._id;
                      }) && (
                        <Link
                          to="swap"
                          state={{ boxId, productId: product._id }}
                        >
                          swap
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          <div>
            <Outlet />
          </div>

          <p>
            <b>Adicionar ao carinho</b>
          </p>
          {!!boxFoundInCart.quantity && (
            <button
              onClick={function () {
                remove(box);
              }}
            >
              -
            </button>
          )}

          <span>{!!boxFoundInCart.quantity && boxFoundInCart.quantity}</span>
          <button
            onClick={function () {
              add({ ...box, products });
            }}
          >
            +
          </button>
        </>
      )}
    </div>
  );
}
