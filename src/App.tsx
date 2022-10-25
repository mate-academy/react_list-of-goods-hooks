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

const getGoods = (sortBy:string, isReversed:boolean) => {
  const copyGoods = [...goodsFromServer];

  switch (sortBy) {
    case 'length':
      copyGoods.sort((good1, good2) => (
        good1.length - good2.length
      ));
      break;
    case 'alphabet':
      copyGoods.sort((good1, good2) => (
        good1.localeCompare(good2)
      ));
      break;

    default:
      break;
  }

  return isReversed
    ? copyGoods.reverse()
    : copyGoods;
};

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('');
  const visibleGoods = getGoods(sortBy, isReversed);

  const sortAlphabetically = () => {
    setSortBy('alphabet');
  };

  const sortByLength = () => {
    setSortBy('length');
  };

  const changeReverse = () => {
    setIsReversed(isReverted => !isReverted);
  };

  const resetState = () => {
    setIsReversed(false);
    setSortBy('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortBy !== 'alphabet' && 'is-light'
          }`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortBy !== 'length' && 'is-light'
          }`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            isReversed === false && 'is-light'
          }`}
          onClick={changeReverse}
        >
          Reverse
        </button>

        {
          (isReversed || sortBy)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetState}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))
        }
      </ul>
    </div>
  );
};
