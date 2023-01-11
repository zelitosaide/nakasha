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
            height: 30,
            border: "1px solid green",
            marginRight: 12,
            marginBottom: 12,
            padding: 8,
            width: "40%",
            display: "inline-block",
          }}
          key={index}
        >
          <div>
            <Link to={loadedItemsState.items[index]._id}>
              <img
                src={loadedItemsState.items[index].imageUrl}
                alt={loadedItemsState.items[index].name}
              />
            </Link>
          </div>
          {/* {loadedItemsState.items[index].name
            ? loadedItemsState.items[index].name.split(" ")[0]
            : ""}
          {productFoundInCart ? (
            <button
              onClick={function () {
                remove(loadedItemsState.items[index]);
              }}
            >
              -
            </button>
          ) : null}
          <span>{productFoundInCart ? productFoundInCart.quantity : ""}</span>
          <button
            onClick={function () {
              add(loadedItemsState.items[index]);
            }}
          >
            +
          </button> */}
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
          padding: "10px 20px 20px 20px",
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
