import { useParams } from "react-router-dom";
import axios from "axios";
import { type Movie } from "../types/movie";
import { useEffect, useState } from "react";
import { MovieCredit } from "../components/MovieCredit";
import { LoadingSpinner } from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";

export const MovieDetailPage = () => {
    const params = useParams();
    const url =`https://api.themoviedb.org/3/movie/${params.movieId}?append_to_response=credits`
    const { data : movie , isLoading, isError} = useCustomFetch(url);

    if(isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if(isError) {
        return (
            <div>
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
            </div>
        )
    }
  
    return (
        <>
            <div className="bg-black">
                {/* 영화 상세 정보 - 영화 포스터, 제목, 평점, 년도, 상영 시간, 줄거리 */}
                <div className="relative rounded-2xl p-5">
                    <div>
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                            alt={`${movie?.title} 포스터`}
                            className="w-full h-100 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent" />
                    </div>
                    <div className="absolute inset-0 p-10 text-white">
                        <h1 className="text-4xl font-bold mb-5">{movie?.title}</h1>
                        <p className="font">평균 {movie?.vote_average}</p>
                        <p>{movie?.release_date.split("-")[0]}</p>
                        <p>{movie?.runtime}분</p>
                        <p className="italic text-2xl mt-3 mb-5">{movie?.tagline}</p>
                        <div className="w-150">
                            <p>{movie?.overview}</p>
                        </div>
                    </div>
                </div>
                {/* 감독/출연 */}
                <div className="p-5">
                    <h1 className="text-4xl font-bold text-white mb-20">감독/출연</h1>
                    <MovieCredit credits={movie?.credits} />
                </div>
            </div>
        </>
    );
};