import axios from "axios";
import { useEffect, useState } from "react";

export function useCustomFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

        useEffect(() => {
            const fetchData = async () => {
            setIsPending(true);
            setIsError(false);

            try {
                const res = await axios.get<T>(url, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                });

                setData(res.data);
            } catch (error) {
                console.error("영화 상세 조회 실패:", error);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isPending, isError };
}
