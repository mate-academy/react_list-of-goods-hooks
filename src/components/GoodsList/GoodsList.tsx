import ListItem from '../ListItem/ListItem';

type GoodsListProps = {
  goodsList: string[];
};

export default function GoodsList({ goodsList }: GoodsListProps) {
  return (
    <ul>
      {goodsList.map(item => (
        <ListItem key={item} item={item} />
      ))}
    </ul>
  );
}
