import React, { useState } from 'react';
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
  const [isReverse, setReverse] = useState(false);
  const [sortType, setSortType] = useState('');

  const renderListGoods = (
    listGoods: string[],
    reverse: boolean,
    type: string,
  ) => {
    const copyList = [...listGoods];

    if (type === 'alpha') {
      copyList.sort((a, b) => a.localeCompare(b));
    } else if (type === 'length') {
      copyList.sort((a, b) => a.length - b.length);
    }

    return reverse ? copyList.reverse() : copyList;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== 'alpha' ? 'is-light' : ''}`}
          onClick={() => setSortType('alpha')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success  ${sortType !== 'length' ? 'is-light' : ''}`}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning  ${!isReverse ? 'is-light' : ''}`}
          onClick={() => setReverse(!isReverse)}
        >
          Reverse
        </button>

        {isReverse || sortType ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        ) : ''}
      </div>

      <ul>
        {renderListGoods(goodsFromServer, isReverse, sortType)
          .map((el: string) => {
            return <li data-cy="Good">{el }</li>;
          })}
      </ul>
    </div>
  );
};
