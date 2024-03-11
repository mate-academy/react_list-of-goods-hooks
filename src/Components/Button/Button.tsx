import classNames from 'classnames';
import { SortOptions } from '../../Types/SortOptions';

interface Props {
  name: string;
  color: string;
  colorNameCondition: boolean;
  sortField: SortOptions;
  currentValue: SortOptions;
  sortBy: React.Dispatch<React.SetStateAction<SortOptions>>;
  reverseStatus: string;
  reverse: React.Dispatch<React.SetStateAction<string>>;
}

function checkSortField(oldValue: SortOptions, newValue: SortOptions) {
  return oldValue === newValue ? SortOptions.empty : newValue;
}

function checkReverseField(oldValue: string, newValue: string) {
  return oldValue === newValue ? '' : newValue;
}

export const Button: React.FC<Props> = ({
  name,
  color,
  colorNameCondition,
  sortField,
  currentValue,
  sortBy,
  reverseStatus,
  reverse,
}) => {
  return (
    <button
      type="button"
      className={classNames(`button ${color}`, {
        'is-light': colorNameCondition,
      })}
      onClick={() => {
        if (name === 'Reverse') {
          reverse(checkReverseField(reverseStatus, 'reverse'));
        } else if (name === 'Reset') {
          reverse('');
          sortBy(SortOptions.empty);
        } else {
          sortBy(checkSortField(sortField, currentValue));
        }
      }}
    >
      {name}
    </button>
  );
};
