import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

enum SortDirection {
  Alph = 'is-info',
  Len = 'is-success',
  Rev = 'is-warning',
}

export const goodsFromServer = [
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

export const buttons = [
  {
    name: 'Sort alphabetically',
    class: 'is-info',
  },
  {
    name: 'Sort by length',
    class: 'is-success',
  },
];

export const sortList = (
  goods: string[],
  sort: SortDirection | string,
  reverse: boolean,
) => {
  const allGoods = [...goods];

  if (sort) {
    allGoods.sort((good1, good2) => {
      switch (sort) {
        case SortDirection.Alph:
          return good1.localeCompare(good2);

        case SortDirection.Len:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    allGoods.reverse();
  }

  return allGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState('');
  const [direction, setDirection] = useState(false);

  const preparedGoods = sortList(goodsFromServer, sortBy, direction);

  const reset = () => {
    setSortBy('');
    setDirection(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map(button => (
          <button
            type="button"
            key={button.class}
            className={cn(
              'button',
              `${button.class}`, {
                'is-light': sortBy !== button.class,
              },
            )}
            onClick={() => setSortBy(button.class)}
          >
            {button.name}
          </button>
        ))}

        <button
          type="button"
          className={cn(
            'button is-warning', {
              'is-light': !direction,
            },
          )}
          onClick={() => {
            setDirection(!direction);
          }}
        >
          Reverse
        </button>

        {(sortBy !== '' || direction) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(item => (
          <li
            data-cy="Good"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
