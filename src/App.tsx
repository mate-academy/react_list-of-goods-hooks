import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

type Field = 'alphabetically' | 'length' | 'reverse';

function sort(goods: string[], field: Field, isReversed: boolean) {
  const sortedGoods = [...goods];

  sortedGoods.sort((g1, g2) => {
    switch (field) {
      case 'alphabetically':
        return isReversed ? g2.localeCompare(g1) : g1.localeCompare(g2);
      case 'length':
        return isReversed ? g2.length - g1.length : g1.length - g2.length;
      default:
        return 0;
    }
  });

  if (field === 'reverse') {
    return sortedGoods.reverse();
  }

  return sortedGoods;
}

interface ActiveBut {
  alp: boolean;
  len: boolean;
  rev: boolean;
}

function resetIsVisible(activeButtons: ActiveBut) {
  const c1 = activeButtons.alp === true;
  const c2 = activeButtons.len === true;
  const c3 = activeButtons.rev === true;

  return c1 || c2 || c3;
}

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const defaultState = {
    alp: false,
    len: false,
    rev: false,
  };
  const [activeButtons, setActiveButtons] = useState(defaultState);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': !activeButtons.alp,
          })}
          onClick={() => {
            if (activeButtons.alp) {
              return;
            }

            setGoods(sort(goods, 'alphabetically', activeButtons.rev));
            setActiveButtons({ ...activeButtons, alp: true, len: false });
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': !activeButtons.len,
          })}
          onClick={() => {
            if (activeButtons.len) {
              return;
            }

            setGoods(sort(goods, 'length', activeButtons.rev));
            setActiveButtons({ ...activeButtons, len: true, alp: false });
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !activeButtons.rev,
          })}
          onClick={() => {
            // setGoods([...goods].reverse());
            setGoods(sort(goods, 'reverse', activeButtons.rev));
            setActiveButtons({ ...activeButtons, rev: !activeButtons.rev });
          }}
        >
          Reverse
        </button>
        {resetIsVisible(activeButtons) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoods(goodsFromServer);
              setActiveButtons(defaultState);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
