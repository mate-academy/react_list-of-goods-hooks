import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import classNames from 'classnames';
import { SortType } from '../../types/sortTypes';
import { GoodsList } from '../goodsList';

type Props = {
  goods: string[];
};

export const GoodsListWrapper: React.FC<Props> = (props: Props) => {
  const { goods } = props;

  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReverseValue] = useState(false);
  const isGoodsChanged: boolean = sortType !== SortType.NONE
      || isReversed !== false;

  const handleSortByLengthButtonClick = () => {
    setSortType(SortType.LENGTH);
  };

  const handleSortByAlphabetButtonClick = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleReverseButtonClick = () => {
    setReverseValue((currentState) => !currentState);
  };

  const handleResetButtonClick = () => {
    setSortType(SortType.NONE);
    setReverseValue(false);
  };

  return (
    <>
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={handleSortByAlphabetButtonClick}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={handleSortByLengthButtonClick}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={handleReverseButtonClick}
        >
          Reverse
        </button>

        {isGoodsChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetButtonClick}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList
        goods={goods}
        sortType={sortType}
        isReversed={isReversed}
      />
    </>
  );
};
