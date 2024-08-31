import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './CreateRecipe.css';

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
            await axios.post('http://localhost:5000/api/recipes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        } catch (error) {
            console.error('There was an error uploading the recipe:', error.response.data);
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
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Ingredients (comma-separated):</label>
                    <input
                        type="text"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Instructions:</label>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a Category</option>
                        <option value="main-course">Main Course</option>
                        <option value="appetizer">Appetizer</option>
                        <option value="soup">Soup</option>
                        <option value="salad">Salad</option>
                        <option value="side-dish">Side Dish</option>
                        <option value="dessert">Dessert</option>
                    </select>
                </div>
                <div>
                    <label>Image:</label>
                    <input
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
