interface Props {
  goods: string[]
}

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(goodItem => <li key={goodItem}>{goodItem}</li>)}
  </ul>
);
