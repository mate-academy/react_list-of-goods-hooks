import { FC, useState } from 'react';
import { SortField } from './enums/SortField';
import { GoodList } from './components/GoodList';
import { Buttons } from './components/Buttons';
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

type SortOptions = {
  sortField: SortField;
  isReversed: boolean;
};

function getPreparedGood(goods: string[], options: SortOptions) {
  const { sortField, isReversed } = options;

  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.Alphabet:
          return good1.localeCompare(good2);

        case SortField.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const preparedGoods = getPreparedGood(goodsFromServer, {
    sortField,
    isReversed,
  });

  return (
    <div className="section content">
      <Buttons
        sortField={sortField}
        sortBy={setSortField}
        isReversed={isReversed}
        changeOrder={setIsReversed}
      />

      <GoodList goods={preparedGoods} />
    </div>
  );
};
