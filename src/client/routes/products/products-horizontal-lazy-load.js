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
  const WIDTH = 112;

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
            background: "#ccc",
            width: style.width - GUTTER_SIZE,
            height: style.width - GUTTER_SIZE,
            borderRadius: 6,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            style={{
              width: style.width - GUTTER_SIZE,
              height: style.width - GUTTER_SIZE,
            }}
            src={items[index].imageUrl}
            alt={items[index].name}
          />
          <div
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
              onClick={function () {
                add(items[index]);
              }}
            >
              +
            </button>
          </div>
          {/* {productFoundInCart ? (
            <button
              onClick={function () {
                remove(items[index]);
              }}
            >
              -
            </button>
          ) : null}
          <span>{productFoundInCart ? productFoundInCart.quantity : ""}</span>
          <button
            onClick={function () {
              add(items[index]);
            }}
          >
            +
          </button> */}
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
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          className="List"
          height={WIDTH + GUTTER_SIZE}
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
  );
}
