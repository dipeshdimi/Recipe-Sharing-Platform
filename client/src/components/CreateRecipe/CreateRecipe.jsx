import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './CreateRecipe.css';

// const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = 'https://recipe-sharing-platform-75ho.onrender.com';

function CreateRecipe() {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('ingredients', ingredients);
        formData.append('instructions', instructions);
        formData.append('category', category);
        if (image) {
            formData.append('image', image);
        }

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            await axios.post(`${API_BASE_URL}/api/recipes`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        } catch (error) {
            console.error('There was an error uploading the recipe:', error);
        }
    };


    return (
        <div className="container">
            <div className='header'>
                <h1>Create Recipe</h1>
                <Link to='/'><button className="navigation-button">Return to Home</button></Link>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label htmlFor='title'>Title:</label>
                    <input
                        id='title'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='ingredients'>Ingredients (comma-separated):</label>
                    <input
                        id='ingredients'
                        type="text"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='instructions'>Instructions:</label>
                    <textarea
                        id='instructions'
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='category'>Category:</label>
                    <select
                        id='category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a Category</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Soup">Soup</option>
                        <option value="Salad">Salad</option>
                        <option value="Side Dish">Side Dish</option>
                        <option value="Dessert">Dessert</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='image'>Image:</label>
                    <input
                        id='image'
                        type="file"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
}

export default CreateRecipe;
