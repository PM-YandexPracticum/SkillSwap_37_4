import React, { useState } from 'react';
import { SkillsButton } from './SkillsButton';

export const SkillsButtonExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log('Кнопка "Все навыки" нажата!');
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3>Примеры использования SkillsButton:</h3>
      
      {/* Базовый пример */}
      <div>
        <h4>Базовый пример:</h4>
        <SkillsButton onClick={handleClick} />
      </div>

      {/* С кастомным цветом */}
      <div>
        <h4>С кастомным цветом:</h4>
        <SkillsButton 
          color="#007bff" 
          onClick={handleClick}
        />
      </div>

      {/* С состоянием открытости */}
      <div>
        <h4>С состоянием открытости:</h4>
        <SkillsButton 
          color="#28a745"
          isOpen={isOpen}
          onClick={handleClick}
        />
      </div>

      {/* С кастомным текстом */}
      <div>
        <h4>С кастомным текстом:</h4>
        <SkillsButton 
          color="#dc3545"
          text="Выбрать категорию"
          onClick={handleClick}
        />
      </div>

      {/* С кастомным размером иконки */}
      <div>
        <h4>С кастомным размером иконки:</h4>
        <SkillsButton 
          color="#6f42c1"
          iconSize={32}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SkillsButtonExample;
