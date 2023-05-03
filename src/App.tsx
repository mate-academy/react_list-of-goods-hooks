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

enum SortType {
  LENGTH = 'length',
  ALPHABET = 'alphabet',
  RESET = 'reset',
}
export const App: React.FC = () => {
  const [type, setType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const { LENGTH, ALPHABET, RESET } = SortType;

  const setList = (goods : string[]) => {
    const visibleGoods = [...goods];

    switch (type) {
      case ALPHABET:
        visibleGoods.sort((a, b) => a.localeCompare(b));
        break;
      case LENGTH:
        visibleGoods.sort((a, b) => a.length - b.length);
        break;
      case RESET:
        return [...goods];
      default:
        break;
    }

    if (isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const resetHendler = () => {
    setIsReversed(false);
    setType('');
  };

  const goods = setList(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${type === ALPHABET ? '' : 'is-light'}`}
          onClick={() => setType(ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${type === LENGTH ? '' : 'is-light'}`}
          onClick={() => setType(LENGTH)}
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
            onClick={resetHendler}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
