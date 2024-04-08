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
  SORT_ALPHABETICALLY = 'alphabetically',
  SORT_BY_LENGTH = 'length',
}

export function getReorderedGoods(
  goods: string[],
  isReversed: boolean,
  sortType: string,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.SORT_ALPHABETICALLY:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.SORT_BY_LENGTH:
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
  const [type, setType] = React.useState('');

  const [reverse, setReverse] = React.useState(false);

  const alphabeticalOrder = () => {
    setType(SortType.SORT_ALPHABETICALLY);
  };

  const orderByLength = () => setType(SortType.SORT_BY_LENGTH);

  const reverseOrder = () => setReverse(!reverse);

  const reset = () => {
    setType('');
    setReverse(false);
  };

  const goods = getReorderedGoods(goodsFromServer, reverse, type);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is info ${type === SortType.SORT_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={alphabeticalOrder}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is success ${type === SortType.SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={orderByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is warning ${reverse === true ? '' : 'is-light'} `}
          onClick={reverseOrder}
        >
          Reverse
        </button>
        {(type || reverse) && (
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
