import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
enum Cases {
  Abc = 'abc',
  Length = 'length',
  Reverse = 'reverse',
  EmptyString = '',
}

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

export const App: React.FC = () => {
  const [sort, setSort] = useState<string[]>([...goodsFromServer]);
  const [reverse, setReverse] = useState<boolean>(false);
  const [active, setActive] = useState<string>('');

  const handleSort = (good: Cases): void => {
    let newSort: string[];

    switch (good) {
      case Cases.Abc:
        if (reverse) {
          newSort = [...sort].sort((a, b) => b.localeCompare(a));
          setActive(good);
        } else {
          newSort = [...sort].sort((a, b) => a.localeCompare(b));
          setActive(good);
        }

        break;
      case Cases.Length:
        if (reverse) {
          newSort = [...sort].sort((a, b) => b.length - a.length);
          setActive(good);
        } else {
          newSort = [...sort].sort((a, b) => a.length - b.length);
          setActive(good);
        }

        break;
      case Cases.Reverse:
        if (active === Cases.Abc || active === Cases.Length) {
          setReverse(!reverse);
        } else if (active === Cases.Reverse) {
          setReverse(!reverse);
          setActive('');
        } else {
          setReverse(!reverse);
          setActive(Cases.Reverse);
        }

        newSort = [...sort].reverse();
        break;
      default:
        setActive('');
        setReverse(false);
        newSort = [...goodsFromServer];
    }

    setSort(newSort);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${(active !== 'abc' ? 'is-light' : '') || (active !== 'abc' && reverse) ? 'is-light' : ''}`}
          onClick={() => handleSort(Cases.Abc)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${(active !== 'length' ? 'is-light' : '') || (active !== 'length' && reverse) ? 'is-light' : ''}`}
          onClick={() => handleSort(Cases.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
          onClick={() => handleSort(Cases.Reverse)}
        >
          Reverse
        </button>
        {active && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleSort(Cases.EmptyString)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sort.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
