# What-to-Cook 🍽️

## Description
**What-to-Cook** is a recipe search application designed to solve the everyday challenge of meal planning and cooking inspiration. By integrating with the Edamam Recipe API, it offers personalized recipe recommendations based on meal types, cuisine preferences, and dietary restrictions. Whether you're a busy professional looking for quick dinner ideas or a health-conscious individual seeking nutritious recipes, What-to-Cook streamlines your cooking journey with an intuitive and responsive interface.

This app addresses the common frustration of finding suitable recipes by providing a comprehensive filtering system that considers various dietary needs, cuisine preferences, and meal types, making meal planning both efficient and enjoyable.

## Table of Contents
- [Key Features](#key-features)
- [Technical Implementation](#technical-implementation)
- [Setup and Installation](#setup-and-installation)
- [Usage Guide](#usage-guide)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Key Features
- **Recipe Search** 🔍
  - Filter by meal type (breakfast, lunch, dinner, snacks)
  - Search across global cuisines
  - Apply dietary restrictions and preferences
  
- **Recipe Details** 📋
  - Comprehensive ingredient lists
  - Step-by-step instructions
  - Nutritional information
  - Cooking time estimates

## Technical Implementation
- Built with React.js for dynamic UI updates
- State management using React Context
- Responsive design with CSS Grid and Flexbox
- API integration with Edamam Recipe Search
- Local storage for saving user preferences

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Edamam API credentials

### Installation Steps

1. **Clone the Repository**

git clone https://github.com/komalnpn/what-to-cook.git
cd what-to-cook

2. **Install Dependencies**

npm install

3. **ADD API Information in app.js**
 ...
const APP_ID = "Add the Edamam APP ID";
const APP_KEY = "Add the Edamam APP Key";
...

4. **Start Development Server**

npm start

*Your application will be available at http://localhost:3000*

## Usage Guide
### Basic Usage

### Initial Setup

Launch the application
Set your dietary preferences (optional)
Choose preferred cuisines (optional)

### Finding Recipes

Select meal type from the dropdown
Enter any specific ingredients (optional)
Apply dietary filters as needed
Click "Search Recipes"

### Recipe Interaction

Click on recipes get redirected to the website and webpage that has the recipe

### Advanced Features

Custom Search Combinations
Combine multiple filters

## API Integration

### Edamam Recipe Search API

Base Endpoint: https://api.edamam.com/api/recipes/v2
Authentication: API Key required, in the form of app id and key

### Key Endpoints

Recipe Search

    Method: GET
    Parameters:
        q: Search query
        diet: Dietary restrictions
        health: Health filters
        cuisineType: Cuisine preference

Nutrition Analysis

    Method: GET
    Parameters:

        ingredients: List of ingredients
        nutrition-type: Analysis type

Response Format

    jsonCopy{

    "hits": [

        {

        "recipe": {

            "label": "Recipe Name",
            "ingredients": [],
            "nutritionalInfo": {},
            "instructions": []

        }

        }

    ]
    
    }

## Contributing
We welcome contributions! Please follow these steps:

    Fork the repository
    Create a feature branch
    Commit your changes
    Push to the branch
    Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## Credits
LLMs ChatGPT and Clade were used to implement the functions for searching multiple categories. LLMs also helped with the structuring the tiles of the recipes and in implementing interactve tiles.  