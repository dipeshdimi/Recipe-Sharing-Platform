import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList/RecipeList';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <img src='/background.jpg' alt='Background Image' className='background' />
                <Routes>
                    <Route path="/" element={<RecipeList />} />
                    <Route path="/recipes/:id" element={<RecipeDetails />} />
                    <Route path="/create" element={<CreateRecipe />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
