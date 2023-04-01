import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";
import { CreateRecipe } from "./pages/create-recipe";
import { SavedRecipes } from "./pages/saved-recipes";
import { Auth } from "./pages/auth";
import { Navbar } from "./components/navbar";
import { useGetUserID } from "../hooks/useGetUserID";
const userID = useGetUserID();
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar userID={userID} />
        <Routes>
          <Route path="/" element={<Home userID={userID} />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
