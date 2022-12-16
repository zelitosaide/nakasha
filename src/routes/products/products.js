import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";

import vegetais from "../../assets/images/vegetais.png";
import frutas from "../../assets/images/frutas.png";
import mercearia from "../../assets/images/mercearia.png";

import { ProdutoHorizontalLazyLoad } from "./products-horizontal-lazy-load";

const baseURL = "http://localhost:5000/";

export async function loader() {
  const response = await fetch(baseURL + "productCategories");
  const productCategories = await response.json();
  return productCategories;
}

export function Products() {
  const LIMIT = 5;
  const productRows = useLoaderData().items.map(function (item) {
    return {
      name: item.name,
      loadNextPage: async function () {
        const response = await fetch(
          `${baseURL}products?limit=${LIMIT}&page=${page[item.name]}&category=${
            item.name
          }`
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
    <div>
      {/*  */}
      <div
        style={{
          marginTop: 70,
          padding: "10px 20px",
        }}
      >
        <h5 style={{ color: "#333" }}>Categorias</h5>
        <div
          className="cat"
          style={{ display: "flex", gap: 10 }}
        >
          <div style={{ border: "1px solid #d9dddd", padding: 5 }}>
            <img
              src={vegetais}
              alt="vegetais"
              style={{ width: 90 }}
            />
            <div style={{ textAlign: "center" }}>Vegetais</div>
          </div>
          <div style={{ border: "1px solid #d9dddd", padding: 5 }}>
            <img
              src={frutas}
              alt="frutas"
              style={{ width: 80 }}
            />
            <div style={{ textAlign: "center" }}>Frutas</div>
          </div>
          <div style={{ border: "1px solid #d9dddd", padding: 5 }}>
            <img
              src={mercearia}
              alt="mercearia"
              style={{ width: 80 }}
            />
            <div style={{ textAlign: "center", paddingBottom: 10 }}>
              Mercearia
            </div>
          </div>
        </div>
      </div>

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
            marginLeft: 20,
            marginRight: 20,
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
      <div style={{ paddingBottom: 96 }}>
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
              >
                <p style={{ marginLeft: 20, fontSize: 13 }}>
                  Categiria: {item.name} ({state[item.name].totalResults})
                </p>
                <Link to={item.name}>
                  <span style={{ paddingRight: 20, fontSize: 13 }}>
                    Ver todos
                  </span>
                </Link>
              </div>
              <div style={{ marginLeft: 20, marginRight: 20 }}>
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
  );
}