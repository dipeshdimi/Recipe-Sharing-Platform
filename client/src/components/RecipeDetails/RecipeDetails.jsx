import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetails.css';

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/recipes/${id}`)
            .then(response => setRecipe(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!recipe) return <div className="container">Loading...</div>;

    return (
        <div className="container recipe-details">
            <div className='header'>
                <h1 className="recipe-title">{recipe.title}</h1>
                <Link to='/'><button className="navigation-button">Return to Home</button></Link>
            </div>
            <p className='recipe-details-para'><strong>Category:&ensp;</strong> {recipe.category}</p>
            <p className='recipe-details-para'>
                <strong>Ingredients:&ensp;</strong> {recipe.ingredients.join(', ')}
            </p>
            <p className='recipe-details-para'><strong>Instructions:&ensp;</strong>{recipe.instructions}</p>
            {recipe.image && (
                <img
                    src={`http://localhost:5000/${recipe.image}`}
                    alt={recipe.title}
                    className="recipe-image"
                />
            )}
        </div>
    );
}

export default RecipeDetails;
