import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";

import vegetais from "../../../assets/images/vegetais.png";
import frutas from "../../../assets/images/frutas.png";
import mercearia from "../../../assets/images/mercearia.png";

import { BoxesHorizontalLazyLoad } from "./boxes-horizontal-lazy-load";
import { baseUrl } from "../../../api";

export async function loader() {
  const response = await fetch(baseUrl + "/boxCategories");
  const boxCategories = await response.json();
  return boxCategories;
}

export function Boxes() {
  const [state, setState] = useState({
    hasNextPage: true,
    isNextPageLoading: false,
    items: [],
  });
  const [page, setPage] = useState(1);
  const boxCategories = useLoaderData();

  const LIMIT = 5;

  async function loadNextPage() {
    return fetch(
      `${baseUrl}/boxes?limit=${LIMIT}&page=${page}&category=breakfast`
    )
      .then(function (response) {
        setState(function (prevState) {
          return {
            ...prevState,
            isNextPageLoading: true,
          };
        });
        return response.json();
      })
      .then(function ({ items, pageInfo: { totalResults } }) {
        setPage(function (prevPage) {
          return prevPage + 1;
        });

        setState(function (prevState) {
          return {
            ...prevState,
            hasNextPage: prevState.items.length < totalResults,
            isNextPageLoading: false,
            items: [...prevState.items].concat(items),
          };
        });
      });
  }

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
              fontSize: 13,
              fontWeight: 600,
              paddingBottom: 12,
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
              gap: 9,
            }}
          >
            {boxCategories.items.slice(0, 3).map(function (boxCategory) {
              return (
                <li key={boxCategory._id}>
                  <Link to={boxCategory.name}>
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
                        src={boxCategory.imageUrl}
                        alt={boxCategory.name}
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
                        color: "black",
                      }}
                    >
                      {boxCategory.name}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
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
      <div id="lazy-load">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <h5 style={{ marginLeft: 20 }}>Caixas da epoca</h5>
          <Link to="hortalica">
            <span style={{ paddingRight: 20 }}>Ver todos</span>
          </Link>
        </div>
        <div style={{ marginLeft: 20, marginRight: 20 }}>
          <BoxesHorizontalLazyLoad
            hasNextPage={state.hasNextPage}
            isNextPageLoading={state.isNextPageLoading}
            items={state.items}
            loadNextPage={loadNextPage}
          />
        </div>
      </div>
    </div>
  );
}
