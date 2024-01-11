import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import {
  prepareListOfGoods,
} from './services/preparedListOfGoods/preparedListOfGoods';
import {
  SORT_METHOD_ALPHABET,
  SORT_METHOD_LENGTH,
  goodsFromServer,
} from './variables/variables';
import { GoodsList } from './components/GoodsList/GoodsList';

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods
    = prepareListOfGoods(goodsFromServer, sortField, reversed);

  const reset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_METHOD_ALPHABET)}
          type="button"
          className={`button is-info ${cn({ 'is-light': sortField !== SORT_METHOD_ALPHABET })}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_METHOD_LENGTH)}
          type="button"
          className={`button is-success ${cn({ 'is-light': sortField !== SORT_METHOD_LENGTH })}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={`button is-warning ${cn({ 'is-light': !reversed })}`}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
