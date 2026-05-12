import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Goods } from './components/Goods';
import classNames from 'classnames';

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
enum SortType {
  Default = 'default',
  Alph = 'alphabetically',
  Length = 'length',
}

export const App: React.FC = () => {
  function prepareGoods(
    goods: string[],
    sortType: SortType,
    isReversed: boolean,
  ): string[] {
    const sortedGoods = [...goods];

    switch (sortType) {
      case SortType.Alph:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;

      case SortType.Default:
        break;

      default:
        break;
    }

    return isReversed ? sortedGoods.reverse() : sortedGoods;
  }

  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const preparedGoods = prepareGoods(goodsFromServer, sortType, isReversed);

  function handleReset(): void {
    setIsReversed(false);
    setSortType(SortType.Default);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.Alph,
          })}
          onClick={() => setSortType(SortType.Alph)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => setSortType(SortType.Length)}
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

        {(isReversed || sortType !== SortType.Default) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <Goods goods={preparedGoods} />
    </div>
  );
};
