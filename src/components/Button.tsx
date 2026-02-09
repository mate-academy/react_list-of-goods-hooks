import { Prop } from '../types/Prop';

export const Button = ({ classList, onChange, name }: Prop) => {
  return (
    <button type="button" className={classList} onClick={() => onChange()}>
      {name}
    </button>
  );
};
