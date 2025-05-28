import 'bulma/css/bulma.css';
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

enum SortBy {
  ALPHABET = 'alphabetical',
  LENGTH = 'length',
}

const preparedGoods = (goods: string[], sortBy: SortBy, isReverse: boolean) => {
  const copyGoods = [...goods];

  switch (sortBy) {
    case SortBy.ALPHABET:
      copyGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortBy.LENGTH:
      copyGoods.sort(
        (firstGood, secondGood) => firstGood.length - secondGood.length,
      );
      break;
    default:
      break;
  }

  if (isReverse) {
    copyGoods.reverse();
  }

  return copyGoods;
};

export const App: React.FC = () => {
  const [goodsType, setGoodsType] = useState<SortBy | null>(null);
    const [isReverse, setIsReversed] = useState(false);

    const visibleGoods = preparedGoods(goodsFromServer, goodsType, isReverse);

    const handleSortedByAlph = () => {
      setGoodsType(SortBy.ALPHABET);
    };

    const handleSortedByLength = () => {
      setGoodsType(SortBy.LENGTH);
    };

    const handleReversed = () => {
      setIsReversed(!isReverse);
    };

    const handleReset = () => {
      setGoodsType(null);
      setIsReversed(false);
    };

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={`button is-info ${goodsType === SortBy.ALPHABET ? '' : 'is-light'}`}
            onClick={handleSortedByAlph}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={`button is-success ${goodsType === SortBy.LENGTH ? '' : 'is-light'}`}
            onClick={handleSortedByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={`button is-warning ${isReverse ? '' : 'is-light'}`}
            onClick={handleReversed}
          >
            Reverse
          </button>

          {(goodsType !== null || isReverse === true) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleReset}
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
          {visibleGoods.length < goodsFromServer.length && (
            <li data-cy="Good">...</li>
          )}
        </ul>
      </div>
    );
};
