import React from 'react';
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
  return (
    <div className="section content">
      <div className="buttons">
        <button type="button" className="button is-info is-light">
          Sort alphabetically
        </button>

        <button type="button" className="button is-success is-light">
          Sort by length
        </button>

        <button type="button" className="button is-warning is-light">
          Reverse
        </button>

        <button type="button" className="button is-danger is-light">
          Reset
        </button>
      </div>

      <ul>
        <ul>
          <li data-cy="Good">Dumplings</li>
          <li data-cy="Good">Carrot</li>
          <li data-cy="Good">Eggs</li>
          <li data-cy="Good">Ice cream</li>
          <li data-cy="Good">Apple</li>
          <li data-cy="Good">...</li>
        </ul>
      </ul>
    </div>
  );
};
