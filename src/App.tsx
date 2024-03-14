import 'bulma/css/bulma.css';
import cn from 'classnames';

import { FC, useState } from 'react';
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
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

const getPreparedGoods = (
  goods: string[],
  sortField: string,
  reverseGoods: boolean,
) => {
  const prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseGoods) {
    prepareGoods.reverse();
  }

  return prepareGoods;
};

export const App: FC = () => {
  const [sortField, setSortField] = useState('');
  const [reverseGoods, setReverseGoods] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverseGoods,
  );

  const handleResetSort = () => {
    setSortField('');
    setReverseGoods(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseGoods(!reverseGoods)}
          type="button"
          className={cn('button is-warning', { 'is-light': !reverseGoods })}
        >
          Reverse
        </button>

        {(sortField || reverseGoods) && (
          <button
            onClick={() => handleResetSort()}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
