import { buttonsSchema } from '../../model/Buttons.model';
import { Button } from '../Button/Button';

export const ButtonList = () => {
  return (
    <div className="buttons">
      {buttonsSchema.map(button => {
        return <Button key={button.id} button={button} />;
      })}
    </div>
  );
};
