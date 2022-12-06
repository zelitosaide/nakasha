import { useLoaderData } from "react-router-dom";

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

  console.log(recipe);
}
