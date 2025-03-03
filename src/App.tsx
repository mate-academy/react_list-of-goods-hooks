import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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
  DEFAULT = 'DEFAULT',
  ALPHABETICAL = 'ALPHABETICAL',
  LENGTH = 'LENGTH',
  REVERSED = 'REVERSED',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);

  const sortGoods = (type: SortType) => {
    let sortedGoods = [...goods];

    switch (type) {
      case SortType.ALPHABETICAL:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.LENGTH:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
      case SortType.REVERSED:
        sortedGoods.reverse();
        break;
      case SortType.DEFAULT:
        sortedGoods = [...goodsFromServer];
        break;
    }

    setGoods(sortedGoods);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={() => sortGoods(SortType.ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => sortGoods(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={() => sortGoods(SortType.REVERSED)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => sortGoods(SortType.DEFAULT)}
        >
          Reset
        </button>
      </div>

      <ul>
        {goods.map((good, index) => (
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
