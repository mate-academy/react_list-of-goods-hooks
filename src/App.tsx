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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];
  let sortedGoods: string[] = [];

  if (sortType === SortType.NONE) {
    sortedGoods = [...visibleGoods];
  } else if (sortType === SortType.LENGTH) {
    sortedGoods = [...visibleGoods].sort((a, b) => a.length - b.length);
  } else if (sortType === SortType.ALPHABET) {
    sortedGoods = [...visibleGoods].sort((a, b) => a.localeCompare(b));
  }

  if (isReversed === true) {
    sortedGoods = sortedGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return sortedGoods;
}

type State = {
  isReversed: boolean;
  sortType: SortType;
};

export class App extends React.Component {
  state: State = {
    isReversed: false,
    sortType: SortType.NONE,
  };

  sortAlphabetically = () => {
    this.setState({ sortType: SortType.ALPHABET });
  };

  sortByLength = () => {
    this.setState({ sortType: SortType.LENGTH });
  };

  reverseGoods = () => {
    this.setState({ isReversed: !this.state.isReversed });
  };

  resetGoods = () => {
    this.setState({ isReversed: false, sortType: SortType.NONE });
  };

  render() {
    const { isReversed, sortType } = this.state;

    const sortedGoods: string[] = getReorderedGoods(goodsFromServer, {
      sortType,
      isReversed,
    });

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={`button is-success ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
            onClick={this.sortAlphabetically}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
            onClick={this.sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={`button is-success ${isReversed === true ? '' : 'is-light'}`}
            onClick={this.reverseGoods}
          >
            Reverse
          </button>

          {(isReversed === true || sortType !== SortType.NONE) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={this.resetGoods}
            >
              Reset
            </button>
          )}
        </div>

        <ul>
          {sortedGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
