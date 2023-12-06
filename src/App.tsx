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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

export const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortState, setSortState] = useState({
    isUsable: false,
    isAlphabetActive: false,
    isLengthActive: false,
    isReverseActive: false,
  });

  function getReorderedGoods({ sortType, isReversed }: ReorderOptions) {
    const visibleGoods = [...goods];
    let updatedGoods: string[] = [];

    if (isReversed && sortType === SortType.NONE) {
      setSortState((prevState) => ({
        ...prevState,
        isReverseActive: !prevState.isReverseActive,
      }));

      if (!sortState.isAlphabetActive && !sortState.isLengthActive) {
        setSortState((prevState) => ({
          ...prevState,
          isUsable: !prevState.isUsable,
        }));
      }

      updatedGoods = [...visibleGoods].reverse();
    } else {
      switch (sortType) {
        case SortType.ALPHABET:
          setSortState({
            isUsable: true,
            isAlphabetActive: true,
            isLengthActive: false,
            isReverseActive: isReversed,
          });
          updatedGoods = [...visibleGoods].sort(
            (a: string, b: string) => a.localeCompare(b),
          );
          break;
        case SortType.LENGTH:
          setSortState({
            isUsable: true,
            isAlphabetActive: false,
            isLengthActive: true,
            isReverseActive: isReversed,
          });
          updatedGoods = [...visibleGoods].sort((a: string, b: string) => {
            const lengthDifference = a.length - b.length;

            if (lengthDifference !== 0) {
              return lengthDifference;
            }

            return a.localeCompare(b);
          });
          break;
        case SortType.NONE:
          setSortState({
            isUsable: false,
            isAlphabetActive: false,
            isLengthActive: false,
            isReverseActive: false,
          });
          updatedGoods = [...goodsFromServer];
          break;
        default:
          break;
      }

      if (isReversed && sortType !== SortType.NONE) {
        updatedGoods = updatedGoods.reverse();
      }
    }

    setGoods(updatedGoods);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortState.isAlphabetActive
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={() => getReorderedGoods({
            sortType: SortType.ALPHABET,
            isReversed: sortState.isReverseActive,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortState.isLengthActive
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={() => getReorderedGoods({
            sortType: SortType.LENGTH,
            isReversed: sortState.isReverseActive,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={sortState.isReverseActive
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={() => getReorderedGoods({
            sortType: SortType.NONE,
            isReversed: true,
          })}
        >
          Reverse
        </button>

        {sortState.isUsable && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => getReorderedGoods(
              { sortType: SortType.NONE, isReversed: false },
            )}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
