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
type TypeIsReversed = {
  isReversed: boolean;
};

type TypeSort = {
  sortType: number;
};

export function getReorderedGoods(
  goods: string[],
  { isReversed }: TypeIsReversed,
  { sortType }: TypeSort,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((a, b) => (a > b ? 1 : -1));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [type, setType] = React.useState({
    sortType: SortType.NONE,
  });

  const [reverse, setReverse] = React.useState({
    isReversed: false,
  });

  const alphabeticalOrder = () => setType({ sortType: SortType.ALPHABET });

  const orderByLength = () => setType({ sortType: SortType.LENGTH });

  const reverseOrder = () => setReverse({ isReversed: !reverse.isReversed });

  const reset = () => {
    setType({ sortType: SortType.NONE });
    setReverse({ isReversed: false });
  };

  const beginningOrder = !reverse.isReversed && type.sortType === SortType.NONE;

  const goods = getReorderedGoods(goodsFromServer, reverse, type);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is info ${type.sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={alphabeticalOrder}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is success ${type.sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={orderByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is warning ${reverse.isReversed === true ? '' : 'is-light'} `}
          onClick={reverseOrder}
        >
          Reverse
        </button>
        {!beginningOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
