import {
  BookOpen,
  Instagram,
  Twitter,
  Send,
  Gamepad2,
  Book,
} from "lucide-react";
import YouTube from "react-youtube";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Collection } from "@/types/apiTypes";
import Link from "next/link";
import useGameStore from "@/store/gameStore";
import { gameDescription } from "@/utils/consts";
const DescriptionCard: React.FC = () => {
  const { collection } = useGameStore();
  if (!collection) return <h1>ERROR NO INFO</h1>;
  const description = gameDescription[collection?.name];
  const videoId = "3PTstAK-cH8";
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-bold">Description</CardTitle>
        <BookOpen className="w-6 h-6" />
      </CardHeader>
      <CardContent className="flex flex-col">
        <YouTube videoId={videoId} opts={opts} />
        <p className="text-1xl font-medium tracking-tight mt-4">
          {collection.description}
        </p>
        <div className="flex items-center space-x-4 mt-6">
          {collection.project_url && (
            <Link
              href={collection.project_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Project URL</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </Link>
          )}
          {collection.wiki_url && (
            <Link
              href={collection.wiki_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Wiki</span>
              <Book className="w-6 h-6" />
            </Link>
          )}
          {collection.discord_url && (
            <Link
              href={`${collection.discord_url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Twitter</span>
              <Gamepad2 className="w-6 h-6" />
            </Link>
          )}
          {collection.twitter_username && (
            <Link
              href={`https://twitter.com/${collection.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="w-6 h-6" />
            </Link>
          )}
          {collection.instagram_username && (
            <Link
              href={`https://instagram.com/${collection.instagram_username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="w-6 h-6" />
            </Link>
          )}
          {collection.telegram_url && (
            <Link
              href={collection.telegram_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Telegram</span>
              <Send className="w-6 h-6" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DescriptionCard;
