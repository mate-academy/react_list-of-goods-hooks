import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';

type Good = string[];

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
  SORT_FIELD_ALPHABET = 'alphabet',
  SORT_FIELD_LENGHT = 'lenght',
}

function transformationGoods(goods: Good, sortField: string) {
  const copyGoods = [...goods];

  switch (sortField) {
    case SortType.SORT_FIELD_ALPHABET:
      copyGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.SORT_FIELD_LENGHT:
      copyGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      return copyGoods;
  }

  return copyGoods;
}

export const App: React.FC = () => {
  const [field, setField] = useState('');
  const [propertyRevers, setPropertyRevers] = useState(false);
  let visibleGoods: Good = transformationGoods(goodsFromServer, field);

  if (propertyRevers) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setField(SortType.SORT_FIELD_ALPHABET)}
          type="button"
          className={`button is-info ${cn({ 'is-light': field !== SortType.SORT_FIELD_ALPHABET })}`}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setField(SortType.SORT_FIELD_LENGHT)}
          type="button"
          className={`button is-success ${cn({ 'is-light': field !== SortType.SORT_FIELD_LENGHT })}`}
        >
          Sort by length
        </button>
        <button
          onClick={() => {
            setPropertyRevers(prev => !prev);
          }}
          type="button"
          className={`button is-warning ${cn({ 'is-light': propertyRevers !== true })}`}
        >
          Reverse
        </button>
        {field !== '' || propertyRevers === true ? (
          <button
            onClick={() => {
              setField('');
              setPropertyRevers(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
