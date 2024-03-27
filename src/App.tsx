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
type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};
// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  // Sort and reverse goods if needed
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
// DON'T save goods to the state
// type State = {
//   isReversed: boolean,
//   sortType: SortType,
// };

export const App: React.FC = () => {
  const [order, setOrder] = React.useState<ReorderOptions>({
    sortType: SortType.NONE,
    isReversed: false,
  });

  const alphabeticalOrder = () =>
    setOrder({
      sortType: SortType.ALPHABET,
      isReversed: order.isReversed,
    });

  const orderByLength = () =>
    setOrder({ sortType: SortType.LENGTH, isReversed: order.isReversed });

  const reverseOrder = () =>
    setOrder({ sortType: order.sortType, isReversed: !order.isReversed });

  const reset = () =>
    setOrder({
      sortType: SortType.NONE,
      isReversed: false,
    });

  const beginningOrder = !order.isReversed && order.sortType === SortType.NONE;

  const goods = getReorderedGoods(goodsFromServer, order);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is info ${order.sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={alphabeticalOrder}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is success ${order.sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={orderByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is warning ${order.isReversed === true ? '' : 'is-light'} `}
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
