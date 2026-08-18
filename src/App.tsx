import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

enum SortType {
  alphabet = 'alphabet',
  length = 'length',
  default = '',
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

export const App = () => {
  const [sortType, setSortType] = useState<string>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const isOriginal = sortType === SortType.default && !isReversed;

  function getVisibleGoods(
    goods: string[],
    { sType, isRev }: { sType: string; isRev: boolean },
  ) {
    const visibleGoods = [...goods];

    if (sType === SortType.alphabet) {
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
    }

    if (sType === SortType.length) {
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
    }

    if (isRev) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  }

  const visibleGoods = getVisibleGoods(goodsFromServer, {
    sType: sortType,
    isRev: isReversed,
  });

  const sortAlphabetically = () => {
    setSortType(SortType.alphabet);
  };

  const sortByLength = () => {
    setSortType(SortType.length);
  };

  const reverse = () => {
    setIsReversed(current => !current);
  };

  const reset = () => {
    setSortType(SortType.default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={
            sortType === SortType.alphabet
              ? 'button is-info'
              : 'button is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={
            sortType === SortType.length
              ? 'button is-success'
              : 'button is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={isReversed ? 'button is-warning' : 'button is-light'}
        >
          Reverse
        </button>

        {!isOriginal && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
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
