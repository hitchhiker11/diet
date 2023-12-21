import React, { useState } from 'react';
import FoodSelection from './FoodSelection';
import './App.css'
const FoodModal = ({
  isOpen,
  onClose,
  onSave,
  products, // Ensure this prop is correctly passed and is not undefined
  userRestrictions
}) => {
  console.log(`FoodModal render called, isOpen: ${isOpen}`);

  // Make sure to handle the case where `products` might not be defined
  const [selectedGroup, setSelectedGroup] = useState(products ? Object.keys(products)[0] : null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Navigate to the next or previous group
  const navigateGroup = (direction) => {
    if (!products) return; // Guard against undefined products
    
    const groupKeys = Object.keys(products);
    const currentIndex = groupKeys.indexOf(selectedGroup);
    const nextIndex = (currentIndex + direction + groupKeys.length) % groupKeys.length;
    setSelectedGroup(groupKeys[nextIndex]);
  };

  const handleSave = () => {
    onSave(selectedProduct);
    onClose();
  };


  if (!isOpen || !products) return null; // Guard against undefined products

  return (
    <div className={isOpen ? "food-modal open" : "food-modal"}>

    <div className="food-modal">
      {/* Modal Content */}
      <div className="modal-content">
        {/* Group Navigation */}
        <div className="modal-header">
          {selectedGroup && <button onClick={() => navigateGroup(-1)}>←</button>}
          <h3>{selectedGroup}</h3>
          {selectedGroup && <button onClick={() => navigateGroup(1)}>→</button>}
        </div>
        {/* Food Selection */}
        {selectedGroup && (
          <FoodSelection
            selectedGroup={selectedGroup}
            products={products}
            onSelectProduct={setSelectedProduct}
            userRestrictions={userRestrictions}
          />
        )}
        {/* Footer with Save and Cancel */}
        <div className="modal-footer">
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
    </div>
  );
};


export default FoodModal;
