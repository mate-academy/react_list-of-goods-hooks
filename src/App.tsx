import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export const goodsFromServer: string[] = [
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
  None = '',
  Name = 'name',
  Length = 'length',
}

export const App: React.FC = () => {
   const [sortField, setSortField] = useState<SortType>(SortType.None);
    const [reversed, setReversed] = useState<boolean>(false);
    let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
      switch (sortField) {
        case SortType.Name:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    })
    if (reversed) {
      visibleGoods = visibleGoods.toReversed();
    }
return(
  <div className="section content">
    <div className="buttons">
      <button type="button"
       onClick={() => setSortField(SortType.Name)}
      className={classNames(
        'button',
        'is-info',
        {'is-light': sortField !== 'name'}
      )}
      >
        Sort alphabetically
      </button>

      <button type="button"
      onClick={() => setSortField(SortType.Length)}
      className={classNames(
        'button',
        'is-success',
        { 'is-light': sortField !== 'length'}
  )}>
        Sort by length
      </button>

      <button type="button"
       onClick={() => setReversed(!reversed)}
      className={classNames(
      'button',
      'is-warning',
      { 'is-light': !reversed}
      )
    }>
        Reverse
      </button>

{(sortField !== '' || reversed) && (
  <button type="button"
      onClick={()=>{
         setSortField(SortType.None);
        setReversed(false);
      }}
      className="button is-danger is-light">
        Reset
      </button>
)}

    </div>

    <ul>

      {visibleGoods.map((good)=> {
        return (
            <li data-cy="Good" key={good}>{good}</li>
        )
      })}
    </ul>
  </div>
)
};
