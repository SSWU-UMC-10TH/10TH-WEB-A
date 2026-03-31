import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Cast, CreditsResponse } from "../types/movieDetail";
import type { Crew } from "../types/movieDetail";
import type { MovieDetail } from "../types/movieDetail";
import { LoadingSpinner } from "../components/LoadingSpinner";
import axios from "axios";
import MovieDetailHeader from "../components/MovieDetailHeader";
import MovieCastList from "../components/MovieCastList";

export const MovieDetailPage = () => {
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [cast, setCast] = useState<Cast[]>([]);
    const [crew, setCrew] = useState<Crew[]>([]);

    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    const { movieId } = useParams<{ movieId: string }>();  
    console.log("movieId:", movieId);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            setIsPending(true);
            setIsError(false);
            
            try {
                const detailResponse = await axios.get<MovieDetail>
                (`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                }
            );

                const creditResponse = await axios.get<CreditsResponse>
                (`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                }
            );
            
            setMovie(detailResponse.data);
            setCast(creditResponse.data.cast);
            setCrew(creditResponse.data.crew);
        } catch {
            setIsError(true);
        } finally{
            setIsPending(false);
        }
        };

        fetchMovieDetail();
    }, [movieId]);

    if (isError) {
        return (
            <div>
                <span className="text-red-500">에러가 발생했습니다.</span>
            </div>
        );
    }

    if (!movie) {
        return (
            <div>
                <span className="text-gray-500">영화 정보를 로딩 중입니다...</span>
            </div>
        );
    }

    return (
        <>
            {isPending && (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner />
                </div>
            )}

            {!isPending && (
                            <div className="bg-black text-white">
                                <MovieDetailHeader moviedetail={movie} crew={crew} />
                                <MovieCastList cast={cast} />
                            </div>
            )}
        </>
);
}