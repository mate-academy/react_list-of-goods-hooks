import { Component } from 'react';
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
  ALPHABETICALLY = 'ALPHABETICALLY',
  BY_LENGTH = 'BY_LENGTH',
  REVERSE = 'REVERSE',
  NONE = 'NONE',
}

interface AppState {
  goods: string[];
  sortType: SortType | null;
  isReversed: boolean;
}

export class App extends Component<{}, AppState> {
  state: AppState = {
    goods: [...goodsFromServer],
    sortType: null,
    isReversed: false,
  };

  sortAlphabetically = (): void => {
    const { isReversed } = this.state;
    const sortedGoods = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    this.setState({
      goods: isReversed ? sortedGoods.reverse() : sortedGoods,
      sortType: SortType.ALPHABETICALLY,
      // Don't reset isReversed here to maintain the reverse state
    });
  };

  sortByLength = (): void => {
    const { isReversed } = this.state;
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    this.setState({
      goods: isReversed ? sortedGoods.reverse() : sortedGoods,
      sortType: SortType.BY_LENGTH,
      // Don't reset isReversed here to maintain the reverse state
    });
  };

  reverse = (): void => {
    const { goods, isReversed } = this.state;

    this.setState({
      goods: [...goods].reverse(),
      isReversed: !isReversed,
    });
  };

  reset = (): void => {
    this.setState({
      goods: [...goodsFromServer],
      sortType: null,
      isReversed: false,
    });
  };

  render() {
    const { goods, sortType, isReversed } = this.state;
    const isModified = sortType !== null || isReversed;

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={`button is-info ${
              sortType === SortType.ALPHABETICALLY ? '' : 'is-light'
            }`}
            onClick={this.sortAlphabetically}
            data-cy="SortAlphabetically"
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={`button is-success ${
              sortType === SortType.BY_LENGTH ? '' : 'is-light'
            }`}
            onClick={this.sortByLength}
            data-cy="SortByLength"
          >
            Sort by length
          </button>

          <button
            type="button"
            className={`button is-warning ${isReversed ? '' : 'is-light'}`}
            onClick={this.reverse}
            data-cy="Reverse"
          >
            Reverse
          </button>

          {isModified && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={this.reset}
              data-cy="Reset"
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
  }
}
