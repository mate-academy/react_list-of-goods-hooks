import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { GoodList } from './components/GoodList';

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
  isReversed: boolean,
  sortType: SortType;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    { isReversed, sortType },
  );

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={classNames(
              'button',
              'is-info',
              { 'is-light': sortType !== SortType.ALPHABET },
            )}
            onClick={() => setSortType(SortType.ALPHABET)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={classNames(
              'button',
              'is-info',
              { 'is-light': sortType !== SortType.LENGTH },
            )}
            onClick={() => setSortType(SortType.LENGTH)}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={classNames(
              'button',
              'is-warning',
              { 'is-light': !isReversed },
            )}
            onClick={() => setIsReversed(!isReversed)}
          >
            Reverse
          </button>

          {((sortType !== SortType.NONE) || (isReversed)) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortType(SortType.NONE);
                setIsReversed(false);
              }}
            >
              Reset
            </button>
          )}
        </div>

        <GoodList goods={visibleGoods} />
      </div>
    </>
  );
};
