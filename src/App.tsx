import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { ButtonReset } from './components/ButtonReset';
import { ButtonReverse } from './components/ButtonReverse';

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
  alphabet = 'alphabet',
  length = 'length',
  default = '',
}

interface SortParams {
  sortField: SortType;
  reverseField: boolean;
}

function getPrepareGoods(
  goods: string[],
  { sortField, reverseField }: SortParams,
) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabet:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.default);
  const [reverseField, setReverseField] = useState(false);

  const hadleReset = () => {
    setSortField(SortType.default);
    setReverseField(false);
  };

  const handleSort = (sortType: SortType) => () => setSortField(sortType);

  const visibleGoods = getPrepareGoods(goodsFromServer,
    { sortField, reverseField });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortType.alphabet })}
          onClick={handleSort(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortType.length })}
          onClick={handleSort(SortType.length)}
        >
          Sort by length
        </button>

        <ButtonReverse
          onClick={() => setReverseField(!reverseField)}
          reverseField={reverseField}
        />

        {(sortField || reverseField) && (
          <ButtonReset onClick={hadleReset} />
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
