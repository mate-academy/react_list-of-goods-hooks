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

const conditions = {
  alphabetically: 'goods',
  longer: 'length',
  conversely: 'reverse',
};

function sorted(food: string[], sortParam: string, other: boolean): string[] {
  const preparedFood = [...food];

  switch (sortParam) {
    case conditions.alphabetically:
      preparedFood.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case conditions.longer:
      preparedFood.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (other) {
    preparedFood.reverse();
  }

  return preparedFood;
}

export const App: React.FC = () => {
  const [selectedGood, setSelected] = useState('');
  const [IsReverse, setIsReverse] = useState(false);
  const visibleGoods = sorted(goodsFromServer, selectedGood, IsReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': selectedGood !== conditions.alphabetically,
          })}
          onClick={() => setSelected(conditions.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': selectedGood !== conditions.longer,
          })}
          onClick={() => setSelected(conditions.longer)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': IsReverse !== true,
          })}
          onClick={() => setIsReverse(!IsReverse)}
        >
          Reverse
        </button>

        {(selectedGood || IsReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReverse(false);
              setSelected('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => {
          return (
            <li data-cy="Good" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
