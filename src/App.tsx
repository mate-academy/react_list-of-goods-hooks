import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  NONE,
  ALPHABET,
  LENGTH,
}

interface ObjectTypes {
  values: SortType;
  reverses: boolean;
}

export const App: React.FC = () => {
  const [value, setValue] = useState<SortType>(SortType.NONE);
  const [reverse, setReverse] = useState(false);

  function getVisibleGoods(goods: string[], { values, reverses }: ObjectTypes) {
    const copy = [...goods];

    copy.sort((item1: string, item2: string): number => {
      switch (values) {
        case SortType.ALPHABET:
          return item1.localeCompare(item2);
        case SortType.LENGTH:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });

    if (reverses) {
      copy.reverse();
    }

    return copy;
  }

  const visibleGoods = getVisibleGoods(goodsFromServer, {
    values: value,
    reverses: reverse,
  });

  function Reset() {
    setValue(SortType.NONE);
    setReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': value !== SortType.ALPHABET,
          })}
          onClick={() => setValue(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': value !== SortType.LENGTH,
          })}
          onClick={() => setValue(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reverse })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(value !== SortType.NONE || reverse === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={Reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(item => (
            <li data-cy="Good" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
