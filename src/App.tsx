import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  Reverse = 'reverse',
}

interface Button {
  title: string,
  value: string,
  className: string,
}

const buttons: Button[] = [
  {
    title: 'Sort alphabetically',
    value: SortType.Alphabet,
    className: 'is-info',
  },
  {
    title: 'Sort by length',
    value: SortType.Length,
    className: 'is-success',
  },
  {
    title: 'Reverse',
    value: SortType.Reverse,
    className: 'is-warning',
  },
];

const getPreparedGoods = (
  goods: string[],
  sortField: SortType[keyof SortType],
  isReversed: boolean,
): string[] => {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SortType.Alphabet:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.Length:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map(button => (
          <button
            key={button.value}
            type="button"
            className={cn('button', button.className, {
              'is-light':
                button.value === SortType.Reverse
                  ? !isReversed
                  : button.value !== sortField,
            })}
            onClick={() => {
              if (button.value === SortType.Reverse) {
                setIsReversed(!isReversed);
              } else {
                setSortField(button.value);
              }
            }}
          >
            {button.title}
          </button>
        ))}

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
