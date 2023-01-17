import { useEffect, useContext } from "react";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";

import { CartContext } from "../../../provider";
import { baseUrl } from "../../../api";

export async function loader({ params }) {
  const boxId = params.boxId;
  const boxResponse = await fetch(baseUrl + "/boxes/" + boxId);
  const box = await boxResponse.json();

  if (box.boxItemsId) {
    const boxItemsResponse = await fetch(
      baseUrl + "/boxItems/" + box.boxItemsId
    );
    const { products } = await boxItemsResponse.json();
    return { ...box, products };
  }
  return box;
}

export function Box() {
  const { products = [], ...box } = useLoaderData();
  const {
    cart: { boxes },
    add,
    remove,
    update,
  } = useContext(CartContext);
  const { boxId } = useParams();

  const boxFoundInCart = boxes.find(function (item) {
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
                      {boxes.find(function (item) {
                        return item._id === box._id;
                      }) && (
                        <Link
                          to={"swap/" + product.category}
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
