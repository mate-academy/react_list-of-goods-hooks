import { IReverseGoods } from '../interfaces/IReverseGoods';

export function reverseGoods(
  {
    goods, reversed, setReversed, setGoods,
  }: IReverseGoods,
) {
  setReversed(!reversed);

  setGoods([...goods].reverse());
}
