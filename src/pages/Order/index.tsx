import { RouteComponentProps } from 'react-router-dom';

type OrderProps = RouteComponentProps<{
  id: string;
}>;

export const Order = ({ match }: OrderProps) => {
  const { id } = match.params;

  return <div>{id}</div>;
};

export default Order;
