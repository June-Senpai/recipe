import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";
import { CreateRecipe } from "./pages/create-recipe";
import { SavedRecipes } from "./pages/saved-recipes";
import { Auth } from "./pages/auth";
import { Navbar } from "./components/navbar";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <App_ setTheme={setTheme} />
    </ThemeContext.Provider>
  );
}

function App_({ setTheme }) {
  const theme = useContext(ThemeContext);
  // console.log({ theme });
  return (
    <div className={theme}>
      <div className="app">
        <Router>
          <Navbar setTheme={setTheme} theme={theme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/saved-recipes" element={<SavedRecipes />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
