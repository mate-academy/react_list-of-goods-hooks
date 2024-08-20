import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

type GoodsFromServer = {
  id: number;
  val: string;
};

type GoodsList = GoodsFromServer[];

enum SortBy {
  'default',
  'alpabet',
  'length',
}

function fetchGoods(): GoodsList {
  const rawData: string[] = [
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

  return rawData.map((str, index) => ({ id: index, val: str }));
}

function prepareGoods(
  goods: GoodsList,
  oper: SortBy,
  revOp: boolean,
): GoodsList {
  let tempArr;

  if (oper === SortBy.default) {
    tempArr = fetchGoods();

    return revOp ? tempArr.reverse() : tempArr;
  }

  tempArr = [...goods].sort((g1: GoodsFromServer, g2: GoodsFromServer) => {
    switch (oper) {
      case SortBy.alpabet:
        return g1.val.localeCompare(g2.val);
      case SortBy.length:
        return g1.val.length - g2.val.length;
      default:
        return 0;
    }
  });

  return revOp ? tempArr.reverse() : tempArr;
}

export const App = () => {
  const [sortBy, setSortBy] = useState<SortBy>(0);
  const [rev, setRev] = useState<boolean>(false);

  const visGoods = prepareGoods(fetchGoods(), sortBy, rev);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== 1,
          })}
          onClick={() => setSortBy(1)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== 2,
          })}
          onClick={() => setSortBy(2)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-danger', {
            'is-light': !rev,
          })}
          onClick={() => {
            setRev(!rev);
          }}
        >
          Reverse
        </button>

        {sortBy || rev ? (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortBy(0);
              setRev(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visGoods.map(good => (
          <li key={good.id} data-cy="Good">
            {good.val}
          </li>
        ))}
      </ul>
    </div>
  );
};
