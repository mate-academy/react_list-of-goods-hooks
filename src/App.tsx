import React, { useState } from 'react';
import clasNam from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { ProductList } from './component/ProductList/productList';

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
  start,
  ByName = 'alphabetically',
  ByLength = 'length',
}

enum Reverse {
  no,
  yes = 'reverse',
}

function getSortedGoods(
  list: string[],
  sortProduct: SortType,
  reverse: Reverse,
): string[] {
  const newGoodList = [...list];

  if (sortProduct !== SortType.start) {
    newGoodList.sort((poz1, poz2) => {
      switch (sortProduct) {
        case SortType.ByName:
          return poz1.localeCompare(poz2);

        case SortType.ByLength:
          return poz1.length - poz2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse === Reverse.yes) {
    newGoodList.reverse();
  }

  return newGoodList;
}

export const App: React.FC = () => {
  const [sortProduct, setSortProduct] = useState<SortType>(SortType.start);
  const [reverse, setReverse] = useState<Reverse>(Reverse.no);

  const visibleProduct = getSortedGoods(goodsFromServer, sortProduct, reverse);

  const coincidence =
    visibleProduct.length === goodsFromServer.length &&
    visibleProduct.every((g, i) => g === goodsFromServer[i]);

  const handleSortByName = () => setSortProduct(SortType.ByName);
  const handleSortByLength = () => setSortProduct(SortType.ByLength);
  const handleToggleReverse = () =>
    setReverse(prev => (prev === Reverse.no ? Reverse.yes : Reverse.no));
  const handReset = () => {
    setSortProduct(SortType.start);
    setReverse(Reverse.no);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={clasNam('button is-info', {
            'is-light': sortProduct !== SortType.ByName,
          })}
          onClick={handleSortByName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={clasNam('button is-success', {
            'is-light': sortProduct !== SortType.ByLength,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={clasNam('button is-warning', {
            'is-light': reverse !== Reverse.yes,
          })}
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {!coincidence && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handReset}
          >
            Reset
          </button>
        )}
      </div>

      <ProductList products={visibleProduct} />
    </div>
  );
};
