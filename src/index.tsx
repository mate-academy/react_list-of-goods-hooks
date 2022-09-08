import ReactDOM from 'react-dom';
import { App, goodsFromServer } from './App';

ReactDOM.render(
  <App goods={goodsFromServer} />,
  document.getElementById('root'),
);
