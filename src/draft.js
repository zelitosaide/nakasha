{
  /* <div
style={{
  boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.11)",
  marginRight: index % 2 === 0 ? "4%" : 0,
  marginBottom: 16,
  display: "inline-block",
  height: 140,
  width: "48%",
  boxSizing: "border-box",
  padding: 2,
  background: "white",
  borderRadius: 15,
  overflow: "hidden",
}}
key={index}
>
<div style={{ height: 80, overflow: "hidden" }}>
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
</div>
</div> */
}
