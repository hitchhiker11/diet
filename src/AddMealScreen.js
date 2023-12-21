import React, { useState, useEffect } from 'react';
import FoodModal from './FoodModal';
// import { useLocation } from 'react-router-dom';

const AddMealScreen = ({ userRestrictions, onSaveMeal, onGoBack, dailyDietFormula }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [remainingFormula, setRemainingFormula] = useState(dailyDietFormula || {}); // Initialize with an empty object as fallback
  const [mealSummary, setMealSummary] = useState({}); // Define the mealSummary state here
  // const location = useLocation();
  // const dailyDietFormula1 = location.state?.dailyDietFormula;

  const PRODUCTS = {
    'Б': [
      { id: 1, name: 'Творог', mass: 50, unit: 'гр', macro: 'Б', restrictions: [], quantity: 1 },
      { id: 2, name: 'Куриная грудка', mass: 30, unit: 'гр', macro: 'Б', restrictions: ['vegetarian'], quantity: 1 },
      // Добавьте здесь другие белковые продукты
    ],
    'М': [
      { id: 3, name: 'Кефир', mass: 50, unit: 'гр', macro: 'Б', restrictions: [], quantity: 1 },
      { id: 4, name: 'Молоко', mass: 30, unit: 'гр', macro: 'Б', restrictions: ['vegetarian'], quantity: 1 },
      // Добавьте здесь другие белковые продукты
    ],
    'Ф': [
      { id: 5, name: 'Арбуз', mass: 50, unit: 'гр', macro: 'Б', restrictions: [], quantity: 1 },
      { id: 6, name: 'Дыня', mass: 30, unit: 'гр', macro: 'Б', restrictions: ['vegetarian'], quantity: 1 },
      // Добавьте здесь другие белковые продукты
    ],
    'О': [
      { id: 7, name: 'Кефир', mass: 50, unit: 'гр', macro: 'Б', restrictions: [], quantity: 1 },
      { id: 8, name: 'Молоко', mass: 30, unit: 'гр', macro: 'Б', restrictions: ['vegetarian'], quantity: 1 },
      // Добавьте здесь другие белковые продукты
    ],
    'К': [
      { id: 9, name: 'Булгур крупа', mass: 50, unit: 'гр', macro: 'Б', restrictions: [], quantity: 1 },
      { id: 10, name: 'Картофель', mass: 30, unit: 'гр', macro: 'Б', restrictions: ['vegetarian'], quantity: 1 },
      // Добавьте здесь другие белковые продукты
    ],
    'Ж': [
      { id: 11, name: 'Авокадо', mass: 50, unit: 'гр', macro: 'Б', restrictions: [], quantity: 1 },
      { id: 12, name: 'Оливки', mass: 30, unit: 'гр', macro: 'Б', restrictions: ['vegetarian'], quantity: 1 },
      // Добавьте здесь другие белковые продукты
    ],
    // ... другие группы продуктов
  };

  const renderFormulaGroups = (formula) => {
    if (remainingFormula && typeof remainingFormula === 'object') {
      console.log(remainingFormula)
    return formula.match(/[А-ЯЖ]/g).map((group, index) => (
      <span key={index} onClick={() => handleGroupClick(group)} style={{ cursor: 'pointer', margin: '0 4px' }}>
        {group}
      </span>
    ));
    }
  };
  const formatRemainingFormula = () => {
    console.log(remainingFormula)
    if (remainingFormula && typeof remainingFormula === 'object') {
      return Object.entries(remainingFormula)
        .map(([group, amount]) => `${amount}${group}`)
        .join(' ');
    }
    return 'Нет данных'; // Fallback message or similar when remainingFormula is not available
  };

  // Convert the meal summary into a readable format for display
  const formatMealSummary = () => {
    return Object.entries(mealSummary)
      .map(([group, products]) => `${group}: ${products.map(p => `${p.name} x${p.quantity}`).join(', ')}`)
      .join(' | ');
  };

  // Function to calculate next and previous groups based on remaining formula
  const calculateNextAndPreviousGroup = () => {
    // Assuming remainingFormula is an object with keys as group names and values as remaining servings
    // Example: { 'Б': 2, 'Ж': 5, 'К': 3, ... }
    let groups = Object.keys(remainingFormula);
    let currentIndex = groups.indexOf(selectedGroup);
    
    return {
      nextGroup: groups[(currentIndex + 1) % groups.length],
      previousGroup: groups[(currentIndex - 1 + groups.length) % groups.length]
    };
  };

  useEffect(() => {
    if (selectedGroup) {
      let { nextGroup, previousGroup } = calculateNextAndPreviousGroup();
      // Update next and previous group buttons or indicators in the UI
    }
  }, [remainingFormula, selectedGroup]);
  
  const updateRemainingFormula = (product, quantity) => {
    // This function will subtract the selected product's quantity from the remaining formula.
    // Assuming each product has a designated group in its data model.
    let group = product.group; // You need to replace this with the actual path to the group in your product model
    let updatedFormula = { ...remainingFormula };
    
    if (updatedFormula[group]) {
      updatedFormula[group] -= quantity;
      setRemainingFormula(updatedFormula);
    }
  };

  const updateMealSummary = () => {
    // Logic to compile the meal summary based on the selectedProducts
    const newMealSummary = selectedProducts.reduce((summary, product) => {
      const { group, name, quantity } = product; // Assuming product has 'group', 'name', and 'quantity' properties
      if (!summary[group]) {
        summary[group] = [];
      }
      summary[group].push({ name, quantity });
      return summary;
    }, {});

    setMealSummary(newMealSummary); // Update the meal summary state
  };

  const promptForMealTime = () => {
    // This function could open a modal or a prompt asking the user to set a reminder for the next meal.
    // For simplicity, let's log to the console.
    console.log('Set a reminder for your next meal.');
  };

  const handleProductSelection = (product, quantity) => {
    setSelectedProducts([...selectedProducts, { ...product, quantity }]);
    updateRemainingFormula(product, quantity);
  };

  const handleGroupChange = (group) => {
    setSelectedGroup(group);
  };

  const handleOpenModal = () => {
    console.log('handleOpenModal called');
    setIsModalOpen(true);
    // Delayed log to check the state update
    setTimeout(() => console.log(`isModalOpen: ${isModalOpen}`), 0);
  };
    const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  const handleSwitchGroup = (direction) => {
    // 'direction' can be 'next' or 'previous'
    let { nextGroup, previousGroup } = calculateNextAndPreviousGroup();
    setSelectedGroup(direction === 'next' ? nextGroup : previousGroup);
  };

  const handleSaveMeal = () => {
    onSaveMeal(selectedProducts);
    updateMealSummary();
    setIsModalOpen(false);
    promptForMealTime();
    // Reset selected products for the next meal
    setSelectedProducts([]);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Внести прием пищи</button>
      
      {/* Display the remaining formula */}
      <div>
        <h3>Оставшаяся формула рациона:</h3>
        <p>{formatRemainingFormula(dailyDietFormula)}</p>
      </div>

      {/* Display the meal summary */}
      <div>
        <h3>Сводка приема пищи:</h3>
        <p>{formatMealSummary()}</p>
      </div>

      {/* Display the meal summary */}
      <div>
        <h3>Сводка приема пищи:</h3>
        <p>{formatMealSummary()}</p>
      </div>

      <FoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMeal}
        products={PRODUCTS}
        userRestrictions={userRestrictions}
        selectedGroup={selectedGroup}
        onProductSelection={handleProductSelection}
        onNextGroup={() => handleSwitchGroup('next')}
        onPreviousGroup={() => handleSwitchGroup('previous')}
        selectedProducts={selectedProducts}
      />
      {/* UI elements for meal time reminders could go here */}
      {/* ... */}
    </div>
  );
};

export default AddMealScreen;
