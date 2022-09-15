import 'bulma/css/bulma.css';
import './App.scss';
import { ListOfGoods } from './components/ListOfGoods/ListOfGoods';

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

export const App = () => {
  return (
    <div className="section content">
      <ListOfGoods goodsFromServer={goodsFromServer} />
    </div>
  );
};
