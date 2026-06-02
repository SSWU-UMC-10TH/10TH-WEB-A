import MovieCard from "./MovieCard";
import { type Movie } from "../types/movie";

interface MovieListProps {
    movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
    if (movies.length === 0) {
        return (
        <div className="flex h-60 items-center">
            <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
        </div>
        )
    }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mt-10">
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
  )
}

export default MovieList