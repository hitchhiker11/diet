// EditModal.js
import React, { useState } from 'react';

const EditModal = ({ field, onClose }) => {
  const [value, setValue] = useState('');

  const handleSave = () => {
    // Здесь должен быть код для сохранения изменений в состоянии или отправки их на сервер
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Редактировать field</h2>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
};

export default EditModal;
