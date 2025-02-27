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

type GoodListProps = {
  goods: string[];
};

export const GoodList = ({ goods }: GoodListProps) => {
  return (
    <ul>
      {goods.map((good: string) => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  );
};

enum SortType {
  SORT_ALPHABETICELY = 'alphabet',
  SORT_BY_LENGTH = 'length',
  SORT_REVERSED = 'reverse',
  RESET = 'reset',
}

export const App: React.FC = () => {
  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [buttonPressed, setButtonPressed] = useState(SortType.RESET);
  const [buttonReversed, setButtonReversed] = useState('');

  const sortGoods = (type: string) => {
    const copy = [...sortedGoods];

    switch (type) {
      case SortType.SORT_ALPHABETICELY:
        copy.sort((good1, good2) => good1.localeCompare(good2));
        if (buttonReversed === SortType.SORT_REVERSED) {
          copy.reverse();
        }

        break;
      case SortType.SORT_BY_LENGTH:
        copy.sort((a, b) => {
          if (a.length !== b.length) {
            return a.length - b.length;
          }

          return a.localeCompare(b);
        });
        if (buttonReversed === SortType.SORT_REVERSED) {
          copy.reverse();
        }

        break;
      default:
        return copy;
    }

    setButtonPressed(type);
    setSortedGoods(copy);

    return copy;
  };

  const sortToReverse = (type: string) => {
    const copy = [...sortedGoods];

    if (type === SortType.SORT_REVERSED) {
      copy.reverse();
    }

    if (buttonReversed === '') {
      setButtonReversed(type);
    } else if (buttonReversed === SortType.SORT_REVERSED) {
      setButtonReversed('');
    }

    setSortedGoods(copy);

    return copy;
  };

  const resetGoods = () => {
    setSortedGoods([...goodsFromServer]);
    setButtonPressed(SortType.RESET);
    setButtonReversed('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            buttonPressed === SortType.SORT_ALPHABETICELY
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            sortGoods(SortType.SORT_ALPHABETICELY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            buttonPressed === SortType.SORT_BY_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            sortGoods(SortType.SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            buttonReversed === SortType.SORT_REVERSED
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={() => {
            sortToReverse(SortType.SORT_REVERSED);
          }}
        >
          Reverse
        </button>

        {buttonPressed === SortType.RESET && buttonReversed === '' ? (
          ''
        ) : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              resetGoods();
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={sortedGoods} />
    </div>
  );
};
