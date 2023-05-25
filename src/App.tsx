import React, { useState } from 'react';
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
  ALPHABET,
  LENGTH,
}

 export const App: React.FC = () => {
   const [sortType, setSortType] = useState(SortType.NONE);
   const [isReversed, setIsReversed] = useState(false);

   const sortByAlphabet = () => {
     setSortType(SortType.ALPHABET);
   };

   const sortByLength = () => {
     setSortType(SortType.LENGTH);
   };

   const reverse = () => {
     setIsReversed(!isReversed);
   };

   const reset = () => {
     setIsReversed(false);
     setSortType(SortType.NONE);
   };

   const getReorderedGoods = (
     goods: string[],
     sort: SortType,
     reversed: boolean,
   ) => {
     const visibleGoods = [...goods];

     visibleGoods.sort((a, b) => {
       switch (sort) {
         case SortType.ALPHABET:
           return a.localeCompare(b);

         case SortType.LENGTH:
           return a.length - b.length;

         default:
           return 0;
       }
     });

     return reversed ? visibleGoods.reverse() : visibleGoods;
   };

   const sortedGoods = getReorderedGoods(goodsFromServer, sortType, isReversed);

   return (
     <div className="section content">
       <div className="buttons">
         <button
           type="button"
      className={classNames(
             'button',
             'is-info',
             { 'is-light': sortType !== SortType.ALPHABET },
           )}
           onClick={sortByAlphabet}
         >
           Sort alphabetically
         </button>

         <button
           type="button"
     className={classNames(
             'button',
             'is-success',
             { 'is-light': sortType !== SortType.LENGTH },
           )}
           onClick={sortByLength}
         >
           Sort by length
         </button>

         <button
           type="button"
     className={classNames(
             'button',
             'is-warning',
             { 'is-light': !isReversed },
           )}
           onClick={reverse}
         >
           Reverse
         </button>
     {(sortType || isReversed)
             && (
               <button
                 type="button"
                 className="button is-danger is-light"
                 onClick={reset}
               >
                 Reset
               </button>
             )}
       </div>

       <ul>
         <ul>
     {sortedGoods.map(good => (
             <li key={good} data-cy="Good">
               {good}
             </li>
           ))}
         </ul>
       </ul>
     </div>
  );
 };
