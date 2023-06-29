import { FC, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { SortField } from '../enums/SortField';

type Props = {
  sortField: SortField;
  sortBy: Dispatch<SetStateAction<SortField>>;
  isReversed: boolean;
  changeOrder: Dispatch<SetStateAction<boolean>>;
};

export const Buttons: FC<Props> = (props) => {
  const {
    sortField,
    sortBy,
    isReversed,
    changeOrder,
  } = props;

  const handleResetGoods = () => {
    sortBy(SortField.Default);
    changeOrder(false);
  };

  return (
    <div className="buttons">
      <button
        type="button"
        onClick={() => sortBy(SortField.Alphabet)}
        className={classNames('button', 'is-info', {
          'is-light': sortField !== SortField.Alphabet,
        })}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        onClick={() => sortBy(SortField.Length)}
        className={classNames('button', 'is-success', {
          'is-light': sortField !== SortField.Length,
        })}
      >
        Sort by length
      </button>

      <button
        type="button"
        onClick={() => changeOrder(prevOrder => !prevOrder)}
        className={classNames('button', 'is-warning', {
          'is-light': !isReversed,
        })}
      >
        Reverse
      </button>

      {(sortField || isReversed) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={handleResetGoods}
        >
          Reset
        </button>
      )}
    </div>
  );
};
