import { useState, FC } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { getReorderedGoods } from './functions';
import { SortType } from './types';
import goodsFromServer from './goodsFromServer';

export const App: FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortAlphabetically = () => {
    if (sortType !== SortType.ALPHABET) {
      setSortType(SortType.ALPHABET);
    }
  };

  const sortByLength = () => {
    if (sortType !== SortType.LENGTH) {
      setSortType(SortType.LENGTH);
    }
  };

  const reverseList = () => {
    setIsReversed(prevIsReversed => !prevIsReversed);
  };

  const resetList = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const visibleGoods = getReorderedGoods(goodsFromServer, {
    isReversed,
    sortType,
  });

  const alphabetIsActive = sortType === SortType.ALPHABET;
  const lengthIsActive = sortType === SortType.LENGTH;

  const alphabetBtnClass = cn('button', 'is-info', {
    'is-light': !alphabetIsActive,
  });

  const lengthBtnClass = cn('button', 'is-success', {
    'is-light': !lengthIsActive,
  });

  const reverseBtnClass = cn('button', 'is-danger', {
    'is-light': !isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={alphabetBtnClass}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={lengthBtnClass}
          onClick={sortByLength}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={reverseBtnClass}
          // className="button is-warning is-light"
          onClick={reverseList}
        >
          Reverse
        </button>
        {
          (sortType !== SortType.NONE || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetList}
            >
              Reset
            </button>
          )
        }
      </div>
      <ul>
        <ul>
          {
            visibleGoods.map(item => {
              return (
                <li key={item} data-cy="Good">{item}</li>
              );
            })
          }
        </ul>
      </ul>
    </div>
  );
};
