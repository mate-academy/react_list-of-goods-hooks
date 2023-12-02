import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

enum SortType {
  DEFAULT = 'NONE',
  ALPHABET = 'ALPHABET',
  LENGTH = 'LENGTH',
}

type State = {
  isReversed: boolean
  sortType: SortType
};

export const App: React.FC = () => {
  const [state, setState] = useState<State>({
    isReversed: false,
    sortType: SortType.DEFAULT,
  });

  let listOfGoods = [...goodsFromServer];

  const baseButtonClass = 'button';

  const sortAlphabetically = () => {
    setState((prevState) => ({
      ...prevState,
      sortType: SortType.ALPHABET,
    }));
  };

  const sortByLength = () => {
    setState((prevState) => ({
      ...prevState,
      sortType: SortType.LENGTH,
    }));
  };

  const reverseSort = () => {
    setState((prevState) => ({
      ...prevState,
      isReversed: !prevState.isReversed,
    }));
  };

  const reset = () => {
    listOfGoods = [...goodsFromServer];
    setState((prevState) => ({
      ...prevState,
      sortType: SortType.DEFAULT,
      isReversed: false,
    }));
  };

  const addReset = () => {
    for (let i = 0; i < goodsFromServer.length; i += 1) {
      if (listOfGoods[i] !== goodsFromServer[i]) {
        return (
          <button
            type="button"
            className={classNames(baseButtonClass, 'is-danger', {
              'is-light': state.sortType !== 'LENGTH',
            })}
            onClick={reset}
          >
            Reset
          </button>
        );
      }
    }

    return (
      <></>
    );
  };

  if (state.sortType === 'NONE') {
    listOfGoods = [...goodsFromServer];
  } else if (state.sortType === 'ALPHABET') {
    listOfGoods = [...goodsFromServer].sort();
  } else if (state.sortType === 'LENGTH') {
    listOfGoods = [...goodsFromServer]
      .sort((el, el2) => (el.length - el2.length));
  }

  if (state.isReversed) {
    listOfGoods = listOfGoods.reverse();
  }

  return (

    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(baseButtonClass, 'is-info', {
            'is-light': state.sortType !== 'ALPHABET',
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(baseButtonClass, 'is-success', {
            'is-light': state.sortType !== 'LENGTH',
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(baseButtonClass, 'is-warning', {
            'is-light': !state.isReversed,
          })}
          onClick={reverseSort}
        >
          Reverse
        </button>

        {addReset()}
      </div>

      <ul>
        {listOfGoods.map((element) => (
          <li data-cy="Good" key={element}>{element}</li>
        ))}
      </ul>

    </div>
  );
};
