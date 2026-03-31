import { useParams } from "react-router-dom";

export const MovieDetailPage = () => {
    const params = useParams();  
    return (
        <div>영화 상세 페이지{params.movieId}</div>
    );
}