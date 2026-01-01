import React from 'react';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/GoodList/GoodList';

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
  none = '',
  alphabet = 'alphabet',
  length = 'length'
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.none);
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);
  const [isReverseGoods, setIsReverseGoods] = useState(false);

  const getSortGoods = (fieldSort: SortType) => {
    setSortField(fieldSort);
    const sortedGoods = [...goodsFromServer];

    if (fieldSort === SortType.alphabet) {
      sortedGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
    }

    if (fieldSort === SortType.length) {
      sortedGoods.sort((goodA, goodB) => goodA.length - goodB.length);
    }

    if (isReverseGoods) {
      sortedGoods.reverse();
    }

    setVisibleGoods(sortedGoods);
  };

  const resetGoods = () => {
    setSortField(SortType.none);
    setIsReverseGoods(false);
    setVisibleGoods([...goodsFromServer]);
  };

  const reverseGoods = () => {
    setIsReverseGoods(prev => !prev);
    setVisibleGoods(prev => [...prev].reverse());
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`
            button is-info
            ${sortField === SortType.alphabet ? '' : 'is-light'}
          `}
          onClick={() => getSortGoods(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`
            button is-success
            ${sortField === SortType.length ? '' : 'is-light'}
          `}
          onClick={() => getSortGoods(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`
            button is-warning
            ${isReverseGoods === true ? '' : 'is-light'}
          `}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {JSON.stringify(visibleGoods) !== JSON.stringify(goodsFromServer) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
