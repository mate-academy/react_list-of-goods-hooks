import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { List } from './List';

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
  const [sort, setSort] = useState('');
  const [reversed, setReversed] = useState(false);
  const [reset, setReset] = useState(false);
  const list = useMemo(() => {
    const sortedList = [...goodsFromServer];

    if (sort === 'alphabeticaly') {
      sortedList.sort((a, b) => a.localeCompare(b));
    } else if (sort === 'length') {
      sortedList.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      sortedList.reverse();
    }

    return sortedList;
  }, [sort, reversed]);

  const handleReset = () => {
    setReversed(false);
    setSort('');
    setReset(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={() => {
            setSort('alphabeticaly');
            setReset(true);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => {
            setSort('length');
            setReset(true);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={() => {
            setReversed(!reversed);
            setReset(true);
          }}
        >
          Reverse
        </button>

        {reset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              handleReset();
            }}
          >
            Reset
          </button>
        )}
      </div>

      <List items={list} />
    </div>
  );
};
