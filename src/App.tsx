import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Good } from './Types/Good';
import { SortType } from './Types/SortType';

export const goodsFromServer: Good[] = [
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

type State = {
  goods: Good[];
  sortType: SortType;
  isReversed: boolean;
};

export class App extends React.Component<{}, State> {
  state: State = {
    goods: [...goodsFromServer],
    sortType: SortType.Reset,
    isReversed: false,
  };

  sortGoods = (type: SortType) => {
    if (type === SortType.Reverse) {
      // toggle reverse flag and apply to current ordering
      this.setState(prev => ({
        isReversed: !prev.isReversed,
        goods: [...prev.goods].reverse(),
      }));

      return;
    }

    let updated = [...goodsFromServer];

    if (type === SortType.Alphabet) {
      updated.sort((a, b) => a.localeCompare(b));
    } else if (type === SortType.Length) {
      updated.sort((a, b) => a.length - b.length);
    }

    if (this.state.isReversed) {
      updated = updated.reverse();
    }

    this.setState({ goods: updated, sortType: type });
  };

  reset = () => {
    this.setState({
      goods: [...goodsFromServer],
      sortType: SortType.Reset,
      isReversed: false,
    });
  };

  render() {
    const { goods, sortType, isReversed } = this.state;

    return (
      <div className="section">
        <h1 className="title" data-cy="Title">
          Goods
        </h1>

        <div className="buttons">
          <button
            data-cy="SortAlphabetically"
            onClick={() => this.sortGoods(SortType.Alphabet)}
            type="button"
            className={`button is-info ${sortType === SortType.Alphabet ? '' : 'is-light'}`}
          >
            Sort alphabetically
          </button>

          <button
            data-cy="SortByLength"
            onClick={() => this.sortGoods(SortType.Length)}
            type="button"
            className={`button is-info ${sortType === SortType.Length ? '' : 'is-light'}`}
          >
            Sort by length
          </button>

          <button
            data-cy="Reverse"
            onClick={() => this.sortGoods(SortType.Reverse)}
            type="button"
            className={`button is-info ${isReversed ? '' : 'is-light'}`}
          >
            Reverse
          </button>

          {!(sortType === SortType.Reset && !isReversed) && (
            <button
              data-cy="Reset"
              onClick={this.reset}
              type="button"
              className="button is-danger is-light"
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
