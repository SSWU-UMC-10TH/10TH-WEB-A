import type { ResponseMyInfoDto } from "../types/auth";
import { useEffect, useState } from "react";
import { getMyInfo } from "../../apis/auth"

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response: ResponseMyInfoDto = await getMyInfo();
            console.log(response);
            setData(response);
        }
        getData();
    }, []);

    console.log(data?.data?.name);

    return (
        <div>
            <p>{data?.data?.name}</p>
            <p>{data?.data?.email}</p>
        </div>
    );
};

export default MyPage;