import React from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';
import RenderList from './components/RenderList';

const App: React.FC = () => {
  return (
    <div className="App container is-fluid">
      <RenderList />
    </div>
  );
};

export default App;
