import React, { useState } from 'react';
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
  SORT_BY_ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
  DEFAULT_VALUE = '',
}

export const App: React.FC = () => {
  const [selectedGoods, setSelectedGoods] = useState<SortType>(
    SortType.DEFAULT_VALUE,
  );
  const [reversed, setReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  visibleGoods.sort((a, b) => {
    switch (selectedGoods) {
      case SortType.SORT_BY_ALPHABETICALLY:
        return a.localeCompare(b);
      case SortType.LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${SortType.SORT_BY_ALPHABETICALLY === selectedGoods ? '' : 'is-light'}`}
          onClick={() => setSelectedGoods(SortType.SORT_BY_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${SortType.LENGTH === selectedGoods ? '' : 'is-light'}`}
          onClick={() => setSelectedGoods(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(selectedGoods || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSelectedGoods(SortType.DEFAULT_VALUE);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <GoodList goods={visibleGoods} />
      </ul>
    </div>
  );
};
