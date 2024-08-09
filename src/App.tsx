import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortField {
  Alpha = 'alpha',
  Length = 'Length',
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
  const [sortField, setSortField] = useState<SortField | ''>('');
  const [reversed, setReversed] = useState<boolean>(false);
  const elems = [...goodsFromServer];

  if (sortField) {
    elems.sort((elem1: string, elem2: string) => {
      switch (sortField) {
        case SortField.Alpha:
          return elem1.localeCompare(elem2);
        case SortField.Length:
          return elem1.length - elem2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    elems.reverse();
  }

  const handleReset = () => {
    setSortField('');
    setReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortField.Alpha
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(SortField.Alpha)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortField.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SortField.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setReversed(!reversed)}
        >Reverse</button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
          Reset
        </button>
        )}
      </div>

      <ul>
        <ul>
          {elems.map(elem => (
            <li data-cy="Good" key={elem}>
              {elem}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
