import classNames from 'classnames';
import { onClickHandler } from '../../functions';
import { Args } from '../../Types/Arguments';

interface Props extends Args {
  color: string;
  colorNameCondition: boolean;
}

export const Button: React.FC<Props> = ({
  name,
  color,
  colorNameCondition,
  sortField,
  currentValue,
  sortBy,
  isReversed,
  reverse,
}) => {
  return (
    <button
      type="button"
      className={classNames(`button ${color}`, {
        'is-light': colorNameCondition,
      })}
      onClick={() => {
        onClickHandler({
          name,
          sortField,
          currentValue,
          sortBy,
          isReversed,
          reverse,
        });
      }}
    >
      {name}
    </button>
  );
};
