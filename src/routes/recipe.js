import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import { CartContext } from "../provider";

const baseURL = "http://localhost:5000/";

export async function loader({ params }) {
  const recipeId = params.recipeId;
  const recipeResponse = await fetch(baseURL + "recipes/" + recipeId);
  const recipe = await recipeResponse.json();

  if (recipe.recipeItemsId) {
    const recipeItemsResponse = await fetch(
      baseURL + "recipeItems/" + recipe.recipeItemsId
    );
    const { ingredients } = await recipeItemsResponse.json();
    return { ...recipe, ingredients };
  }
  return recipe;
}

export function Recipe() {
  const { ingredients = [], ...recipe } = useLoaderData();
  const {
    cart: { items },
    add,
    remove,
    update,
  } = useContext(CartContext);

  const recipeFoundInCart = items.find(function (item) {
    return item._id === recipe._id;
  }) || { ...recipe, ingredients };

  useEffect(function () {
    if (recipeFoundInCart && !recipeFoundInCart.ingredients) {
      update({ _id: recipe._id, ingredients });
    }
  }, []);

  return (
    <div>
      <div
        style={{
          marginTop: 70,
          padding: "10px 20px",
        }}
      >
        {recipeFoundInCart && (
          <>
            <h3 style={{ color: "#333" }}>{recipeFoundInCart.name}</h3>

            <p>
              <b>Imagem da Receita</b>: {recipeFoundInCart.imageUrl}
            </p>

            <p>
              <b>Descricao:</b> {recipeFoundInCart.description}
            </p>

            {recipeFoundInCart.ingredients && (
              <>
                <p>
                  <b>Lista dos Produtos:</b>
                </p>
                <ul>
                  {recipeFoundInCart.ingredients.map(function (ingredient) {
                    const ingredientFoundInCart = items.find(function (item) {
                      return item._id === ingredient._id;
                    });

                    return (
                      <li key={ingredient._id}>
                        {ingredient.name}

                        {!!ingredient?.flag?.createdByAdmin && (
                          <>
                            {!!ingredientFoundInCart && (
                              <button
                                onClick={function () {
                                  remove(ingredient);
                                }}
                              >
                                -
                              </button>
                            )}
                            <span>
                              {!!ingredientFoundInCart &&
                                ingredientFoundInCart.quantity}
                            </span>
                            <button
                              onClick={function () {
                                add(ingredient);
                              }}
                            >
                              +
                            </button>
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
