import React from 'react';
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

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return g1.localeCompare(g2);
      case SortType.LENGTH:
        return g1.length - g2.length;
      default:
        return 0;
    }
  });

  return isReversed ? visibleGoods.reverse() : visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = React.useState(false);
  const [sortType, setSortType] = React.useState(SortType.NONE);

  const sortByName = () => setSortType(SortType.ALPHABET);

  const sortByLength = () => setSortType(SortType.LENGTH);

  const reverse = () => setIsReversed(!isReversed);

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons is-flex is-centered">
        <button
          onClick={sortByName}
          type="button"
          className={`button is-outlined is-success is-rounded ${sortType !== SortType.ALPHABET && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-rounded is-danger is-outlined ${sortType !== SortType.LENGTH && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={`button is-rounded is-black is-outlined ${!isReversed && 'is-light'}`}
        >
          Reverse
        </button>

        {(sortType || isReversed)
          ? (
            <button
              type="button"
              className="button is-rounded is-ghost is-outlined"
              onClick={reset}
            >
              Reset
            </button>
          )
          : ''}
      </div>
      <div className="is-flex is-justify-content-center">
        <div className="has-text-centered">
          {(getReorderedGoods(goodsFromServer, sortType, isReversed))
            .map(good => {
              return (
                <div>
                  <div
                    data-cy="Good"
                    key={good}
                    className="box column is-info is-rounded mb-3"
                  >
                    {good}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
