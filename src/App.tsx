import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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
 NONE,
 ALPABET,
 LENGTH,
}

type ReorderOptions = {
 sortType: SortType;
 isReversed: boolean;
};

export function getReorderedGoods(
 goods: string[],
 { sortType, isReversed }: ReorderOptions,
) {
 const visibleGoods = [...goods];

 if (sortType === SortType.LENGTH) {
  visibleGoods.sort((a, b) => a.length - b.length);
 } else if (sortType === SortType.ALPABET) {
  visibleGoods.sort((a, b) => a.localeCompare(b));
 }

 if (isReversed) {
  visibleGoods.reverse();
 }

 return visibleGoods;
}

type State = {
 isReversed: boolean;
 sortType: SortType;
};

export class App extends React.Component<{}, State> {
 state: Readonly<State> = {
  isReversed: false,
  sortType: SortType.NONE,
 };

 render() {
  const { isReversed, sortType } = this.state;

  const visibleGoods = getReorderedGoods(goodsFromServer, {
   sortType,
   isReversed,
  });

  return (
   <div className="section content">
    <div className="buttons">
     <button
      type="button"
      className={classNames('button is-info', {
       'is-light': sortType !== SortType.ALPABET,
      })}
      onClick={() => this.setState({ sortType: SortType.ALPABET })}
     >
      Sort alphabetically
     </button>

     <button
      type="button"
      className={classNames('button is-success', {
       'is-light': sortType !== SortType.LENGTH,
      })}
      onClick={() => this.setState({ sortType: SortType.LENGTH })}
     >
      Sort by length
     </button>

     <button
      type="button"
      className={classNames('button is-warning', {
       'is-light': !isReversed,
      })}
      onClick={() =>
       this.setState(state => ({ isReversed: !state.isReversed }))
      }
     >
      Reverse
     </button>

     {(sortType !== SortType.NONE || isReversed) && (
      <button
       type="button"
       className="button is-danger is-light"
       onClick={() => {
        this.setState({
         sortType: SortType.NONE,
         isReversed: false,
        });
       }}
      >
       Reset
      </button>
     )}
    </div>

    <ul>
     {visibleGoods.map(good => (
      <li key={good} data-cy="Good">
       {good}
      </li>
     ))}
    </ul>
   </div>
  );
 }
}