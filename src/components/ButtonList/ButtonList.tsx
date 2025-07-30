import React from 'react';
import { buttonsSchema } from '../../model/Buttons.model';
import { Button } from '../Button/Button';

export const ButtonList: React.FC = () => {
  return (
    <div className="buttons">
      {buttonsSchema.map(button => {
        return <Button key={button.id} button={button} />;
      })}
    </div>
  );
};
