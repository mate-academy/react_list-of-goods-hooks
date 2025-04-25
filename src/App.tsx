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
  Default = 'default',
  Alphabetically = 'alphabetically',
  Length = 'length',
  Reversed = 'reversed',
}

type State = {
  goods: string[];
  sortOrder: SortType;
  reset: boolean;
};

export class App extends React.Component<{}, State> {
  originalGoods: string[] = [...goodsFromServer];

  state: State = {
    goods: [...goodsFromServer],
    sortOrder: SortType.Default,
    reset: false,
  };

  sortAlphabetically = () => {
    this.setState(prevState => ({
      goods: [...prevState.goods].sort(),
      sortOrder: SortType.Alphabetically,
      reset: true,
    }));
  };

  sortByLength = () => {
    this.setState(prevState => ({
      goods: [...prevState.goods].sort((a, b) => a.length - b.length),
      sortOrder: SortType.Length,
      reset: true,
    }));
  };

  reverseOrder = () => {
    this.setState(prevState => ({
      goods: [...prevState.goods].reverse(),
      sortOrder: SortType.Reversed,
      reset: true,
    }));
  };

  resetOrder = () => {
    this.setState({
      goods: [...this.originalGoods],
      sortOrder: SortType.Default,
      reset: false,
    });
  };

  render() {
    const { goods, sortOrder, reset } = this.state;

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={`button is-info ${sortOrder === SortType.Alphabetically ? '' : 'is-light'}`}
            onClick={this.sortAlphabetically}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={`button is-success ${sortOrder === SortType.Length ? '' : 'is-light'}`}
            onClick={this.sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={`button is-warning ${sortOrder === SortType.Reversed ? '' : 'is-light'}`}
            onClick={this.reverseOrder}
          >
            Reverse
          </button>

          {reset && (
            <button
              type="button"
              className="button is-danger"
              onClick={this.resetOrder}
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
