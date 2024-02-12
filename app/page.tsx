import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import { db } from './database';

import { UserUpdate, Users, NewUser } from './types'

var httpProxy = require('http-proxy');



export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  // const search = searchParams.q ?? '';
  // const result = await sql`
  //   SELECT id, name, username, email 
  //   FROM users 
  //   WHERE name ILIKE ${'%' + search + '%'};
  // `;
  // 



  const results = await db.selectFrom("users").selectAll().execute()

  const usersResults = results as Users[];

  console.log(results)
  console.log(usersResults)
  console.log("Hello?")
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      <Card className="mt-6">
        {
          usersResults.map(user => {
            return (
              <h1>{JSON.stringify(user)}</h1>
            )
          })
        }
      </Card>
    </main>
  );
}
