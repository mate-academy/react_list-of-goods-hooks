import classNames from 'classnames';
import React from 'react';

type Props = {
  sort: string;
  isReversed: boolean;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setIsReversed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PropsPanel: React.FC<Props> = ({
  sort,
  isReversed,
  setSort,
  setIsReversed,
}) => {
  return (
    <div className="buttons">
      <button
        type="button"
        className={classNames('button', 'is-info', {
          'is-light': sort !== 'alphabetically',
        })}
        onClick={() => setSort('alphabetically')}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={classNames('button', 'is-success', {
          'is-light': sort !== 'length',
        })}
        onClick={() => setSort('length')}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={classNames('button', 'is-warning', {
          'is-light': !isReversed,
        })}
        onClick={() => setIsReversed(prev => !prev)}
      >
        Reverse
      </button>

      {(isReversed || sort) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setIsReversed(false);
            setSort('');
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};
