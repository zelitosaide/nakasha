import { useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

let page = 1;
const LIMIT = 10;

export function Category({ name }) {
  const [state, setState] = useState({
    hasNextPage: true,
    isNextPageLoading: false,
    items: [],
  });

  console.log(state);

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  // const itemCount = hasNextPage ? items.length + 1 : items.length;
  const itemCount = state.hasNextPage
    ? state.items.length + 1
    : state.items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = state.isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index) =>
    !state.hasNextPage || index < state.items.length;

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

  const Cell = ({ columnIndex, rowIndex, style }) => {
    let content,
      index = rowIndex * 3 + columnIndex;

    if (!isItemLoaded(index)) {
      content = "Loading...";
    } else {
      content = (
        <p>
          {state.items[index].amount}
          <br />
          favorite: {state.items[index].favorite.toString()}
          <br />
          <button>-</button>
          <span>0</span>
          <button>+</button>
        </p>
      );
    }

    return (
      <div
        className={
          columnIndex % 2
            ? rowIndex % 2 === 0
              ? "GridItemOdd"
              : "GridItemEven"
            : rowIndex % 2
            ? "GridItemOdd"
            : "GridItemEven"
        }
        style={style}
      >
        {/* r{rowIndex}, c{columnIndex} */}
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
          <Grid
            className="Grid"
            columnCount={3}
            columnWidth={100}
            onItemsRendered={onItemsRendered}
            ref={ref}
            height={100}
            rowCount={10}
            rowHeight={35}
            width={300}
            style={{ width: "100%" }}
          >
            {Cell}
          </Grid>
        )}
      </InfiniteLoader>
    </div>
  );
}

// itemCount={itemCount}
// itemSize={120}
