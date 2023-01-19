import React from 'react';
import cn from 'classnames';

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
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  if (sortType) {
    visibleGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

type State = {
  isReversed: boolean,
  sortType: SortType,
};

export class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    isReversed: false,
    sortType: SortType.NONE,
  };

  handleAlphabeticSort = () => {
    this.setState({ sortType: SortType.ALPHABET });
  };

  handleLengthSort = () => {
    this.setState({ sortType: SortType.LENGTH });
  };

  handleReverse = () => {
    this.setState((state) => ({
      isReversed: !state.isReversed,
    }));
  };

  handleReset = () => {
    this.setState({
      isReversed: false,
      sortType: SortType.NONE,
    });
  };

  render() {
    const {
      isReversed,
      sortType,
    } = this.state;

    const visibleGoods = getReorderedGoods(
      goodsFromServer,
      this.state,
    );

    return (
      <div className="section content">
        <div className="buttons">
          <button
            onClick={this.handleAlphabeticSort}
            type="button"
            className={cn(
              'button',
              'is-info',
              { 'is-light': sortType !== SortType.ALPHABET },
            )}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={this.handleLengthSort}
            className={cn(
              'button',
              'is-success',
              { 'is-light': sortType !== SortType.LENGTH },
            )}
          >
            Sort by length
          </button>

          <button
            type="button"
            onClick={this.handleReverse}
            className={cn(
              'button',
              'is-warning',
              { 'is-light': !isReversed },
            )}
          >
            Reverse
          </button>

          {(isReversed || sortType !== SortType.NONE) && (
            <button
              type="button"
              onClick={this.handleReset}
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}

        </div>

        <ul>
          {visibleGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
