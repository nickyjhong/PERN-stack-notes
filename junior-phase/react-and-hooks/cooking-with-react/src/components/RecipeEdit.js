import React, { useContext } from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { RecipeContext } from './App'
import { v4 as uuidv4 } from 'uuid'

export default function RecipeEdit({ recipe }) {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)

  function handleChange(changes) {
    handleRecipeChange(recipe.id, { ...recipe, ...changes })
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...recipe.ingredients]
    const index = newIngredients.findIndex(ingredient => ingredient.id === id)
    newIngredients[index] = ingredient
    handleChange({ ingredients: newIngredients })
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidv4(),
      name: '',
      amount: ''
    }
    handleChange({ ingredients: [...recipe.ingredients, newIngredient] })
  }

  function handleIngredientDelete(id) {
    handleChange({ ingredients: recipe.ingredients.filter(ingredient => ingredient.id !== id)})
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button 
          className="btn recipe-edit__remove-button"
          onClick={() => handleRecipeSelect(undefined)}
        >
          &times;
        </button>
      </div>
      <div className="recipe-edit__details-grid">
        <label 
          htmlFor="name"
          className="recipe-edit__label">
          Name
        </label>
        <input 
          type="text"
          name="name"
          id="name" 
          className="recipe-edit__input"
          value={recipe.name}
          onChange={event => handleChange({ name: event.target.value })} />

        <label 
          htmlFor="cookTime"
          className="recipe-edit__label">
          Cook Time
        </label>
        <input 
          type="text" 
          name="cookTime" 
          id="cookTime" 
          className="recipe-edit__input"
          value={recipe.cookTime}
          onChange={event => handleChange({ cookTime: event.target.value })} />

        <label 
          htmlFor="servings" 
          className="recipe-edit__label">
          Servings
        </label>
        <input 
          type="number" 
          min="1" 
          name="servings" 
          id="servings" 
          className="recipe-edit__input"
          value={recipe.servings}
          onChange={event => handleChange({ servings: parseInt(event.target.value) || '' })} />

        <label
          htmlFor="instructions"
          className="recipe-edit__label">
          Instructions
        </label>
        <textarea
          name="instructions"
          className="recipe-edit__input"
          id="instructions"
          value={recipe.instructions}
          onChange={event => handleChange({ instructions: event.target.value })} />
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map(ingredient => (
          <RecipeIngredientEdit 
            key={ingredient.id}
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
            ingredient={ingredient}
          />
        ))}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button 
          className="btn btn--primary"
          onClick={() => handleIngredientAdd()}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  )
}
