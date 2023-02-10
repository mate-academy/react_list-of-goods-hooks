import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import Classname from 'classnames';

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

type ReorderOptions = {
  sortedBy: SortType;
  isReversed: boolean;
};

const getGoods = (
  goods: string[],
  { sortedBy, isReversed }: ReorderOptions,
) => {
  const visibleGoods = Array.from(goods);

  visibleGoods.sort((g1, g2) => {
    switch (sortedBy) {
      case SortType.ALPHABET:
        return g1.localeCompare(g2);
      case SortType.LENGTH:
        return g1.length - g2.length;
      default:
        return 0;
    }
  });
  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App: React.FC = () => {
  const [sortedBy, setSortedBy] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const visibleGoods = getGoods(
    goodsFromServer, { sortedBy, isReversed },
  );

  const handleSortButtons = (sortType: SortType) => () => {
    setSortedBy(sortType);
  };

  const handleResetButton = () => {
    setSortedBy(SortType.NONE);
    setIsReversed(false);
  };

  const handleReverseButton = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={Classname('button is-info', {
            'is-light': sortedBy !== SortType.ALPHABET,
          })}
          onClick={handleSortButtons(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={Classname('button is-success', {
            'is-light': sortedBy !== SortType.LENGTH,
          })}
          onClick={handleSortButtons(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={Classname('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverseButton}
        >
          Reverse
        </button>

        {(isReversed || sortedBy !== SortType.NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetButton}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(
          good => <li data-cy="Good" key={good}>{good}</li>,
        )}
      </ul>
    </div>
  );
};
