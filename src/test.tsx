enum SortType {
  NONE,
  ALPABET,
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
  const visibleGoods: string[] = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

      case SortType.NONE:
        return 0;

      default:
        throw new Error('Wrong value for SortType');
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

export class App extends Component<{}, State> {
  state: Readonly<State> = {
    isReversed: false,
    sortType: SortType.NONE,
  };

  sortByAlphabetButton = () => {
    this.setState({ sortType: SortType.ALPABET });
  };

  sortByLengthButton = () => {
    this.setState({ sortType: SortType.LENGTH });
  };

  reverseButton = () => {
    this.setState(state => ({
      isReversed: !state.isReversed,
    }));
  };

  resetButton = () => {
    this.setState({
      sortType: SortType.NONE,
      isReversed: false,
    });
  };

  render() {
    const { sortType, isReversed } = this.state;
    const resultGoods = getReorderedGoods(
      goodsFromServer,
      { sortType, isReversed },
    );

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={sortType === SortType.ALPABET
              ? 'button is-info'
              : 'button is-info is-light'}
            onClick={this.sortByAlphabetButton}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={sortType === SortType.LENGTH
              ? 'button is-success'
              : 'button is-success is-light'}
            onClick={this.sortByLengthButton}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={isReversed
              ? 'button is-warning'
              : 'button is-warning is-light'}
            onClick={this.reverseButton}
          >
            Reverse
          </button>

          {(isReversed || sortType !== SortType.NONE) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={this.resetButton}
            >
              Reset
            </button>
          )}
        </div>
        <ul>
          <ul>
            {resultGoods.map(good => (
              <li data-cy="Good" key={good}>{good}</li>
            ))}
          </ul>
        </ul>
      </div>
    );
  }
}
