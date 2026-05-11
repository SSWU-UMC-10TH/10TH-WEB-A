import { type Movie } from "../types/movie";

interface CreditProps {
    credits: {
        cast: any[];
        crew: any[];
    };
}

export const MovieCredit = ({credits} : CreditProps) => {
    const allStaff = [...(credits?.cast || []), ...(credits?.crew || [])];

    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            {allStaff.map((person) => (
                <div key={person.id} className="flex flex-col items-center gap-1.5">
                    <div className="">
                       {person.profile_path ? (
                            <img 
                                src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                                className="w-36 h-36 rounded-full object-cover border-1 border-white"
                                alt={person.name}
                            />
                        ) : (
                            <div className="w-36 h-36 bg-black rounded-full border-1 border-white">
                
                            </div>
                        )}
                    </div>
                    <p className="text-sm text-white font-semibold">{person.name}</p>
                    <p className="text-sm text-gray-400">{person.character}</p>
                </div>
            ))}
        </div>
    )
}