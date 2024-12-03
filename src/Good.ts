import { goodsFromServer } from './App';

export type Good = (typeof goodsFromServer)[number];
