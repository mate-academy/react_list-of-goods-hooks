import React, { useState } from 'react';
import classNames from 'classnames';
import { GoodsList } from './components/googsList';
import 'bulma/css/bulma.css';
import './App.scss';

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

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('id');
  const [isOpenAlp, SetIsOpenAlp] = useState(true);
  const [isOpenLength, SetIsOpenLength] = useState(true);
  const [isOpenReverse, SetisOpenReverse] = useState(true);

  const copyGoods = [...goodsFromServer];

  const sortingAlphabet = () => {
    setSortBy('alphabet');
    SetIsOpenAlp(!isOpenAlp);
    SetIsOpenLength(true);

    if (!isOpenAlp) {
      SetIsOpenAlp(isOpenAlp);
    }
  };

  const sortingLength = () => {
    setSortBy('length');
    SetIsOpenLength(!isOpenLength);
    SetIsOpenAlp(true);

    if (!isOpenLength) {
      SetIsOpenLength(isOpenLength);
    }
  };

  const reverse = () => {
    setIsReversed(prevState => !prevState);
    SetisOpenReverse(!isOpenReverse);

    if (isReversed) {
      SetisOpenReverse(!isOpenReverse);
    }
  };

  if (isReversed) {
    copyGoods.reverse();
  }

  const resetButton = () => {
    setSortBy('id');
    setIsReversed(false);
    SetIsOpenAlp(true);
    SetIsOpenLength(true);
    SetisOpenReverse(true);
  };

  copyGoods.sort((a, b) => {
    switch (sortBy) {
      case 'alphabet':
        return a.localeCompare(b);

      case 'length':
        return a.length - b.length;

      default: return 0;
    }
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', { 'is-light': isOpenAlp })}
          onClick={sortingAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success',
            { 'is-light': isOpenLength })}
          onClick={sortingLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            { 'is-light': isOpenReverse })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(!isOpenReverse || sortBy !== 'id')
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetButton}
            >
              Reset
            </button>
          )}

      </div>

      <GoodsList goods={copyGoods} />
    </div>
  );
};
