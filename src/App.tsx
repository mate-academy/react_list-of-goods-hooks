import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
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

enum SortType {
  Alphabeth = 'alphabet',
  Length = 'length',
}

function getPrepearedGoods(
  goods: string[],
  sortField: string,
  isReversed:boolean,
) {
  const prepearedGoods = [...goods];

  prepearedGoods.sort((a, b) => {
    switch (sortField) {
      case SortType.Alphabeth:
        return a.localeCompare(b);
      case SortType.Length:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPrepearedGoods(
    goodsFromServer, sortField, isReversed,
  );

  const reverse = () => (
    setIsReversed(prevIsReversed => !prevIsReversed)
  );

  function makeSetSortField(field: SortType) {
    return () => setSortField(field);
  }

  const reset = () => {
    const isResetButton = sortField !== '' || isReversed;

    return isResetButton;
  };

  const resetButton = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button is-info',
              { 'is-light': sortField !== SortType.Alphabeth },
            )
          }
          onClick={makeSetSortField(SortType.Alphabeth)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button is-success',
              { 'is-light': sortField !== SortType.Length },
            )
          }
          onClick={makeSetSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={reverse}
        >
          Reverse
        </button>

        {reset() && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetButton}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
