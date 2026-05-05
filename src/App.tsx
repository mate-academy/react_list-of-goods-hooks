import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

export const goodsFromServer: string[] = [
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
  None = '',
  Alphabetically = 'alphabetically',
  ByLength = 'length',
}

export const App = () => {
  const [filter, setFilter] = useState<SortType>(SortType.None);
  const [reverseGoods, setReverseGoods] = useState<boolean>(false);

  function getSortedGoods(goods: string[]): string[] {
    const sortedGoods = [...goods];

    sortedGoods.sort((a, b) => {
      switch (filter) {
        case SortType.Alphabetically:
          return a.localeCompare(b);
        case SortType.ByLength:
          return a.length - b.length;
        default:
          return 0;
      }
    });

    return reverseGoods ? sortedGoods.reverse() : sortedGoods;
  }

  const sortedGoodsArr: string[] = getSortedGoods(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': filter !== SortType.Alphabetically,
          })}
          onClick={() => {
            setFilter(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': filter !== SortType.ByLength,
          })}
          onClick={() => {
            setFilter(SortType.ByLength);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reverseGoods,
          })}
          onClick={() => {
            setReverseGoods(!reverseGoods);
          }}
        >
          Reverse
        </button>

        {(filter !== '' || reverseGoods) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setFilter(SortType.None);
              setReverseGoods(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoodsArr.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
