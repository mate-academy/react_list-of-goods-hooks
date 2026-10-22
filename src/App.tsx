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
];

enum SortType {
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  REVERSE = 'reverse',
}

export const App: React.FC = () => {
  const [list, setList] = useState<string[]>(goodsFromServer);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const compareByLength = (a: string, b: string) => {
    if (a.length < b.length) {
      return -1;
    } else if (a.length > b.length) {
      return 1;
    }

    return 0;
  };

  const compareByAlphabet = (a: string, b: string) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }

    return 0;
  };

  const sortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
    setList(list.toSorted(compareByAlphabet));
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
    setList(list.toSorted(compareByLength));
  };

  const reverse = () => {
    setSortType(SortType.REVERSE);
    setList(list.toReversed());
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setList(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={() => {
            sortByAlphabet();
            setIsVisible(true);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => {
            sortByLength();
            setIsVisible(true);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortType === SortType.REVERSE ? '' : 'is-light'}`}
          onClick={() => {
            reverse();
            setIsVisible(true);
          }}
        >
          Reverse
        </button>

        {isVisible &&
          <button
            type="button"
            className={"button is-danger is-light"}
            onClick={() => {
              reset();
              setIsVisible(false);
            }}

          >
            Reset
          </button>
        }
      </div>

      <ul>
        {list.map(element => (
          <li data-cy="Good" key={element}>
            {element}
          </li>
        ))}
      </ul>
    </div>
  );
};
