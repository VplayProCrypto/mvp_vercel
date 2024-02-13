import { useRouter } from 'next/router';
import { getCollection } from '../../app/opensea';

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Collection } from '../../app/types';

export const getServerSideProps = (async ({ query: { name } }) => {
  const collection = await getCollection(name as string);
  return { props: { collection } };
}) satisfies GetServerSideProps<{ collection: Collection }>;

export default function Page({
  collection
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>{JSON.stringify(collection)}</div>;
}
