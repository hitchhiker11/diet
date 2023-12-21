import React, { useState, useEffect } from 'react';
import AddMealScreen from './AddMealScreen';
// import { Link } from 'react-router-dom';
// import './MainScreen.css';
import './App.css';
function MainScreen({onEditProfile, onAddMeal, userProfile, updateUserProfile ,onOpenFoodSelection,calculateDietFormula , onOpenFoodModal, onOpenMetabolism, onEditAge, onEditWeight, onEditMetabolism, dailyDietFormula }) {
  const [localProfile, setLocalProfile] = useState({ ...userProfile });
  const [dietFormula, setDietFormula] = useState('');
  const [userData, setUserData] = useState({
    ...userProfile,
    age: userProfile?.age || '',
    weight: userProfile?.weight || '',
    height: userProfile?.height || '',
    activity: userProfile?.activity || '',
    metabolism: userProfile?.metabolism || '',
  });
  const [isLactoseIntolerant, setIsLactoseIntolerant] = useState(false);
  const [dietPlan, setDietPlan] = useState('');
  const [finalMetabolism, setFinalMetabolism] = useState(null);

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
  
  useEffect(() => {
    const newMetabolism = calculateMetabolism(localProfile);
    if (newMetabolism !== undefined) { // Add checks for valid values
      console.log(`Calculated Metabolism: ${newMetabolism}`);
      setFinalMetabolism(newMetabolism);
    }
  }, [localProfile]);
  
  useEffect(() => {
    // Calculate metabolism based on the updated profile
    const newMetabolism = calculateMetabolism(localProfile);
    if (newMetabolism !== undefined) {
      console.log(`Calculated Metabolism: ${newMetabolism}`);
      setFinalMetabolism(newMetabolism);
  
      // Now calculate the diet formula based on the new metabolism
      const newDietFormula = getDietPlan(newMetabolism, isLactoseIntolerant);
      if (newDietFormula !== undefined) {
        console.log(`Calculated Diet Formula: ${newDietFormula}`);
        setDietPlan(newDietFormula);
      }
      console.log("dietPlan")
      console.log(dietPlan)
    }
  }, [localProfile, isLactoseIntolerant]); // This effect runs when localProfile or isLactoseIntolerant changes
  
  
  const handleLocalProfileChange = (field, value) => {
    setLocalProfile({ ...localProfile, [field]: value });
  };
  
  

  const handleProfileSave = () => {
    updateUserProfile(localProfile);
  };
  const handleAddMealClick = () => {
    onAddMeal(dietPlan);
  };

  const getDietPlan = (metabolism, isLactoseIntolerant) => {
    // Ищем подходящий план. Если метаболизм пользователя выше всех значений в массиве, 
    // берём последний элемент массива
    const matchingPlan = dietPlans.find(plan => metabolism <= plan.metabolism) || dietPlans[dietPlans.length - 1];
  
    // Возвращаем соответствующую формулу, обрабатывая случаи, когда matchingPlan может быть undefined
    console.log("Диетплан ", matchingPlan)
    
    return matchingPlan ? (isLactoseIntolerant ? matchingPlan.formulaLactoseFree : matchingPlan.formula) : '';
  };
  // const handleProductGroupSelect = (group) => {
  //   onProductGroupSelect(group);
  // };

  const handleMacroSelect = (macro) => {
    // Здесь вы можете реализовать логику, которая будет
    // открывать модальное окно или перенаправлять на экран с информацией о выбранной группе продуктов
    console.log("Выбрана группа продуктов: ", macro);
    // Пример: setIsModalOpen(true); setSelectedGroup(macro);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Расчёт итогового метаболизма
    const finalMetabolism = calculateMetabolism({
      BM: userData.metabolism ? parseFloat(userData.metabolism) : 0,
      gender: userData.gender,
      weight: parseFloat(userData.weight),
      height: parseFloat(userData.height),
      age: parseFloat(userData.age),
      activityLevel: userData.activity,
      goal: "lose" // или другая цель, если она предусмотрена в вашем приложении
    });

    // // Получение формулы суточного рациона
    // const recommendedDietPlan = getDietPlan(finalMetabolism, isLactoseIntolerant);
    // setDietPlan(recommendedDietPlan);
    // setFinalMetabolism(finalMetabolism);

    console.log(`Recommended Diet Plan: ${recommendedDietPlan}`);
    if (!recommendedDietPlan) {
      console.error('No recommended diet plan was found.');
      // Handle the case when no diet plan is found, perhaps set a default or display a message
      setDietPlan('Default diet plan or a message indicating an error');
    } else {
      setDietPlan(recommendedDietPlan);
    }

    // Получение формулы суточного рациона
    const recommendedDietPlan = getDietPlan(finalMetabolism, isLactoseIntolerant);
    setDietPlan(recommendedDietPlan);
    setFinalMetabolism(finalMetabolism);
  };


  function calculateMetabolism(profile) {
    let BM, PM1, PM2, IM;
  
    if (profile.BM) {
      BM = profile.BM;
    } else {
      if (profile.gender === "male") {
        BM = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
      } else {
        BM = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
      }
    }
  
    if (BM <= 1400) {
      PM1 = 1400;
    } else if (BM > 1400 && BM <= 1500) {
      PM1 = BM;
    } else {
      PM1 = BM - 300;  // This subtracts 300 from BM if BM is above 1500
    }
  
    switch (profile.activityLevel) {
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
  
    if (profile.goal === "lose") {
      IM = PM2;
    } else if (profile.goal === "maintain") {
      IM = PM2 + 300;
    } else {
      IM = PM2;  // Assuming the default goal is to lose weight
    }
  
    // Здесь нужно добавить логику для расчета формулы суточного рациона на основе итогового метаболизма IM
    // Возвращаемая формула будет зависеть от вашей конкретной бизнес-логики
    console.log('Calculated Metabolism:');
    console.log(` ${IM}`);
    profile.metabolism = IM

    return ` ${IM}`;  // Возвращаем пример результата
  }
  
  const isMetabolismCalculated = !isNaN(finalMetabolism);

  return (
    <div className="MainScreen">
      <div className="profile-container">
        <div className="profile-image">
          {/* Это место для изображения пользователя, вы можете заменить следующую строку URL вашего изображения */}
          <img src="path_to_your_image" alt="Профиль" />
        </div>
        <h2>Имя из телеграма</h2> 
        {/* Замените "Имя из телеграма" на переменную, содержащую имя пользователя */}
      </div>

      <div className="info-container">
      <div>
        <label>
          Возраст:
          <input
            type="number"
            value={localProfile.age}
            onChange={(e) => handleLocalProfileChange('age', e.target.value)}
          />
        </label>
        <label>
          Вес:
          <input
            type="number"
            value={localProfile.weight}
            onChange={(e) => handleLocalProfileChange('weight', e.target.value)}
          />
        </label>
        <label>
          Рост:
          <input
            type="number"
            value={localProfile.height}
            onChange={(e) => handleLocalProfileChange('height', e.target.value)}
          />
        </label>
        {/* <button onClick={handleProfileSave}>Сохранить</button> */}
      </div>

      <select
        value={localProfile.activityLevel}
        onChange={(e) => handleLocalProfileChange('activityLevel', e.target.value)}
      >
        <option value="">Выберите уровень активности</option>
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
        {/* Добавьте дополнительные опции, если необходимо */}
      </select>
      <select
        value={localProfile.gender}
        onChange={(e) => handleLocalProfileChange('gender', e.target.value)}
      >
        <option value="">Выберите пол</option>
        <option value="male">Мужчина</option>
        <option value="female">Женщина</option>
        {/* Добавьте дополнительные опции, если необходимо */}
      </select>
      <select
        value={localProfile.dietRestriction}
        onChange={(e) => handleLocalProfileChange('dietRestriction', e.target.value)}
      >
        <option value="">Выберите ограничения по пище</option>
        <option value="none">Без ограничений</option>
        <option value="vegetarian">Вегетарианец</option>
        <option value="lactose_free">Без лактозы</option>
        <option value="gluten_free">Без глютена</option>
        {/* Добавьте дополнительные опции, если необходимо */}
      </select>
      </div>

      <div className="buttons-container">
         {/* <button onClick={onOpenFoodModal}>Выбор продуктов</button> */}
         {/* <button onClick={onOpenFoodSelection}>Внести прием пищи</button> */}
         <div className="diet-formula-container">
         {isMetabolismCalculated ? (
          <p>Ваш метаболизм: {finalMetabolism}</p>
        ) : (
          <p style={{ color: 'red' }}>Введите свои параметры для расчета метаболизма!</p>
        )}
        <p>Рекомендуемый рацион:</p>
        <div style={{ fontWeight: 'bold', fontSize: 'large' }}>
              { dietPlan.split('').map((macro, index) => (
                <span
                  key={index}
                  onClick={() => handleMacroSelect(macro)}
                  style={{ cursor: 'pointer', margin: '0 5px' }}
                >
                  {macro}
                </span>
              ))}
            </div>

      </div>
      
      <button onClick={onAddMeal}>Внести прием пищи</button>



      {/* </button> */}
        <button onClick={onOpenMetabolism} className="button">Мои параметры</button>
        {/* <button onClick={onOpenDiet} className="button">Мой рацион</button>  */}
      </div>
      {/* <AddMealScreen dailyDietFormula={dietPlan} /> */}
    </div>
  );
}

export default MainScreen;