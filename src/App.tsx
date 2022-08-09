/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { v4 } from 'uuid';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const goodsFromServer: string[] = [
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
  ALPABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  // Not to mutate the original array
  const visibleGoods = [...goods];

  // Sort and reverse goods if needed
  switch (sortType) {
    case SortType.ALPABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    case SortType.NONE:
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      visibleGoods;
      break;

    default:
      throw new Error(`Case ${sortType} not found`);
  }

  return isReversed ? visibleGoods.reverse() : visibleGoods;
}

interface State {
  isStarted: boolean;
  isReversed: boolean;
  sortType: SortType;
}

const initialState = {
  isStarted: false,
  isReversed: false,
  sortType: SortType.NONE,
};

export const App: React.FC = () => {
  const [{ isStarted, isReversed, sortType }, setState]
    = useState<State>(initialState);

  const start = () =>
    setState((prevState) => ({ ...prevState, isStarted: true }));

  const reset = () => setState({ ...initialState, isStarted: true });

  const reverse = () =>
    setState((prevState) => ({
      ...prevState,
      isReversed: !isReversed,
    }));

  const sortByAlphabet = () =>
    setState((prevState) => ({
      ...prevState,
      sortType: SortType.ALPABET,
    }));

  const sortByLength = () =>
    setState((prevState) => ({
      ...prevState,
      sortType: SortType.LENGTH,
    }));

  const goodList = getReorderedGoods(goodsFromServer, sortType, isReversed);

  const formattedGoodList = goodList.map((good) => ({
    name: good,
    id: v4(),
  }));

  const buttons = [
    { value: 'Sort alphabetically', handler: sortByAlphabet },
    { value: 'Sort by length', handler: sortByLength },
    { value: 'Reverse', handler: reverse },
    { value: 'Reset', handler: reset },
  ].map((button) => ({
    ...button,
    id: v4(),
  }));

  const buttonListToRender = buttons.map(({ value, handler, id }) => (
    <button
      key={id}
      onClick={handler}
      className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      type="button"
    >
      {value}
    </button>
  ));

  return (
    <div className="App font-mono bg-stone-800 h-screen">
      {isStarted ? (
        <div className="container mx-auto p-35 text-center">
          {buttonListToRender}
          <ul className="Goods space-y-35">
            {formattedGoodList.map(({ name, id }) => (
              <li
                key={id}
                className="Goods__item hover:underline text-white text-xl"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button
          onClick={start}
          className="relative button inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          type="button"
        >
          <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-stone-800 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-white">
            Start
          </span>
        </button>
      )}
    </div>
  );
};
