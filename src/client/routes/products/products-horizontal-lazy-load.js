import { useContext } from "react";
import { Link } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { CartContext } from "../../../provider";

export function ProdutoHorizontalLazyLoad({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
}) {
  const itemCount = hasNextPage ? items.length + 3 : items.length;

  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  const isItemLoaded = (index) => !hasNextPage || index < items.length;

  const { cart, add, remove } = useContext(CartContext);

  const GUTTER_SIZE = 12;
  // const WIDTH = 112;
  const WIDTH = 108;
  // x - 12 = 96

  function Item({ index, style }) {
    let content;

    if (!isItemLoaded(index)) {
      content = (
        <div>
          <SkeletonTheme
            baseColor="#ccc"
            highlightColor="#bbb"
          >
            <Skeleton
              height={style.width - GUTTER_SIZE}
              width={style.width - GUTTER_SIZE}
              style={{ borderRadius: 6 }}
            />
          </SkeletonTheme>
        </div>
      );
    } else {
      const productFoundInCart = cart.items.find(function (item) {
        return item._id === items[index]._id;
      });

      content = (
        <div
          style={{
            // background: "#ccc",
            background: "white",
            width: style.width - GUTTER_SIZE,
            // height: style.width - GUTTER_SIZE,
            height: 120,
            borderRadius: 6,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ height: 80, overflow: "hidden" }}>
            <Link to={`${items[index].category}/${items[index]._id}`}>
              <img
                style={{ width: style.width - GUTTER_SIZE }}
                src={items[index].imageUrl}
                alt={items[index].name}
              />
            </Link>
          </div>
          <div style={{ padding: 6 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                display: "block",
              }}
            >
              {items[index].name} 2kg
            </span>
          </div>

          {/* <div
            style={{
              position: "absolute",
              zIndex: 10,
              right: 0,
              bottom: 0,
              width: 24,
            }}
          >
            {productFoundInCart && (
              <>
                <button
                  style={{ width: 24 }}
                  onClick={function () {
                    remove(items[index]);
                  }}
                >
                  -
                </button>
                <span
                  style={{
                    background: "#33a02b",
                    width: 24,
                    display: "inline-block",
                    textAlign: "center",
                  }}
                >
                  {productFoundInCart.quantity}
                </span>
              </>
            )}
            <button
              style={{ width: 24 }}
              onClick={function (event) {
                event.stopPropagation();
                add(items[index]);
              }}
            >
              +
            </button>
          </div> */}
        </div>
      );
    }

    return (
      <div
        style={{
          ...style,
          width: style.width - GUTTER_SIZE,
          height: style.width - GUTTER_SIZE,
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <div style={{ marginTop: -5, marginBottom: 6 }}>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            className="List"
            // height={WIDTH}
            height={130}
            itemCount={itemCount}
            itemSize={WIDTH}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={300}
            layout="horizontal"
            style={{ width: "100%" }}
          >
            {Item}
          </List>
        )}
      </InfiniteLoader>
    </div>
  );
}
