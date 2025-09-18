import React from 'react';
import { Goods } from './Goods';
import { goodsFromServer } from './goodsFromServer';
import './styles.css';

export default function App() {
  return (
    <main className="app">
      <h1>List of goods (hooks + TS)</h1>
      <Goods goods={goodsFromServer} />
    </main>
  );
}
