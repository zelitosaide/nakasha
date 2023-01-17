import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useLoaderData } from "react-router-dom";

import { CartContext } from "../../../provider";
import { baseUrl } from "../../../api";

const style = {
  height: 50,
  border: "1px solid green",
  marginRight: 12,
  marginBottom: 12,
  padding: 8,
  width: "40%",
  display: "inline-block",
};

export async function loader({ params }) {
  return params.boxCategoryId;
}

export function BoxCategory() {
  const [loadedItemsState, setLoadedItemsState] = useState({
    hasNextPage: true,
    items: Array.from({ length: 20 }).fill(0),
  });

  const empty = loadedItemsState.items.every(function (item) {
    return !item;
  });

  const [page, setPage] = useState(1);
  const LIMIT = 20;
  const { cart, add, remove } = useContext(CartContext);

  useEffect(function () {
    fetch(`${baseUrl}/boxes?limit=${LIMIT}&page=${page}`)
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
    return fetch(`${baseUrl}/boxes?limit=${LIMIT}&page=${page}`)
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

  const category = useLoaderData();

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
          {loadedItemsState.items.map((i, index) => {
            const boxFoundInCart = cart.boxes.find(function (item) {
              return item._id === loadedItemsState.items[index]._id;
            });

            return (
              <div
                style={style}
                key={index}
              >
                {loadedItemsState.items[index].name}
                {boxFoundInCart ? (
                  <button
                    onClick={function () {
                      remove(loadedItemsState.items[index]);
                    }}
                  >
                    -
                  </button>
                ) : null}
                <span>{boxFoundInCart ? boxFoundInCart.quantity : ""}</span>
                {!empty && (
                  <button
                    onClick={function () {
                      add(loadedItemsState.items[index]);
                    }}
                  >
                    +
                  </button>
                )}
                {!empty && (
                  <div>
                    <Link to={loadedItemsState.items[index]._id}>See more</Link>
                  </div>
                )}
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}
