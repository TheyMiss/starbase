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

  const truncatedCrawl =
    opening_crawl.length > 128
      ? opening_crawl.slice(0, 128).trim() + "…"
      : opening_crawl;

  return (
    <Link
      href={`/movies/${id}`}
      className="block group focus:outline-none focus:ring-2 focus:ring-sb-accent rounded-xl h-full"
      tabIndex={0}
    >
      <Card className="hover:shadow-xl hover:brightness-110 group-hover:shadow-2xl transition-all border-sb-primary border-2 bg-sb-background rounded-xl h-full cursor-pointer">
        <article aria-labelledby={`movie-title-${episode_id}`}>
          <CardContent className="py-6 flex flex-col gap-3 h-full">
            <header>
              <h2
                id={`movie-title-${episode_id}`}
                className="text-xl font-bold text-sb-accent group-hover:underline transition-colors mb-1"
              >
                {title}
              </h2>
            </header>
            <p className="text-sb-light whitespace-pre-line italic min-h-[72px]">
              {truncatedCrawl}
            </p>
            <footer className="mt-auto">
              <div className="text-xs text-sb-muted-foreground pt-2">
                <span className="font-medium text-sb-accent">Episode:</span>{" "}
                <span className="text-sb-light">{episode_id}</span>
              </div>
            </footer>
          </CardContent>
        </article>
      </Card>
    </Link>
  );
};

export default MovieCard;
