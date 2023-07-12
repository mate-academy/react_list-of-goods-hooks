import classNames from 'classnames';
import { SortTypes } from '../../enum/SortTypes';

type Props = {
  sortField: string;
  setSortField: (value: SortTypes) => void;
  reversed: boolean;
  setReversed: (value: boolean) => void;
};

export const Buttons: React.FC<Props> = ({
  sortField, setSortField, reversed, setReversed,
}) => {
  const onReverse = () => {
    setReversed(false);
    setSortField(SortTypes.default);
  };

  return (
    <div className="buttons">
      <button
        type="button"
        className={classNames(
          'button',
          'is-info',
          { 'is-light': sortField !== SortTypes.name },
        )}
        onClick={() => setSortField(SortTypes.name)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={classNames(
          'button',
          'is-success',
          { 'is-light': sortField !== SortTypes.length },
        )}
        onClick={() => setSortField(SortTypes.length)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={classNames(
          'button',
          'is-warning',
          { 'is-light': reversed === false },
        )}
        onClick={() => setReversed(!reversed)}
      >
        Reverse
      </button>

      {(sortField || reversed)
        ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => onReverse()}
          >
            Reset
          </button>
        )
        : null}
    </div>
  );
};
