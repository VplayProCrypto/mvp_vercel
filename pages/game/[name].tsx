import { useRouter } from 'next/router';

export default function GamePage() {
  const router = useRouter();
  return <p>Game Name: {router.query.name}</p>;
}
