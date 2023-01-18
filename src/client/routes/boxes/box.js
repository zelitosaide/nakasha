import { useEffect, useContext } from "react";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";

import { CartContext } from "../../../provider";
import { baseUrl } from "../../../api";
import { Cart } from "../../../assets/icons/cart";

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
      <h1
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#444",
          padding: "0 20px",
          margin: 0,
          paddingBottom: 10,
        }}
      >
        {boxFoundInCart.name.slice(0, 1).toUpperCase() +
          boxFoundInCart.name.slice(1)}
      </h1>
      <div
        style={{
          padding: "20px 0",
          background: "white",
          borderRadius: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {boxFoundInCart && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={boxFoundInCart.imageUrl}
                alt={boxFoundInCart.name}
                style={{ width: "200px" }}
              />
            </div>

            <div>
              <h1
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#444",
                  marginBottom: 0,
                }}
              >
                Descrição da Caixa
              </h1>

              {boxFoundInCart.description ? (
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "#444",
                    marginBottom: 6,
                    marginTop: 6,
                    lineHeight: 1.4,
                  }}
                >
                  {boxFoundInCart.description}
                </p>
              ) : (
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "#444",
                    marginBottom: 6,
                    marginTop: 6,
                    lineHeight: 1.4,
                  }}
                >
                  Inclui: Tomate(1Kg), Alface(1Kg), Cebola(5kg), Alho(10Kg),
                  Pimenta(2Kg), Brócolis(1Kg), repolho(1Kg), alface(1Kg),
                  Couve(1kg), cebola(1Kg)
                </p>
              )}

              <h1
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#444",
                  marginBottom: 0,
                }}
              >
                Produtos da Caixa
              </h1>

              {boxFoundInCart.products && (
                <>
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

              <p
                style={{
                  color: "#33A02B",
                  fontWeight: 900,
                  fontSize: 18,
                  margin: 0,
                }}
              >
                {boxFoundInCart.price} MT
              </p>

              <button
                onClick={function () {
                  add(boxFoundInCart, "boxes");
                }}
                style={{
                  display: "flex",
                  width: "100%",
                  marginTop: 10,
                  border: "none",
                  outline: "none",
                  borderRadius: 22,
                  background: "#EF7200",
                  color: "white",
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Cart style={{ width: 26, color: "white" }} />
                <span style={{ marginLeft: 10 }}>Adicionar ao carinho</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
