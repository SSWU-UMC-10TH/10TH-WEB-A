import { useState } from "react";
import type { MovieDetail, Crew } from "../types/movieDetail";
import { useNavigate } from "react-router-dom";

interface MovieDetailProps {
  moviedetail: MovieDetail;
  crew: Crew[];
}

export default function MovieDetailHeader({ moviedetail, crew }: MovieDetailProps) {
    const navigate = useNavigate();
    const director = crew.find((member) => member.job === "Director");

    return (
        <div className="relative w-full min-h-[600px] bg-cover bg-center"
        style={{
        backgroundImage: moviedetail.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${moviedetail.backdrop_path})`
          : "none",
        }}>
            <div className="absolute inset-0 bg-black/70" />
                <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 text-white">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-8 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer"
                    >
                        {'<'}
                    </button>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {moviedetail.title}
                        </h1>

                        <div className="flex flex-col gap-4 text-lg text-gray-200 mb-6">
                            <span>{moviedetail.vote_average.toFixed(1)}</span>
                            <span>{moviedetail.release_date?.slice(0, 4)}</span>
                            <span>{moviedetail.runtime}분</span>
                        </div>

                        {moviedetail.tagline && 
                        (
                            <p className="text-xl text-gray-300 italic mb-6">
                            {moviedetail.tagline}
                            </p>
                        )}

                        <p className="text-base leading-8 text-gray-100 mb-8">
                            {moviedetail.overview}
                        </p>
                    </div>
                </div>
            </div>
    )
}
