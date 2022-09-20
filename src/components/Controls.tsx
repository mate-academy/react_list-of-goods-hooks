import classNames from 'classnames';

type Props = {
  reset: () => void,
  reverse: () => void,
  alphabetSort: () => void,
  lengthSort: () => void,
  reverseState: boolean,
  type: SortType
};

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

export const Controls: React.FC<Props> = ({
  reset, reverse, alphabetSort, lengthSort, reverseState: reversedd, type,
}) => {
  return (
    <div className="buttons">
      <button
        type="button"
        onClick={alphabetSort}
        className={classNames(
          'button',
          'is-info',
          { 'is-light': type !== SortType.ALPHABET },
        )}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        onClick={lengthSort}
        className={classNames(
          'button',
          'is-success',
          { 'is-light': type !== SortType.LENGTH },
        )}
      >
        Sort by length
      </button>

      <button
        type="button"
        onClick={reverse}
        className={classNames(
          'button',
          'is-warning',
          { 'is-light': !reversedd },
        )}
      >
        Reverse
      </button>

      {(type !== SortType.NONE || reversedd)
        && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

    </div>

  );
};
