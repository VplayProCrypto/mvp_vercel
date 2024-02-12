import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import { db } from './database';
import 'dotenv/config';
import { UserUpdate, Users, NewUser, Collection } from './types';
import { getCollectionOpenSeaSDK, getCollection } from './opensea';
export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const results = await db.selectFrom('users').selectAll().execute();

  const usersResults = results as Users[];
  const collection: Collection = await getCollectionOpenSeaSDK('cryptokitties');
  const collection2 = await getCollection('cryptokitties');
  console.log(collection2);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      {usersResults.map(async (user) => {
        return (
          <Card className="mt-6" key={user.id}>
            <h1>{JSON.stringify(user)}</h1>
            <h1>{JSON.stringify(collection2)}</h1>
          </Card>
        );
      })}
    </main>
  );
}
