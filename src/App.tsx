import React, { useState } from 'react';
import cn from 'classnames';
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
  Alphabetically = 'alphabetically',
  Length = 'length',
  Reverse = 'reverse',
  None = '',
}

export const App: React.FC = () => {
  const [select, setSelect] = useState('');
  const [isReversed, setReversed] = useState(false);

  const sortMethod = () => {
    let res = [...goodsFromServer];

    switch (select) {
      case SortType.Alphabetically:
        res = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
        break;
      case SortType.Length:
        res = [...goodsFromServer].sort((a, b) => a.length - b.length);
        break;
      case SortType.Reverse:
        return res.reverse();
      default:
        res = [...goodsFromServer];
    }

    if (isReversed) {
      res = res.reverse();
    }

    return res;
  };

  const Reset = () => {
    if (select !== SortType.None || isReversed) {
      return (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setSelect(SortType.None);
            setReversed(false);
          }}
        >
          Reset
        </button>
      );
    }

    return null;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': select !== SortType.Alphabetically })}
          onClick={() => {
            setSelect(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': select !== SortType.Length })}
          onClick={() => {
            setSelect(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
          onClick={() => {
            setReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        <Reset />
      </div>

      <ul>
        {
          sortMethod().map(item => <li data-cy="Good" key={item}>{item}</li>)
        }
      </ul>
    </div>
  );
};
