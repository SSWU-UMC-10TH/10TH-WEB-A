import { useParams } from "react-router-dom";
import type { CreditsResponse } from "../types/movieDetail";
import type { MovieDetail } from "../types/movieDetail";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieDetailHeader from "../components/MovieDetailHeader";
import MovieCastList from "../components/MovieCastList";
import { useCustomFetch } from "../hooks/useCustomFetch";

export const MovieDetailPage = () => {

    const { movieId } = useParams<{ movieId: string }>();  
    
    const {data : movie, isPending, isError} = useCustomFetch<MovieDetail>(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`);
    const {data : credits} = useCustomFetch<CreditsResponse>(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`);   

    const cast = credits?.cast || [];
    const crew = credits?.crew || [];  
    
    console.log("movieId:", movieId);

    if (isError) {
        return (
            <div>
                <span className="text-red-500">영화 정보를 불러오지 못했습니다.</span>
            </div>
        );
    }

    if (!movie) {
        return (
            <div>
                <span className="text-gray-500">영화 정보가 없습니다.</span>
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