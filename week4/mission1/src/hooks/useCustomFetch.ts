import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useCustomFetch(url: string) {
    const [data, setData] = useState<any>(null)
    const [isLoading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false);

    useEffect (() => {
        const fetchData = async () => {
            try{
                setLoading(true)
                const { data } = await axios.get(url,{
                    headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
                        }
                    }
                )
                console.log(data)
                setData(data)
            } catch (error) {
                console.error("상세 정보 불러오기 실패", error)
            } finally {
                setLoading(false)
            }
        }

        if (url) {
            fetchData()
        }
    }, [url]);

  return{data, isLoading, isError}
}
