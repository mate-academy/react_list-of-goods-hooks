import React from 'react';
import { buttonsSchema } from '../../model/Buttons.model';
import { Button } from '../Button/Button';
import { TButton } from '../../types/TButton';

type Props = {
  button: TButton;
};

export const ButtonList: React.FC<Props> = () => {
  return (
    <div className="buttons">
      {buttonsSchema.map(button => {
        return <Button key={button.id} button={button} />;
      })}
    </div>
  );
};
