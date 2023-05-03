import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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
  const [type, setType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const setList = (goods : string[]) => {
    const visibleGoods = [...goods];

    switch (type) {
      case 'alphabet':
        visibleGoods.sort((a, b) => a.localeCompare(b));
        break;
      case 'length':
        visibleGoods.sort((a, b) => a.length - b.length);
        break;
      case 'reset':
        return [...goods];
      default:
        break;
    }

    if (isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${type === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => setType('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${type === 'length' ? '' : 'is-light'}`}
          onClick={() => setType('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(isReversed || type) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setType('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {setList(goodsFromServer).map(good => <li data-cy="Good">{good}</li>)}
        </ul>
      </ul>
    </div>
  );
};
