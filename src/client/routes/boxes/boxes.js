import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";

import { BoxesHorizontalLazyLoad } from "./boxes-horizontal-lazy-load";
import { baseUrl } from "../../../api";

export async function loader() {
  const response = await fetch(baseUrl + "/boxCategories");
  const boxCategories = await response.json();
  return boxCategories;
}

export function Boxes() {
  const LIMIT = 5;
  const boxCategories = useLoaderData();
  const boxRows = boxCategories.items.map(function (item) {
    return {
      name: item.name,
      loadNextPage: async function () {
        const response = await fetch(
          `${baseUrl}/boxes?limit=${LIMIT}&page=${page[item.name]}&category=${
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
    boxRows.forEach(function (item) {
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
    boxRows.forEach(function (item) {
      init[item.name] = 1;
    });
    return init;
  });

  return (
    <div>
      {/* Categorias de Caixas */}
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
              fontSize: 12,
              fontWeight: 700,
              paddingBottom: 12,
              color: "#444",
            }}
          >
            Categorias de Caixas
          </p>
        </div>
        {!!boxCategories.items.length && (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {boxCategories.items.slice(0, 3).map(function (boxCategory) {
              return (
                <li key={boxCategory._id}>
                  <Link to={boxCategory.name}>
                    <div
                      style={{
                        background: "#33A02B",
                        width: 96,
                        height: 96,
                        borderRadius: 6,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <img
                        src={boxCategory.imageUrl}
                        alt={boxCategory.name}
                        style={{
                          width: 70,
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: 12,
                        textAlign: "center",
                        color: "#444",
                        fontWeight: 400,
                      }}
                    >
                      {boxCategory.name.slice(0, 1).toUpperCase() +
                        boxCategory.name.slice(1)}
                    </p>
                  </Link>
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
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              height: 180,
              background: "white",
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #d9dddd",
              borderRadius: 4,
            }}
          >
            <h5>Banner</h5>
          </div>
        </div>

        {/* Lazy load */}
        <div>
          {boxRows.map(function (item, index) {
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
                  <p style={{ fontSize: 11, fontWeight: 400, color: "#444" }}>
                    {item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}{" "}
                  </p>
                  <Link to={item.name}>
                    <span
                      style={{
                        fontSize: 11,
                        color: "#33A02B",
                        fontWeight: 400,
                      }}
                    >
                      Ver todos
                    </span>
                  </Link>
                </div>
                <div>
                  <BoxesHorizontalLazyLoad
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
