import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  Reverse = 'reverse',
  Reset = 'reset',
}

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
  const [goods, setGoods] = useState(goodsFromServer);
  const [actSort, setActSort] = useState(false);

  const [alphabetMod, setAlphabetMod] = useState(false);
  const [lengthMod, setLengthMod] = useState(false);
  const [resetMod, setResetMod] = useState(false);

  function handleSort(type: SortType) {
    const clonedGoods = [...goods];

    setResetMod(true);

    switch (type) {
      case SortType.Alphabet:
        clonedGoods.sort((good1, good2) => {
          return good1.localeCompare(good2);
        });
        if (actSort) {
          clonedGoods.reverse();
        }

        setGoods(clonedGoods);
        setAlphabetMod(true);
        setLengthMod(false);
        break;

      case SortType.Length:
        clonedGoods.sort((good1, good2) => {
          const lengthDiff = good1.length - good2.length;

          if (lengthDiff !== 0) {
            return lengthDiff;
          }

          return good1.localeCompare(good2);
        });
        if (actSort) {
          clonedGoods.reverse();
        }

        setGoods(clonedGoods);
        setAlphabetMod(false);
        setLengthMod(true);
        break;

      case SortType.Reverse:
        setGoods(clonedGoods.reverse());
        setActSort(prev => !prev);
        if (actSort === true) {
          setResetMod(false);
        }

        break;

      case SortType.Reset:
        setGoods([...goodsFromServer]);
        setResetMod(false);
        setActSort(false);
        setAlphabetMod(false);
        setLengthMod(false);
        break;
    }
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-warning ${!alphabetMod ? 'is-light' : ''}`}
          onClick={() => {
            handleSort(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-warning ${!lengthMod ? 'is-light' : ''}`}
          onClick={() => {
            handleSort(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!actSort ? 'is-light' : ''}`}
          onClick={() => {
            handleSort(SortType.Reverse);
          }}
        >
          Reverse
        </button>

        {resetMod && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              handleSort(SortType.Reset);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
