import type { Cast } from "../types/movieDetail";

interface MovieCastListProps {
  cast: Cast[];
}

export default function MovieCastList({ cast }: MovieCastListProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-white">
      <h2 className="text-3xl font-bold mb-8">감독/출연</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {cast.slice(0, 12).map((person) => (
          <div key={person.id} className="text-center">
            {person.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                alt={person.name}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mx-auto mb-3 border border-white/20"
              />
            ) : (
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-3 text-sm text-gray-300 border border-white/20">
                No Image
              </div>
            )}

            <p className="font-semibold text-sm">{person.name}</p>
            <p className="text-xs text-gray-400 mt-1">{person.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}