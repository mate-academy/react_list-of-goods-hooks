import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [isReversed, changeReverse] = useState(false);
  const [type, setType] = useState(SortType.NONE);

  const visibleGoods = [...goodsFromServer];

  switch (type) {
    case SortType.ALPHABET:
      visibleGoods.sort((g1, g2) => (
        g1.localeCompare(g2)
      ));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((g1, g2) => (
        g1.length - g2.length
      ));

      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setType(SortType.ALPHABET)}
          type="button"
          className={cn('button is-info', { // Якщо цей код буде перевіряти Назар, сподіваюсь буде 0/3 сумних Назарів і після апрува буде мотивація жити це життя
            'is-light': type !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setType(SortType.LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': type !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => (changeReverse(!isReversed))}
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {(isReversed || type !== SortType.NONE) && (
          <button
            onClick={() => {
              changeReverse(false);
              setType(SortType.NONE);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
