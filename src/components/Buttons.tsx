import React from 'react';
import classNames from 'classnames';
import { ButtonProps, SortType } from '../types';

export const Buttons: React.FC<ButtonProps> = (
  { state, setState, goodsFromServer },
) => {
  function reverseIfRequired(array: string[]): string[] {
    return state.isReverse ? array.reverse() : array;
  }

  function reverseGoods(): void {
    setState(prevState => ({
      ...prevState,
      isReverse: !prevState.isReverse,
      visibleGoods: [...prevState.visibleGoods].reverse(),
    }));
  }

  function sortByLength(): void {
    const sortedVisibleGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    setState(prevState => ({
      ...prevState,
      sortField: SortType.Length,
      visibleGoods: reverseIfRequired(sortedVisibleGoods),
    }));
  }

  function sortByAlphabet(): void {
    const sortedVisibleGoods = [...goodsFromServer]
      .sort((a, b) => a.localeCompare(b));

    setState(prevState => ({
      ...prevState,
      sortField: SortType.Alphabet,
      visibleGoods: reverseIfRequired(sortedVisibleGoods),
    }));
  }

  function resetGoods(): void {
    setState({
      isReverse: false,
      sortField: SortType.Default,
      visibleGoods: [...goodsFromServer],
    });
  }

  return (
    <div>
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': state.sortField !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': state.sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverseGoods}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': state.isReverse !== true,
          })}
        >
          Reverse
        </button>

        {(state.sortField || state.isReverse) && (
          <button
            onClick={resetGoods}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

    </div>
  );
};
