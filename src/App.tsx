import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

function sortAlphabetically(array: string[]) {
  return [...array].sort();
}

function sortByLength(array: string[]) {
  return [...array].sort((a, b) => a.length - b.length);
}

export const App: React.FC = () => {
  const [list, setList] = useState(goodsFromServer);
  const [activeButton, setActiveButton] = useState<string>('');
  const [isReversed, setIsReversed] = useState(false);

  const isListChanged = () => {
    return JSON.stringify(list) !== JSON.stringify(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setList(sortAlphabetically(list));
            setActiveButton('alphabetical');
          }}
          className={`button is-info ${activeButton === 'alphabetical' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeButton === 'length' ? '' : 'is-light'}`}
          onClick={() => {
            setList(sortByLength(list));
            setActiveButton('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            setList([...list].reverse());
            setIsReversed(!isReversed);
          }}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {isListChanged() && (
          <button
            type="button"
            onClick={() => {
              setList(goodsFromServer);
              setActiveButton('');
              setIsReversed(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {list.map(element => {
          return (
            <li key={element} data-cy="Good">
              {element}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
