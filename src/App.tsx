import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

type GoodsFromServer = {
  id: number;
  val: string;
};

type GoodsList = GoodsFromServer[];

const goodsFromServer: string[] = [
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
  'default',
  'alpabet',
  'length',
}

function getGoods(goodsFromServList: string[]): GoodsList {
  return goodsFromServList.map((str, index) => ({ id: index, val: str }));
}

function prepGoods(goods: GoodsList, oper: SortBy, revOp: boolean): GoodsList {
  let tempArr = getGoods(goodsFromServer);

  if (oper === 0) {
    return revOp ? tempArr.reverse() : tempArr;
  }

  tempArr = goods.sort((g1: GoodsFromServer, g2: GoodsFromServer) => {
    switch (oper) {
      case 1:
        return g1.val.localeCompare(g2.val);
      case 2:
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

  const visGoods = prepGoods(getGoods(goodsFromServer), sortBy, rev);
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
