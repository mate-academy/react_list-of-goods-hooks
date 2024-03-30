import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

type SortTypes = 'Sort alphabetically' | 'Sort by length' | null;

interface SortButton {
  id: number;
  name: 'Sort alphabetically' | 'Sort by length';
}

const sortButtons: SortButton[] = [
  { id: 1, name: 'Sort alphabetically' },
  { id: 2, name: 'Sort by length' },
];

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortTypes>(null);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);

  useEffect(() => {
    const goods = [...goodsFromServer];

    if (sortType === 'Sort alphabetically') {
      goods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'Sort by length') {
      goods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      goods.reverse();
    }

    setVisibleGoods(goods);
  }, [sortType, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        {sortButtons.map(button => (
          <button
            key={button.id}
            type="button"
            onClick={() => setSortType(button.name)}
            className={classNames(
              'button',
              { 'is-success': button.name === 'Sort by length' },
              { 'is-info': button.name === 'Sort alphabetically' },
              { 'is-light': sortType !== button.name },
            )}
          >
            {button.name}
          </button>
        ))}
        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': isReversed !== true,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortType(null);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((item, index) => (
          <li key={`${index}-${item}`} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
