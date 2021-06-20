import { RouteComponentProps } from 'react-router-dom';

import { useOrder } from 'graphqlAPI';

type OrderProps = RouteComponentProps<{
  id: string;
}>;

export const Order = ({ match }: OrderProps) => {
  const { id } = match.params;
  const { data } = useOrder({ variables: { id } });
  console.log(data);

  return <div>{id}</div>;
};

export default Order;
