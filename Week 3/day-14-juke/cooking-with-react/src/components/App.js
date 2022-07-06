import React, { useState } from 'react'
import RecipeList from './RecipeList'
import '../css/app.css'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [ recipes, setRecipes ] = useState(sampleRecipes)
  return(
    <RecipeList 
      recipes={recipes}
      handleRecipeAdd={handleRecipeAdd}
      handleRecipeDelete={handleRecipeDelete}
    />
  );

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: 'Instr.',
      ingredients: [
        { id: uuidv4(), name: 'Name', amount: '1 tbsp'}
      ]
    }
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }
}



const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions: '1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken',
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 lbs'
      }, 
      {
        id: 2,
        name: 'Salt',
        amount: '1 tbsps'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: '1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork',
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '3 lbs'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 tbsps'
      }
    ]
  }
]

export default App;
