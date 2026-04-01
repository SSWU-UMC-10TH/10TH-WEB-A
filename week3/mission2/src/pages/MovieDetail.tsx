import { useParams } from "react-router-dom";

export const MovieDetailPage = () => {
    const params = useParams(); 
    console.log(params); 

    return (
        <div>
            <h1>Movie ID: {params.movieId}</h1>
            <p>Movie Detail Page</p>
        </div>
    );
};