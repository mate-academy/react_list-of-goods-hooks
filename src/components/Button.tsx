import cn from 'classnames';
import { SortType } from './types';

type Props = {
  getSort: (sort: SortType) => void;
  activeSort: SortType;
};

export const Button: React.FC<Props> = ({ getSort, activeSort }) => (
  <div className="buttons">
    <button
      type="button"
      className={cn('button is-info', {
        'is-light': activeSort !== SortType.Alphabet,
      })}
      onClick={() => getSort(SortType.Alphabet)}
    >
      Sort alphabetically
    </button>

    <button
      type="button"
      className={cn('button is-success', {
        'is-light': activeSort !== SortType.Length,
      })}
      onClick={() => getSort(SortType.Length)}
    >
      Sort by length
    </button>

    <button
      type="button"
      className={cn('button is-warning', {
        'is-light': activeSort !== SortType.Reverse,
      })}
      onClick={() => getSort(SortType.Reverse)}
    >
      Reverse
    </button>

    {activeSort !== SortType.Default && (
      <button
        type="button"
        className="button is-danger is-light"
        onClick={() => getSort(SortType.Default)}
      >
        Reset
      </button>
    )}
  </div>
);
