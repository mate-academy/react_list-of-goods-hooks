import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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

export enum SortType {
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

interface AppState {
  isReversed: boolean;
  sortType: SortType;
}

export class App extends React.Component<{}, AppState> {
  state: AppState = {
    isReversed: false,
    sortType: SortType.DEFAULT,
  };

  getSortedGoods = (goods: string[]): string[] => {
    const { sortType, isReversed } = this.state;
    const sortedGoods = [...goods];

    if (sortType === SortType.ALPHABET) {
      sortedGoods.sort();
    } else if (sortType === SortType.LENGTH) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  sortByAlphabet = (): void => {
    this.setState({ sortType: SortType.ALPHABET });
  };

  sortByLength = (): void => {
    this.setState({ sortType: SortType.LENGTH });
  };

  reverseGoods = (): void => {
    this.setState(prevState => ({ isReversed: !prevState.isReversed }));
  };

  resetGoods = (): void => {
    this.setState({ sortType: SortType.DEFAULT, isReversed: false });
  };

  render() {
    const goods = this.getSortedGoods(goodsFromServer);
    const { sortType, isReversed } = this.state;
    const isChanged = sortType !== SortType.DEFAULT || isReversed;

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
            onClick={this.sortByAlphabet}
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
            className={`button is-warning ${isReversed ? '' : 'is-light'}`}
            onClick={this.reverseGoods}
          >
            Reverse
          </button>

          {isChanged && (
            <button
              type="button"
              className="button is-danger"
              onClick={this.resetGoods}
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

export default App;
