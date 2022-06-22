import React from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';
import List from './components/List';

const App: React.FC = () => {
  return (
    <div className="App container is-fluid">
      <List />
    </div>
  );
};

export default App;
