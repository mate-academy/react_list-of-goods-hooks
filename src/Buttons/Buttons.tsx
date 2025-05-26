import { SortBy } from '../types/SortBy';
import React from 'react';
import cn from 'classnames';

interface Props {
  sortByElement: SortBy;
  reverseVisibleGoods: boolean;
  changeFilter: (sortBy: SortBy) => void;
  changeDirection: (isReverse: boolean) => void;
}

export const Buttons: React.FC<Props> = ({
  sortByElement,
  reverseVisibleGoods,
  changeFilter = () => {},
  changeDirection = () => {},
}) => {
  return (
    <div className="buttons">
      <button
        type="button"
        className={`button is-info ${cn({ 'is-light': sortByElement !== SortBy.Alphabet })}`}
        onClick={() => changeFilter(SortBy.Alphabet)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={`button is-success ${cn({ 'is-light': sortByElement !== SortBy.Length })}`}
        onClick={() => changeFilter(SortBy.Length)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={`button is-success ${cn({ 'is-light': !reverseVisibleGoods })}`}
        onClick={() => changeDirection(!reverseVisibleGoods)}
      >
        Reverse
      </button>

      {(sortByElement !== SortBy.Default || reverseVisibleGoods) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            changeFilter(SortBy.Default);
            changeDirection(false);
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};
