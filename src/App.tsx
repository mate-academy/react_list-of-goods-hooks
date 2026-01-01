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

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);
  const [isReverseGoods, setIsReverseGoods] = useState(false);

  const getSortGoods = (fieldSort: string) => {
    setSortField(fieldSort);
    const sortedGoods = [...goodsFromServer];

    if (fieldSort === 'alphabet') {
      sortedGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
    }

    if (fieldSort === 'length') {
      sortedGoods.sort((goodA, goodB) => goodA.length - goodB.length);
    }

    if (isReverseGoods) {
      sortedGoods.reverse();
    }

    setVisibleGoods(sortedGoods);
  };

  const resetGoods = () => {
    setSortField('');
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
            ${sortField === 'alphabet' ? '' : 'is-light'}
          `}
          onClick={() => getSortGoods('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`
            button is-success
            ${sortField === 'length' ? '' : 'is-light'}
          `}
          onClick={() => getSortGoods('length')}
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
