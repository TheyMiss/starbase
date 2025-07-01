import { Card, CardContent } from "@/app/components/ui/card";
import { getIdFromUrl } from "@/app/utils/getIdFromUrl";
import Link from "next/link";

interface MovieCardProps {
  episode_id: number;
  title: string;
  opening_crawl: string;
  url: string;
}

const MovieCard = ({
  episode_id,
  title,
  opening_crawl,
  url,
}: MovieCardProps) => {
  const id = getIdFromUrl(url);
  return (
    <Card className="hover:shadow-lg transition-shadow border-gray-300">
      <article aria-labelledby={`movie-title-${episode_id}`}>
        <CardContent className="py-6 flex flex-col gap-3">
          <header>
            <Link href={`/movies/${id}`}>
              <h2
                id={`movie-title-${episode_id}`}
                className="text-2xl font-semibold text-blue-700 hover:underline cursor-pointer mb-1"
              >
                {title}
              </h2>
            </Link>
          </header>
          <p className="text-gray-600 italic">
            {opening_crawl.slice(0, 128)}...
          </p>
          <footer>
            <div className="text-xs text-gray-500 pt-2">
              <span className="font-medium">Episode:</span> {episode_id}
            </div>
          </footer>
        </CardContent>
      </article>
    </Card>
  );
};

export default MovieCard;
