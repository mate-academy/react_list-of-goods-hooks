import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { List } from './List';
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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<string | null>(null);
  const [reversed, setReversed] = useState(false);

  const list = useMemo(() => {
    const sortedList = [...goodsFromServer];

    if (sortType === 'alphabetical') {
      sortedList.sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'length') {
      sortedList.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      sortedList.reverse();
    }

    return sortedList;
  }, [sortType, reversed]);

  const handleReset = () => {
    setSortType(null);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            sortType === 'alphabetical' ? '' : 'is-light',
          )}
          onClick={() => {
            setSortType('alphabetical');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            sortType === 'length' ? '' : 'is-light',
          )}
          onClick={() => {
            setSortType('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            reversed ? '' : 'is-light',
          )}
          onClick={() => {
            setReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {(sortType || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <List items={list} />
    </div>
  );
};
