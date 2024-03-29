import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import { CartContext } from "../../../provider";
import { baseUrl } from "../../../api";

export async function loader({ params }) {
  const recipeId = params.recipeId;
  const recipeResponse = await fetch(baseUrl + "/recipes/" + recipeId);
  const recipe = await recipeResponse.json();

  if (recipe.recipeItemsId) {
    const recipeItemsResponse = await fetch(
      baseUrl + "/recipeItems/" + recipe.recipeItemsId
    );
    const { ingredients } = await recipeItemsResponse.json();
    return { ...recipe, ingredients };
  }
  return recipe;
}

export function Recipe() {
  const { ingredients = [], ...recipe } = useLoaderData();
  const {
    cart: { recipes },
    add,
    remove,
    update,
  } = useContext(CartContext);

  const recipeFoundInCart = recipes.find(function (item) {
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
          paddingLeft: 20,
          paddingRight: 20,
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
                    const ingredientFoundInCart = recipes.find(function (item) {
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
                                  remove(ingredient, "recipes");
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
                                add(ingredient, "recipes");
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
