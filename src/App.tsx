import './App.scss';
import React from 'react';
import 'bulma/css/bulma.css';
import classNames from 'classnames';

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

function getReorderedGoods(
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

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
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
          className={classNames({
            'button is-outlined is-success is-rounded':
              sortType === SortType.ALPHABET,
            'button is-outlined is-success is-rounded is-light':
              sortType !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={classNames({
            'button is-outlined is-danger is-rounded':
              sortType === SortType.LENGTH,
            'button is-outlined is-danger is-rounded is-light':
              sortType !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={classNames({
            'button is-outlined is-black is-rounded': isReversed,
            'button is-outlined is-black is-rounded is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortType || isReversed)
          && (
            <button
              type="button"
              className="button is-rounded is-ghost is-outlined"
              onClick={reset}
            >
              Reset
            </button>
          )}
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
