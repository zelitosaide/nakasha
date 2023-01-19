import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

import { CartContext } from "../../../provider";
import { baseUrl } from "../../../api";

const style = {
  height: 60,
  border: "1px solid green",
  marginRight: 12,
  marginBottom: 12,
  padding: 8,
  width: "40%",
  display: "inline-block",
};

export function RecipeCategory() {
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
    fetch(`${baseUrl}/recipes?limit=${LIMIT}&page=${page}&category=breakfast`)
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
      `${baseUrl}/recipes?limit=${LIMIT}&page=${page}&category=breakfast`
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

  return (
    <div
      style={{
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <h4>Categoria da Receita: breakfast</h4>
      <InfiniteScroll
        dataLength={loadedItemsState.items.length}
        next={fetchMoreData}
        hasMore={loadedItemsState.hasNextPage}
        loader={<h4>Loading...</h4>}
      >
        {loadedItemsState.items.map((i, index) => {
          const recipeFoundInCart = cart.recipes.find(function (item) {
            return item._id === loadedItemsState.items[index]._id;
          });

          return (
            <div
              style={style}
              key={index}
            >
              {loadedItemsState.items[index].name}
              <div>
                {recipeFoundInCart ? (
                  <button
                    onClick={function () {
                      remove(loadedItemsState.items[index]);
                    }}
                  >
                    -
                  </button>
                ) : null}
                <span>
                  {recipeFoundInCart ? recipeFoundInCart.quantity : ""}
                </span>
                {!empty && (
                  <button
                    onClick={function () {
                      add(loadedItemsState.items[index]);
                    }}
                  >
                    +
                  </button>
                )}
              </div>
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
  );
}
