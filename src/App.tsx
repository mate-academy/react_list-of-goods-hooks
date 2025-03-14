import 'bulma/css/bulma.css';
import { useState } from 'react';
import './App.scss';

enum SortType {
  Alphabetically = 'alphabetically',
  Length = 'length',
  Reverse = 'reverse'
}

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
];

export const App: React.FC = () => {
  const [goods, setGoods] = useState<SortType | undefined>();
  const [reverse, setReverse] = useState(false);

  let sortedGoods: string[] = [];

  if (goods && goods !== SortType.Reverse) {
    sortedGoods = [...goodsFromServer].sort((goods1, goods2) => {
      switch (goods) {
        case SortType.Alphabetically:
          return goods1.localeCompare(goods2);
        case SortType.Length:
          return goods1.length - goods2.length;
        default:
          return 0;
      }
    });
  } else if (!goods) {
    sortedGoods = [...goodsFromServer];
  }

  if (reverse) {
    sortedGoods = [...sortedGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${goods === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => {
            setGoods(SortType.Alphabetically);
            setReverse(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${goods === SortType.Length ? '' : 'is-light'}`}
          onClick={() => {
            setGoods(SortType.Length);
            setReverse(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
          onClick={() => setReverse(prevReverse => !prevReverse)}
        >
          Reverse
        </button>

        {goods && (
          <button
            type="button"
            className={`button is-danger ${!goods ? '' : 'is-light'}`}
            onClick={() => {
              setGoods(undefined);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
