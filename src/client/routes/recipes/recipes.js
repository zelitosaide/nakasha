import { useState } from "react";
import { Link } from "react-router-dom";

import vegetais from "../../../assets/images/vegetais.png";
import frutas from "../../../assets/images/frutas.png";
import mercearia from "../../../assets/images/mercearia.png";
import { RecipesHorizontalLazyLoad } from "./recipes-horizontal-lazy-load";
import { baseUrl } from "../../../api";

export function Recipes() {
  const [state, setState] = useState({
    hasNextPage: true,
    isNextPageLoading: false,
    items: [],
  });
  const [page, setPage] = useState(1);

  const LIMIT = 5;

  async function loadNextPage() {
    return fetch(
      `${baseUrl}/recipes?limit=${LIMIT}&page=${page}&category=breakfast`
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
      {/*  */}
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <h5 style={{ color: "#333" }}>Categorias de Receitas</h5>
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
      <div id="lazy-load">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <h5 style={{ marginLeft: 20 }}>Categoria: breakfast</h5>
          <Link to="breakfast">
            <span style={{ paddingRight: 20 }}>Ver todos</span>
          </Link>
        </div>
        <div style={{ marginLeft: 20, marginRight: 20 }}>
          <RecipesHorizontalLazyLoad
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
