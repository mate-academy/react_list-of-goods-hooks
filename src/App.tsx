import React from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';
import GoodsList from './components/GoodsList';

const App: React.FC = () => {
  return (
    <div className="App container is-fluid">
      <GoodsList />
    </div>
  );
};

export default App;
