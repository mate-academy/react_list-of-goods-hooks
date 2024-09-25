import { useState } from 'react';
import classNames from 'classnames';
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
  Default = '',
  Length = 'length',
  Alphabet = 'alphabet',
}

const prepareGoods = (sortType: SortType, isReversed: boolean): string[] => {
  const sortedGoods = [...goodsFromServer];

  if (sortType) {
    sortedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const resetAll = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  const isResetButtonVisible = sortType || isReversed;

  const goodsList = prepareGoods(sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.Alphabet)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.Length)}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(prev => !prev)}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            onClick={resetAll}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

