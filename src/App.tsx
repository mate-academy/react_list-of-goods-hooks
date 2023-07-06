import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classnames from 'classnames';

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
  ALPABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.LENGTH:
        return a.length - b.length;

      case SortType.ALPABET:
        return a.localeCompare(b);

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setType] = useState(SortType.NONE);

  const reverseGoods = () => {
    setReverse(prev => !prev);
  };

  const sortGoodsByLength = () => {
    setType(SortType.LENGTH);
  };

  const sortGoodsAlpha = () => {
    setType(SortType.ALPABET);
  };

  const reset = () => {
    setReverse(false);
    setType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames({
            button: true,
            'is-info': true,
            'is-light': sortType !== SortType.ALPABET,
          })}
          onClick={sortGoodsAlpha}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortGoodsByLength}
          className={classnames({
            button: true,
            'is-success': true,
            'is-light': sortType !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames({
            button: true,
            'is-warning': true,
            'is-light': !isReversed,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
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
        {getReorderedGoods(goodsFromServer, { sortType, isReversed })
          .map(good => (
            <li
              key={good}
              data-cy="Good"
            >
              {good}
            </li>
          ))}
      </ul>
    </div>
  );
};
