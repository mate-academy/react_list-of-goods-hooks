import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.LENGTH:
        return good1.length - good2.length;

      case SortType.ALPHABET:
        return good1.localeCompare(good2);

      default:
        return SortType.NONE;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

// DON'T save goods to the state
// type State = {
//   isReversed: boolean,
//   sortType: SortType,
// };

export class App extends React.Component<{}, ReorderOptions> {
  state = {
    sortType: SortType.NONE,
    isReversed: false,
  };

  alphabeticSort = () => {
    this.setState({ sortType: SortType.ALPHABET });
  };

  lengthSort = () => {
    this.setState({ sortType: SortType.LENGTH });
  };

  resetSort = () => {
    this.setState({
      sortType: SortType.NONE,
      isReversed: false,
    });
  };

  reversed = () => {
    this.setState((prevState) => ({
      isReversed: !prevState.isReversed,
    }));
  };

  render() {
    const { sortType, isReversed } = this.state;
    const visibleGoods = getReorderedGoods(
      goodsFromServer, { sortType, isReversed },
    );

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={classNames(
              'button is-info',
              {
                'is-light': sortType !== SortType.ALPHABET,
              },
            )}
            onClick={this.alphabeticSort}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={classNames(
              'button is-success',
              {
                'is-light': sortType !== SortType.LENGTH,
              },
            )}
            onClick={this.lengthSort}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={classNames(
              'button is-warning',
              {
                'is-light': isReversed !== true,
              },
            )}
            onClick={this.reversed}
          >
            Reverse
          </button>

          {(sortType !== SortType.NONE || isReversed) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={this.resetSort}
            >
              Reset
            </button>
          )}
        </div>

        <ul>
          <ul>
            {visibleGoods.map((good) => (
              <li data-cy="Good" key={good}>
                {good}
              </li>
            ))}
          </ul>
        </ul>
      </div>
    );
  }
}
