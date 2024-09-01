import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RecipeList.css';

// const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = 'https://recipe-sharing-platform-75ho.onrender.com';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const categoryList = ['Main Course', 'Appetizer', 'Soup', 'Salad', 'Side Dish', 'Dessert'];

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/recipes`)
            .then(response => {
                setRecipes(response.data);
                setFilteredRecipes(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = recipes.filter(recipe =>
            (recipe.title.toLowerCase().includes(lowerCaseQuery) ||
                recipe.category.toLowerCase().includes(lowerCaseQuery))
            &&
            (recipe.category === (selectedCategory) || selectedCategory === '')
        );
        setFilteredRecipes(filtered);
    }, [searchQuery, recipes, selectedCategory]);

    return (
        <div className="container">
            <div className="header">
                <h1 className="tagline">Explore...</h1>
                <Link to='/create'><button className="navigation-button">Add Your Recipe</button></Link>
            </div>

            <div className="search-filter">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by title or category..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    name='text'
                />
                <select
                    value={selectedCategory}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                    className='filter'
                    name='filter'
                >
                    <option value="">All Categories</option>
                    {categoryList.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="recipe-grid">
                {filteredRecipes.map(recipe => (
                    <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="recipe-card">
                        <img src={`${API_BASE_URL}/${recipe.image}`} alt={recipe.title} />
                        <div className="recipe-content">
                            <h2>{recipe.title}</h2>
                            <p className="recipe-category">{recipe.category}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default RecipeList;
