import React, { useState } from 'react';
import './App.css';

function App() {
  // Basic state setup
  const [searchType, setSearchType] = useState('');          // meal or cuisine
  const [selectedOption, setSelectedOption] = useState('');  // selected meal type
  const [cuisineSearch, setCuisineSearch] = useState('');   // typed cuisine
  const [recipes, setRecipes] = useState([]);               // stored recipes
  const [loading, setLoading] = useState(false);            // loading state
  const [error, setError] = useState(null);                 // error messages
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]); // dietary preferences

  // Available meal types
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  
  // Dietary options with emojis
  const restrictions = [
    { value: 'balanced', label: 'Balanced', emoji: '⚖️' },
    { value: 'high-protein', label: 'High Protein', emoji: '🥩' },
    { value: 'high-fiber', label: 'High Fiber', emoji: '🌾' },
    { value: 'low-sodium', label: 'Low Sodium', emoji: '🧂' },
    { value: 'vegan', label: 'Vegan', emoji: '🌱' },
    { value: 'vegetarian', label: 'Vegetarian', emoji: '🥗' },
    { value: 'dairy-free', label: 'Dairy-Free', emoji: '🥛' },
  ];

  // Taste indicators
  const tasteEmojis = {
    sweet: '🍭',
    spicy: '🌶️',
    savory: '🍽️',
    tangy: '🍋'
  };

  // Identifies recipe tastes from ingredients
  const identifyTastes = (ingredients) => {
    const tastes = new Set();
    
    // Keywords for each taste
    const tasteIngredients = {
      sweet: ['sugar', 'honey', 'maple', 'sweet', 'chocolate', 'caramel', 'molasses'],
      spicy: ['chili', 'pepper', 'jalapeno', 'sriracha', 'wasabi', 'horseradish', 'cayenne', 'paprika', 'spicy'],
      savory: ['salt', 'soy sauce', 'umami', 'meat', 'broth', 'stock', 'mushroom', 'garlic', 'onion'],
      tangy: ['lemon', 'lime', 'vinegar', 'citrus', 'orange', 'yogurt', 'sour', 'tomato']
    };

    // Check ingredients against taste keywords
    ingredients.forEach(ingredient => {
      const lowerIngredient = ingredient.toLowerCase();
      
      Object.entries(tasteIngredients).forEach(([taste, indicators]) => {
        if (indicators.some(indicator => lowerIngredient.includes(indicator))) {
          tastes.add(taste);
        }
      });
    });

    return Array.from(tastes).map(taste => tasteEmojis[taste]);
  };

  // Toggles dietary restrictions
  const handleRestrictionChange = (restriction) => {
    setDietaryRestrictions(prev => {
      if (prev.includes(restriction)) {
        return prev.filter(r => r !== restriction);
      }
      return [...prev, restriction];
    });
  };

  // Fetches recipes from API
  const fetchRecipes = async (query) => {
    setLoading(true);
    setError(null);
  
    try {
      const APP_ID = ""; //<---Add the APP ID provided here
      const APP_KEY = "";//<--- Add the APP Key provided here 
      
      let searchQuery = searchType === 'cuisine' ? cuisineSearch : query;

      // Build API URL
      let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`;
      
      // Add dietary filters
      dietaryRestrictions.forEach(restriction => {
        if (['balanced', 'high-protein', 'high-fiber', 'low-sodium'].includes(restriction)) {
          url += `&diet=${restriction}`;
        } else {
          url += `&health=${restriction}`;
        }
      });

      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('API request failed');
      }
  
      const data = await response.json();

      if (data.hits && data.hits.length > 0) {
        setRecipes(data.hits);
      } else {
        setError('No recipes found matching your criteria');
      }
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handles search button click
  const handleSearch = () => {
    if (searchType === 'cuisine' ? cuisineSearch : selectedOption) {
      fetchRecipes(selectedOption);
    }
  };
  // Main style definitions
  const styles = {
    // Base container
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#1a237e',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#fff',
    },
    // Header styles
    header: {
      textAlign: 'center',
      marginBottom: '50px',
      color: '#fff',
    },
    headerTitle: {
      fontSize: '2.5em',
      marginBottom: '10px',
      background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    // Main selection area
    selectionContainer: {
      maxWidth: '800px',
      margin: '0 auto 40px',
      padding: '30px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '15px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
    },
    // Dietary options grid
    restrictionsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '10px',
      marginBottom: '20px',
    },
    // Diet button styles
    restrictionButton: {
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundColor: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    // Active diet button
    restrictionButtonActive: {
      backgroundColor: '#4ECDC4',
      borderColor: '#4ECDC4',
    },
    // Search input field
    searchInput: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#fff',
      fontSize: '16px',
      marginBottom: '20px',
    },
    // Form group wrapper
    selectGroup: {
      marginBottom: '20px',
    },
    // Form labels
    label: {
      display: 'block',
      marginBottom: '10px',
      color: '#fff',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    // Dropdown select
    select: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#fff',
      fontSize: '16px',
      marginBottom: '20px',
      cursor: 'pointer',
      outline: 'none',
    },
    // Search button
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#4ECDC4',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    // Recipe grid layout
    recipeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '25px',
      padding: '20px 0',
    },
    // Recipe card
    recipeCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    // Recipe image
    recipeImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    // Recipe content area
    recipeInfo: {
      padding: '20px',
      backgroundColor: '#fff',
    },
    // Recipe title
    recipeTitle: {
      margin: '0 0 15px 0',
      fontSize: '18px',
      color: '#1a237e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    // Recipe text content
    recipeDetails: {
      fontSize: '14px',
      color: '#666',
    },
    // Taste emoji container
    tasteEmojis: {
      display: 'flex',
      gap: '5px',
      marginLeft: '10px',
      fontSize: '16px',
    },
    // Ingredients list container
    ingredientsContainer: {
      marginTop: '15px',
      maxHeight: '150px',
      overflowY: 'auto',
      padding: '5px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
    },
    // Individual ingredient tag
    ingredientLabel: {
      backgroundColor: '#e9ecef',
      color: '#495057',
      padding: '4px 8px',
      borderRadius: '8px',
      marginRight: '5px',
      marginBottom: '5px',
      fontSize: '12px',
      display: 'inline-block',
    },
    // Diet label tag
    dietLabel: {
      backgroundColor: '#4ECDC4',
      color: '#fff',
      padding: '4px 10px',
      borderRadius: '12px',
      marginRight: '5px',
      fontSize: '12px',
      display: 'inline-block',
      marginBottom: '5px',
    },
    // Loading indicator
    loading: {
      textAlign: 'center',
      padding: '20px',
      fontSize: '18px',
      color: '#fff',
    },
    // Error message
    error: {
      textAlign: 'center',
      padding: '20px',
      color: '#FF6B6B',
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      borderRadius: '8px',
    },
  };
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>🤷🏽 What-to-Cook 🤷🏽</h1>
        <p>Just Click and cook, without getting cooked (hopefully!)</p>
      </header>

      {/* Main selection area */}
      <div style={styles.selectionContainer}>
        {/* Dietary restrictions */}
        <div style={styles.selectGroup}>
          <label style={styles.label}>Dietary Restrictions</label>
          <div style={styles.restrictionsContainer}>
            {restrictions.map(restriction => (
              <button
                key={restriction.value}
                style={{
                  ...styles.restrictionButton,
                  ...(dietaryRestrictions.includes(restriction.value) ? styles.restrictionButtonActive : {})
                }}
                onClick={() => handleRestrictionChange(restriction.value)}
              >
                <span>{restriction.emoji}</span>
                <span>{restriction.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search type dropdown */}
        <div style={styles.selectGroup}>
          <label style={styles.label}>Search By</label>
          <select 
            style={styles.select}
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
              setSelectedOption('');
              setCuisineSearch('');
              setRecipes([]);
            }}
          >
            <option value="">Select search type</option>
            <option value="meal">Meal Type</option>
            <option value="cuisine">Cuisine Type</option>
          </select>
        </div>

        {/* Conditional render for meal/cuisine selection */}
        {searchType === 'meal' ? (
          <div style={styles.selectGroup}>
            <label style={styles.label}>Meal Type</label>
            <select 
              style={styles.select}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select option</option>
              {mealTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        ) : searchType === 'cuisine' && (
          <div style={styles.selectGroup}>
            <label style={styles.label}>Cuisine Type</label>
            <input
              type="text"
              style={styles.searchInput}
              value={cuisineSearch}
              onChange={(e) => setCuisineSearch(e.target.value)}
              placeholder="e.g., Italian, Chinese, Mexican..."
            />
          </div>
        )}

        {/* Search button */}
        <button 
          style={{
            ...styles.button,
            opacity: (!selectedOption && !cuisineSearch) ? '0.5' : '1',
            cursor: (!selectedOption && !cuisineSearch) ? 'not-allowed' : 'pointer',
          }}
          onClick={handleSearch}
          disabled={!selectedOption && !cuisineSearch}
        >
          Find Recipes
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div style={styles.loading}>
          Loading recipes...
        </div>
      )}

      {/* Error message */}
      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      {/* Recipe grid */}
      <div style={styles.recipeGrid}>
        {recipes.map(({recipe}) => {
          const tastes = identifyTastes(recipe.ingredientLines);
          
          return (
            <div
              key={recipe.uri}
              style={styles.recipeCard}
              onClick={() => window.open(recipe.url, '_blank')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
            >
              {/* Recipe image */}
              <img
                src={recipe.image}
                alt={recipe.label}
                style={styles.recipeImage}
              />
              
              {/* Recipe details */}
              <div style={styles.recipeInfo}>
                <div style={styles.recipeTitle}>
                  <span style={{flex: 1}}>{recipe.label}</span>
                  <div style={styles.tasteEmojis}>
                    {tastes.map((emoji, index) => (
                      <span key={index} role="img" aria-label="taste">
                        {emoji}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={styles.recipeDetails}>
                  <p>Source: {recipe.source}</p>
                  
                  {/* Diet labels */}
                  {recipe.dietLabels.length > 0 && (
                    <div style={{marginTop: '10px'}}>
                      {recipe.dietLabels.map(label => (
                        <span key={label} style={styles.dietLabel}>
                          {label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Ingredients */}
                  <div style={styles.ingredientsContainer}>
                    <strong>Ingredients:</strong>
                    <div style={{marginTop: '5px'}}>
                      {recipe.ingredientLines.map((ingredient, index) => (
                        <span key={index} style={styles.ingredientLabel}>
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;