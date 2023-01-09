import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

  visibleGoods.sort((goodA, goodB) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return goodA.localeCompare(goodB);

      case SortType.LENGTH:
        return goodA.length - goodB.length;

      default:
        return 0;
    }
  });

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

  handleSort = (SortOption: SortType) => {
    switch (SortOption) {
      case SortType.ALPHABET:
        this.setState({ sortType: SortType.ALPHABET });
        break;

      case SortType.LENGTH:
        this.setState({ sortType: SortType.LENGTH });
        break;

      default:
        break;
    }
  };

  handleReverse = () => {
    this.setState(state => ({
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
    const { isReversed, sortType } = this.state;

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={cn(`button is-info ${sortType !== SortType.ALPHABET ? 'is-light' : ''}`)}
            onClick={() => this.handleSort(SortType.ALPHABET)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn(`button is-success ${sortType !== SortType.LENGTH ? 'is-light' : ''}`)}
            onClick={() => this.handleSort(SortType.LENGTH)}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn(`button is-warning ${!isReversed ? 'is-light' : ''}`)}
            onClick={() => this.handleReverse()}
          >
            Reverse
          </button>

          {(sortType !== SortType.NONE || isReversed) && (
            <button
              type="button"
              className={cn('button is-danger is-light')}
              onClick={() => this.handleReset()}
            >
              Reset
            </button>
          )}
        </div>

        <ul>
          {getReorderedGoods(goodsFromServer, { sortType, isReversed })
            .map(good => <li key={good} data-cy="Good">{ good }</li>)}
        </ul>
      </div>
    );
  }
}
