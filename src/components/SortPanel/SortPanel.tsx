import classNames from 'classnames';
import { SORT_TYPE } from '../../constants';

type Props = {
  sortField: string,
  setSortField: (value: string) => void,
  isReversed: boolean,
  setIsReversed: (value: boolean | ((prevValue: boolean) => boolean)) => void,
};

export const SortPanel: React.FC<Props> = ({
  sortField,
  setSortField,
  isReversed,
  setIsReversed,
}) => {
  const isShowResetButton = sortField || isReversed;

  return (
    <div className="buttons">
      <button
        type="button"
        className={`button is-info ${classNames({ 'is-light': sortField !== SORT_TYPE.ALPHABET })}`}
        onClick={() => setSortField(SORT_TYPE.ALPHABET)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={`button is-success ${classNames({ 'is-light': sortField !== SORT_TYPE.LENGTH })}`}
        onClick={() => setSortField(SORT_TYPE.LENGTH)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={`button is-warning ${classNames({ 'is-light': !isReversed })}`}
        onClick={() => setIsReversed((isReversedSort) => !isReversedSort)}
      >
        Reverse
      </button>

      {isShowResetButton && (
        <button
          onClick={() => {
            setSortField('');
            setIsReversed(false);
          }}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
      )}
    </div>
  );
};
