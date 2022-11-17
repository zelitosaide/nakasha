import { useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

let page = 1;
const LIMIT = 10;

export function Category({ name }) {
  const [state, setState] = useState({
    hasNextPage: true,
    isNextPageLoading: false,
    items: [],
  });

  async function loadNextPage() {
    return fetch(`http://localhost:5000/invoices?limit=${LIMIT}&page=${page++}`)
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
        setState(function (prevState) {
          return {
            ...prevState,
            hasNextPage: prevState.items.length < totalResults,
            isNextPageLoading: false,
            items: [...prevState.items].concat(items),
            totalResults: totalResults,
          };
        });
      });
  }

  const itemCount = state.hasNextPage
    ? state.items.length + 5
    : state.items.length;

  const loadMoreItems = state.isNextPageLoading ? () => {} : loadNextPage;

  const isItemLoaded = (index) =>
    !state.hasNextPage || index < state.items.length;

  // Render an item or a loading indicator.
  const Item = ({ index, style }) => {
    let content;
    if (!isItemLoaded(index)) {
      content = "Loading...";
    } else {
      content = (
        <p>
          favorite: {state.items[index].favorite.toString()}
          <br />
          {state.items[index].count ? (
            <button
              onClick={function () {
                setState(function (prevState) {
                  return {
                    ...prevState,
                    items: prevState.items.map(function (invoice, i) {
                      if (i === index) {
                        return { ...invoice, count: invoice.count - 1 };
                      } else {
                        return invoice;
                      }
                    }),
                  };
                });
              }}
            >
              -
            </button>
          ) : null}
          <span>{state.items[index].count}</span>
          <button
            onClick={function () {
              setState(function (prevState) {
                return {
                  ...prevState,
                  items: prevState.items.map(function (invoice, i) {
                    if (i === index) {
                      return { ...invoice, count: invoice.count + 1 };
                    } else {
                      return invoice;
                    }
                  }),
                };
              });
            }}
          >
            +
          </button>
        </p>
      );
    }
    return (
      <div
        className={index % 2 ? "ListItemOdd" : "ListItemEven"}
        style={style}
      >
        {content}
      </div>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>{name}</h3>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            className="List"
            height={600}
            itemCount={itemCount}
            itemSize={120}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={300}
            style={{ width: "100%" }}
          >
            {Item}
          </List>
        )}
      </InfiniteLoader>
    </div>
  );
}
