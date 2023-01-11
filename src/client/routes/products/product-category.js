import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { CartContext } from "../../../provider";
import { baseUrl } from "../../../api";
import { Link, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  return params.productCategoryId;
}

export function ProductCategory() {
  const [loadedItemsState, setLoadedItemsState] = useState({
    hasNextPage: true,
    items: Array.from({ length: 20 }).fill(0),
  });
  const [page, setPage] = useState(1);
  const { cart, add, remove } = useContext(CartContext);
  const LIMIT = 20;

  const category = useLoaderData();

  useEffect(function () {
    fetch(
      `${baseUrl}/products?limit=${LIMIT}&page=${page}&category=${category}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function ({ items }) {
        setPage(function (prevPage) {
          return prevPage + 1;
        });
        setLoadedItemsState(function (prevState) {
          return {
            ...prevState,
            items: items,
          };
        });
      });
  }, []);

  async function fetchMoreData() {
    return fetch(
      `${baseUrl}/products?limit=${LIMIT}&page=${page}&category=${category}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function ({ items, pageInfo: { totalResults } }) {
        setPage(function (prevPage) {
          return prevPage + 1;
        });
        setLoadedItemsState(function (prevState) {
          return {
            ...prevState,
            hasNextPage: prevState.items.length < totalResults,
            items: [...prevState.items].concat(items),
          };
        });
      });
  }

  function Cells() {
    return loadedItemsState.items.map((_, index) => {
      const productFoundInCart = cart.products.find(function (item) {
        return item._id === loadedItemsState.items[index]._id;
      });

      return (
        <div
          style={{
            marginLeft: index % 2 === 0 ? 20 : 0,
            marginRight: index % 2 === 1 ? 20 : 0,
            marginBottom: 16,
            display: "inline-block",
            height: 140,
            width: "calc(50% - 20px)",
            boxSizing: "border-box",
            background: "pink",
          }}
          key={index}
        >
          <div
            style={{
              height: 140,
              width: "96%",
              marginLeft: index % 2 === 1 ? "4%" : 0,
              boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.11)",
              background: "white",
            }}
          ></div>
          {/* <div style={{ height: 80, overflow: "hidden" }}>
            <Link
              to={loadedItemsState.items[index]._id}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 80,
              }}
            >
              <img
                src={loadedItemsState.items[index].imageUrl}
                alt={loadedItemsState.items[index].name}
                style={{ width: 90 }}
              />
            </Link>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1, background: "pink" }}>
              <span style={{ display: "block" }}>
                {
                  loadedItemsState.items[index].name
                    ?.split("-")[0]
                    ?.split(" ")[0]
                }{" "}
                2kg
              </span>
              <span style={{ display: "block" }}>
                {loadedItemsState.items[index].name?.length < 14 ? (
                  loadedItemsState.items[index].name
                ) : (
                  <>{loadedItemsState.items[index].name?.slice(0, 14)}...</>
                )}
              </span>
              <span style={{ display: "block", color: "#33A02B" }}>
                {loadedItemsState.items[index].price} MT
              </span>
            </div>
            <div>
              <button
                onClick={function () {
                  add(loadedItemsState.items[index], "products");
                }}
              >
                +
              </button>
              {productFoundInCart && (
                <>
                  <span style={{ display: "block" }}>
                    {productFoundInCart.quantity}
                  </span>
                  <button
                    onClick={function () {
                      remove(loadedItemsState.items[index], "products");
                    }}
                  >
                    -
                  </button>
                </>
              )}
            </div>
          </div> */}
        </div>
      );
    });
  }

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
        {category.slice(0, 1).toUpperCase() + category.slice(1)}
      </h1>
      <div
        style={{
          padding: "20px 0",
          background: "white",
          borderRadius: 20,
        }}
      >
        <InfiniteScroll
          dataLength={loadedItemsState.items.length}
          next={fetchMoreData}
          hasMore={loadedItemsState.hasNextPage}
          loader={<h4>Loading...</h4>}
        >
          <Cells />
        </InfiniteScroll>
      </div>
    </div>
  );
}
