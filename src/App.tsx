import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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

enum SortBy {
  Name = 'name',
  Length = 'length',
  Default = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortBy,
  isReversed: boolean,
) {
  const prepearedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortBy.Name: (
        prepearedGoods.sort((goods1, goods2) => (
          goods1.localeCompare(goods2)
        ))
      );
        break;

      case SortBy.Length: (
        prepearedGoods.sort((goods1, goods2) => (
          goods1.length - goods2.length
        ))
      );
        break;

      default:
        return prepearedGoods;
    }
  }

  if (isReversed) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortBy.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReversed,
  );

  const isSortFieldReversed = sortField || isReversed;

  const handleResetClick = () => {
    setSortField(SortBy.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortBy.Name })}
          onClick={() => setSortField(SortBy.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortBy.Length })}
          onClick={() => setSortField(SortBy.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': isReversed === false })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {isSortFieldReversed && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleResetClick()}
          >
            Reset
          </button>
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
