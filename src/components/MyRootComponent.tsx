import { gql, useQuery } from '@apollo/client';
import React from 'react';

// Example query - replace with your actual query
const GET_HELLO = gql`
  query GetHello {
    hello
  }
`;

export const MyRootComponent: React.FC = () => {
  const { loading, error, data } = useQuery(GET_HELLO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  
  return (
    <div>
      <h1>My GraphQL App</h1>
      <p>{data?.hello}</p>
    </div>
  );
}; 