import React, { useState } from 'react';
import MainScreen from './MainScreen';
import MetabolismScreen from './MetabolismScreen';
import EditModal from './EditModal';
import FoodModal from './FoodModal';
import AddMealScreen from './AddMealScreen';

import './App.css';

function App() {
  const [screen, setScreen] = useState('main');
  const [diet, setDiet] = useState([]); // Добавляем состояние для управления рационом
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [dietPlan, setDietPlan] = useState(/* начальное состояние для диеты */);
  const [isFoodSelectionScreenOpen, setIsFoodSelectionScreenOpen] = useState(false);
  const [currentDietPlan, setCurrentDietPlan] = useState('');

  const openFoodModal = () => {
    setIsFoodModalOpen(true);
  };
  const saveSelectedProducts = (products) => {
    // Здесь будет отправка данных на сервер
    console.log('Сохраняем продукты:', products);
  };
  const openEditModal = (field) => {
    setIsEditModalOpen(true);
    setEditingField(field);
  };
  
  // useEffect(() => {
  //   // Рассчитываем метаболизм и обновляем finalMetabolism
  //   const newMetabolism = calculateMetabolism(localProfile);
  //   setFinalMetabolism(newMetabolism); // Обновляем finalMetabolism
  // }, [localProfile.age, localProfile.weight, localProfile.height, localProfile.activityLevel, localProfile.gender]);

  const openMetabolismScreen = () => {
    setScreen('metabolism');
  };  
  const handleAddMealClick = (dietPlan) => {
    setCurrentDietPlan(dietPlan);
    setScreen('addMeal');
  };



  const onAddMeal = (dietPlan) => {
    setCurrentDietPlan(dietPlan);
    setScreen('addMeal');
  };
  



  return (
    <div>
      {screen === 'main' && <MainScreen           
          onOpenMetabolism={openMetabolismScreen}
          onEditAge={() => openEditModal('age')}
          onEditWeight={() => openEditModal('weight')}
          onEditMetabolism={() => openEditModal('metabolism')}
          onOpenFoodModal={openFoodModal}
          onAddMeal={onAddMeal}
          />}
      {screen === 'metabolism' && <MetabolismScreen />}
      {screen === 'addMeal' && <AddMealScreen onGoBack={() => setScreen('main')} /* ... другие пропсы ... */ />}
      {screen !== 'main' && (
        <button onClick={() => setScreen('main')}>Вернуться на главный экран</button>
      )}

      {/* Кнопки для навигации */}
      {/* <button onClick={openProductSelection}>Выбор Продуктов</button>
      <button onClick={openDietManagement}>Управление Рационом</button>
      <button onClick={() => setScreen('addProduct')}>Добавить Продукт в Рацион</button> */}

      <FoodModal
        isOpen={isFoodModalOpen}
        onClose={() => setIsFoodModalOpen(false)}
        onSave={saveSelectedProducts}
        // ... другие пропсы ...
      />

{screen === 'addMeal' && <AddMealScreen onGoBack={() => setScreen('main')} dailyDietFormula={currentDietPlan} /* ... другие пропсы ... */ />}


      {isEditModalOpen && <EditModal field={editingField} onClose={() => setIsEditModalOpen(false)} />}

    </div>
  );
}

export default App;