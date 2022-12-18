import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";

import { baseUrl } from "../../../api";

import { ProdutoHorizontalLazyLoad } from "./products-horizontal-lazy-load";

export async function loader() {
  const response = await fetch(baseUrl + "/productCategories");
  const productCategories = await response.json();
  return productCategories;
}

export function Products() {
  const LIMIT = 5;
  const productCategories = useLoaderData();
  const productRows = productCategories.items.map(function (item) {
    return {
      name: item.name,
      loadNextPage: async function () {
        const response = await fetch(
          `${baseUrl}/products?limit=${LIMIT}&page=${
            page[item.name]
          }&category=${item.name}`
        );

        setState(function (prevState) {
          return {
            ...prevState,
            [item.name]: {
              ...prevState[item.name],
              isNextPageLoading: true,
            },
          };
        });

        const {
          items,
          pageInfo: { totalResults },
        } = await response.json();

        setPage(function (prevPage) {
          return {
            ...prevPage,
            [item.name]: prevPage[item.name] + 1,
          };
        });

        setState(function (prevState) {
          return {
            ...prevState,
            [item.name]: {
              hasNextPage: prevState[item.name].items.length < totalResults,
              isNextPageLoading: false,
              items: [...prevState[item.name].items].concat(items),
              totalResults: totalResults,
            },
          };
        });
      },
    };
  });

  const [state, setState] = useState(function () {
    const init = {};
    productRows.forEach(function (item) {
      init[item.name] = {
        hasNextPage: true,
        isNextPageLoading: false,
        items: [],
        totalResults: 0,
      };
    });
    return init;
  });

  const [page, setPage] = useState(function () {
    const init = {};
    productRows.forEach(function (item) {
      init[item.name] = 1;
    });
    return init;
  });

  return (
    <div style={{}}>
      {/* Categorias de Produtos */}
      <div
        style={{
          background: "white",
          padding: "10px 20px",
          borderRadius: 26,
        }}
      >
        <div className="horizontal-lazy-load-header">
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              paddingBottom: 12,
            }}
          >
            Categorias de Produtos
          </p>
        </div>
        {!!productCategories.items.length && (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              gap: 9,
            }}
          >
            {productCategories.items
              .slice(0, 3)
              .map(function (productCategory) {
                return (
                  <li key={productCategory._id}>
                    <div
                      style={{
                        background: "#33A02B",
                        width: 100,
                        height: 96,
                        borderRadius: 6,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <img
                        src={productCategory.imageUrl}
                        alt={productCategory.name}
                        style={{
                          width: 86,
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        textAlign: "center",
                      }}
                    >
                      {productCategory.name}
                    </p>
                  </li>
                );
              })}
          </ul>
        )}
      </div>

      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        {/* banner */}
        <div
          style={{
            height: 180,
            marginTop: 10,
          }}
        >
          <div
            style={{
              height: 180,
              background: "#f8f8f0",
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #d9dddd",
            }}
          >
            <h5>Banner</h5>
          </div>
        </div>

        {/* Lazy load */}
        <div>
          {productRows.map(function (item, index) {
            return (
              <div
                id="lazy-load"
                key={index}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                  className="horizontal-lazy-load-header"
                >
                  <p style={{ fontSize: 13 }}>
                    Categiria: {item.name} ({state[item.name].totalResults})
                  </p>
                  <Link to={item.name}>
                    <span style={{ fontSize: 13, color: "#33A02B" }}>
                      Ver todos
                    </span>
                  </Link>
                </div>
                <div>
                  <ProdutoHorizontalLazyLoad
                    hasNextPage={state[item.name].hasNextPage}
                    isNextPageLoading={state[item.name].isNextPageLoading}
                    items={state[item.name].items}
                    loadNextPage={item.loadNextPage}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
