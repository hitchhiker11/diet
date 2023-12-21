import React, { useState, useEffect } from 'react';
import FoodSelection from './FoodSelection'; // Путь к компоненту FoodSelection
import FoodModal from './FoodModal';

import './App.css';
function MetabolismScreen() {
  // ... Весь ваш код функционала метаболизма ...
  function calculateMetabolism(data) {
    let BM, PM1, PM2, IM;
  
    // Расчет базового метаболизма BM
    if (data.BM) {
      BM = data.BM;
    } else {
      if (data.gender === "M") {
        BM = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
      } else {
        BM = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
      }
    }
  
// Расчетный метаболизм 1 PM1
if (BM <= 1400) {
    PM1 = 1400;
} else if (BM > 1400 && BM <= 1500) {
    PM1 = BM;
} else {
    PM1 = BM - 300;  // This subtracts 300 from BM if BM is above 1500
}
  
    // Расчетный метаболизм 2 PM2 в зависимости от уровня физической активности
    switch (data.activityLevel) {
      case "low":
        PM2 = PM1;
        break;
      case "medium":
        PM2 = PM1 + 300;
        break;
      case "high":
        PM2 = PM1 + 500;
        break;
      default:
        PM2 = PM1;
    }
  
    // Итоговый метаболизм IM в зависимости от цели
    if (data.goal === "lose") {
      IM = PM2;
    } else if (data.goal === "maintain") {
      IM = PM2 + 300;
    } else {
      IM = PM2;
    }
  
    return IM;  // Возвращает итоговый метаболизм
  }


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

  
  const getDietPlan = (metabolism, isLactoseIntolerant) => {
    // Your table data should be stored in an array or an object for easier management. 
    // For the purpose of this example, I will assume an array of objects named dietPlans.
    const dietPlans = [
      { metabolism: 1200, formula: 'М1Ф1О4К3Б7Ж5', formulaLactoseFree: 'М0Ф7О5К3Б7Ж5' },
      { metabolism: 1300, formula: 'М1Ф2О4К3Б8Ж5', formulaLactoseFree: 'М0Ф2О5К3Б8Ж6' },
      { metabolism: 1400, formula: 'М1Ф2О5К4Б8Ж5', formulaLactoseFree: 'М0Ф2О5К4Б9Ж6' },
      { metabolism: 1500, formula: 'М2Ф2О5К4Б8Ж5', formulaLactoseFree: 'М0Ф2О6К4Б10Ж6' },
      { metabolism: 1600, formula: 'М2Ф2О6К4Б9Ж5', formulaLactoseFree: 'М0Ф2О6К4Б11Ж7' },
      { metabolism: 1700, formula: 'М2Ф2О6К5Б10Ж5', formulaLactoseFree: 'М0Ф2О6К5Б11Ж7' },
      { metabolism: 1800, formula: 'М2Ф2О6К5Б11Ж5', formulaLactoseFree: 'М0Ф2О6К5Б12Ж8' },
      { metabolism: 1900, formula: 'М2Ф2О6К5Б12Ж6', formulaLactoseFree: 'М0Ф2О6К6Б12Ж8' },
      { metabolism: 2000, formula: 'М2Ф2О6К6Б12Ж6', formulaLactoseFree: 'М0Ф2О6К7Б13Ж8' },
      { metabolism: 2100, formula: 'М2Ф2О6К6Б13Ж7', formulaLactoseFree: 'М0Ф2О6К7Б13Ж9' },
      { metabolism: 2200, formula: 'М3Ф2О6К6Б13Ж7', formulaLactoseFree: 'М0Ф2О6К7Б14Ж10' },
      { metabolism: 2300, formula: 'М3Ф2О7К6Б14Ж7', formulaLactoseFree: 'М0Ф2О7К7Б15Ж10' },
      { metabolism: 2400, formula: 'М3Ф2О7К7Б14Ж7', formulaLactoseFree: 'М0Ф3О7К7Б15Ж11' },
      { metabolism: 2500, formula: 'М3Ф2О7К7Б15Ж8', formulaLactoseFree: 'М0Ф4О7К7Б16Ж11' },
      { metabolism: 2600, formula: 'М3Ф3О7К8Б15Ж8', formulaLactoseFree: 'М0Ф4О8К8Б16Ж11' },
      { metabolism: 2700, formula: 'М4Ф3О7К8Б15Ж8', formulaLactoseFree: 'М0Ф5О8К8Б16Ж12' },
      { metabolism: 2800, formula: 'М4Ф3О7К8Б15Ж9', formulaLactoseFree: 'М0Ф5О8К9Б16Ж12' },
      { metabolism: 2900, formula: 'М4Ф3О7К8Б16Ж10', formulaLactoseFree: 'М0Ф5О8К9Б17Ж13' },
      { metabolism: 3000, formula: 'М4Ф3О7К9Б16Ж10', formulaLactoseFree: 'М0Ф5О8К9Б17Ж14' },
    
    ];
  
    // Find the closest match for the calculated metabolism in the dietPlans
    const matchingPlan = dietPlans.reduce((prev, curr) => {
      return (Math.abs(curr.metabolism - metabolism) < Math.abs(prev.metabolism - metabolism) ? curr : prev);
    });
  
    // Return either the lactose-free or regular formula based on user's lactose intolerance
    return isLactoseIntolerant ? matchingPlan.formulaLactoseFree : matchingPlan.formula;
  };

// ///////////////////////////////

const [showAdditionalFields, setShowAdditionalFields] = useState(false);
const [userData, setUserData] = useState({
  name: "",
  age: "",
  gender: "",
  activity: "",
  metabolism: "",
  height: "",
  weight: ""
});
const [calculatedMetabolism, setCalculatedMetabolism] = useState(null);
const [finalMetabolism, setFinalMetabolism] = useState(null);
const [selectedDietProducts, setSelectedDietProducts] = useState([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedGroup, setSelectedGroup] = useState(null);
const [selectedMacro, setSelectedMacro] = useState(null);
const [foodSelectionVisible, setFoodSelectionVisible] = useState(false);
const [isLactoseFree, setIsLactoseFree] = useState(false);
const [isGlutenFree, setIsGlutenFree] = useState(false);
const [isVegetarian, setIsVegetarian] = useState(false);
const [isLactoVegetarian, setIsLactoVegetarian] = useState(false);
const [isOvoLactoVegetarian, setIsOvoLactoVegetarian] = useState(false);
const [isVegan, setIsVegan] = useState(false);
const [dietGroups, setDietGroups] = useState([]);
const [dietPlan, setDietPlan] = useState('');
const [selectedProductsByGroup, setSelectedProductsByGroup] = useState({});
const [selectedProducts, setSelectedProducts] = useState([]);
useEffect(() => {
  if (selectedGroup && selectedProductsByGroup[selectedGroup]) {
    setSelectedProducts(selectedProductsByGroup[selectedGroup]);
  } else {
    setSelectedProducts([]);
  }
}, [selectedGroup, selectedProductsByGroup]);

// Собираем ограничения пользователя
const userRestrictions = [
  isLactoseFree ? 'lactose-free' : '',
  isGlutenFree ? 'gluten-free' : '',
  isVegetarian ? 'vegetarian' : '',
  isLactoVegetarian ? 'lacto-vegetarian' : '',
  isOvoLactoVegetarian ? 'ovo-lacto-vegetarian' : '',
  isVegan ? 'vegan' : ''
].filter(Boolean); // Фильтруем пустые значения

const extractGroupsFromDietPlan = (plan) => {
  return plan.match(/[А-Я]/g) || [];
};

useEffect(() => {
  if (dietPlan) {
    setDietGroups(extractGroupsFromDietPlan(dietPlan));
  }
}, [dietPlan]);


// Функция для обработки клика по элементу формулы рациона
const handleMacroSelect = (macro) => {
  setSelectedGroup(macro);
  setIsModalOpen(true);
};
const handleCloseModal = () => {
  setIsModalOpen(false);
};

const handleSelectionChange = (group, newSelectedProducts) => {
  setSelectedProductsByGroup(prev => ({
    ...prev,
    [group]: newSelectedProducts
  }));
};


const handleChange = e => {
  const { name, value } = e.target;
  setUserData({
    ...userData,
    [name]: value,
  });
};
const handleProductSave = (selectedGroup, products) => {
  setSelectedProductsByGroup(prev => ({
    ...prev,
    [selectedGroup]: products
  }));
  setIsModalOpen(false);
};
const handleFinishSelection = () => {
  // Закрыть модальное окно
  setIsModalOpen(false);
  
  // Здесь можно обработать итоговый рацион
  // Например, вывод его на экран или отправка данных на сервер
  console.log('Итоговый выбор продуктов:', selectedDietProducts);
  // Выводите selectedDietProducts как угодно, например, в виде списка на странице
};

// const foodGroups = ['Б', 'Ж', 'У', 'Ф', 'М', 'О'];



const findNextGroup = (currentGroup, groups) => {
  if (!groups || groups.length === 0) return currentGroup;
  const currentIndex = groups.indexOf(currentGroup);
  return groups[(currentIndex + 1) % groups.length];
};

const findPreviousGroup = (currentGroup, groups) => {
  if (!groups || groups.length === 0) return currentGroup;
  const currentIndex = groups.indexOf(currentGroup);
  return groups[(currentIndex - 1 + groups.length) % groups.length];
};

const handleNextGroup = () => {
  const nextGroup = findNextGroup(selectedGroup, dietGroups);
  if (nextGroup !== selectedGroup) {
    setSelectedGroup(nextGroup);
  }
};

const handlePreviousGroup = () => {
  const prevGroup = findPreviousGroup(selectedGroup, dietGroups);
  if (prevGroup !== selectedGroup) {
    setSelectedGroup(prevGroup);
  }
};;



const handleContinue = () => {
  // Логика для продолжения выбора из текущей группы
};

const handleSwitchGroup = () => {
  // Логика для перехода в другую группу
  setIsModalOpen(false);
};

const handleFinish = () => {
  // Логика для завершения формирования приема пищи
  setIsModalOpen(false);
  // Вы можете добавить логику для отображения итогового меню приема пищи здесь
};

// const calculateMetabolism = () => {
//   const M = 10 * parseFloat(userData.weight) + 6.25 * parseFloat(userData.height) - 5 * parseFloat(userData.age);
//   if (userData.gender === 'female') M -= 161;
//   return M >= 1200 ? M : 1200;
// };

const calculatePM1 = () => {
  if (calculatedMetabolism < 1400) return 1400;
  return calculatedMetabolism;
};

const calculatePM2 = () => {
  const activityMultiplier = {
    low: 0,
    medium: 300,
    high: 500
  };
  const pm1 = calculatePM1();
  return pm1 + activityMultiplier[userData.activity];
};
const [isLactoseIntolerant, setIsLactoseIntolerant] = useState(false);


const handleSubmit = e => {
  e.preventDefault();

  // Достаем нужные данные из состояния
  const { gender, weight, height, age, activity, name, metabolism } = userData;

  // Проверяем, если известен метаболизм, используем его, иначе используем 0
  const knownBM = metabolism ? parseFloat(metabolism) : 0;

  const finalMetabolism = calculateMetabolism({
    BM: knownBM,
    gender: gender,
    weight: parseFloat(weight),
    height: parseFloat(height),
    age: parseFloat(age),
    activityLevel: activity,
    goal: "lose"  // По умолчанию ставим "lose", так как у вас не было выбора для этой опции в форме
  });

  const recommendedDietPlan = getDietPlan(finalMetabolism, isLactoseIntolerant);
  setDietPlan(recommendedDietPlan);
  setFinalMetabolism(finalMetabolism);

};


//////////////////////////////////////////


return (
  <div className="App">
    <h2>Ассистент-диетолог</h2>
    <form onSubmit={handleSubmit}>
      <label>
          ФИО:
          <input type="text" name="name" value={userData.name} onChange={handleChange} />
        </label>
        <label>
          Возраст:
          <input type="number" name="age" value={userData.age} onChange={handleChange} />
        </label>
        <label>
          Пол:
          <select name="gender" value={userData.gender} onChange={handleChange}>
            <option value="">Выбрать...</option>
            <option value="male">Мужчина</option>
            <option value="female">Женщина</option>
          </select>
        </label>
        <label>
          Уровень активности:
          <select name="activity" value={userData.activity} onChange={handleChange}>
            <option value="">Выбрать...</option>
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </label>
        <label>
          Метаболизм:
          <input 
            type="number" 
            name="metabolism" 
            value={userData.metabolism} 
            onChange={handleChange} 
            disabled={showAdditionalFields}
          />
        </label>

        {!userData.metabolism && 
          <button type="button" onClick={() => setShowAdditionalFields(!showAdditionalFields)}>
            Не знаю свой метаболизм
          </button>
        }
        {showAdditionalFields && (
          <>
            <label>
              Рост, см:
              <input type="number" name="height" value={userData.height} onChange={handleChange} />
            </label>
            <label>
              Вес, кг:
              <input type="number" name="weight" value={userData.weight} onChange={handleChange} />
            </label>
          </>
        )}
        <label>
          Непереносимость лактозы:
          <input
            type="checkbox"
            checked={isLactoseIntolerant}
            onChange={() => setIsLactoseIntolerant(!isLactoseIntolerant)}
          />
        </label>
        <button type="submit">Подтвердить</button>
      </form>
    {finalMetabolism && (
      <>
        <p>Итоговый метаболизм: {finalMetabolism}</p>
        <div>
          <p>Рекомендуемый рацион:</p>
          {/* Преобразуем строку рациона в массив кликабельных элементов */}
          {dietPlan.split('').map((macro, index) => (
            <span key={index} onClick={() => handleMacroSelect(macro)} style={{cursor: 'pointer', margin: '0 5px'}}>
              {macro}
            </span>
          ))}
        </div>
        {/* Показываем FoodSelection если выбран макроэлемент */}
        {/* {foodSelectionVisible && selectedMacro && ( */}
        <FoodModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        products={PRODUCTS}
        selectedGroup={selectedGroup}
        userRestrictions={userRestrictions}
        selectedProducts={selectedProductsByGroup[selectedGroup] || []}
        onSave={(products) => handleProductSave(selectedGroup, products)}
        onSelectionChange={handleSelectionChange}
        onNextGroup={handleNextGroup}
        onPreviousGroup={handlePreviousGroup}
        nextGroup={findNextGroup(selectedGroup, dietGroups)}
        previousGroup={findPreviousGroup(selectedGroup, dietGroups)}
      />

      {finalMetabolism && (
        <button onClick={handleFinishSelection}>Завершить выбор рациона</button>
      )}
      </>
    )}
  </div>
);
}

export default MetabolismScreen;