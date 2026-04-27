import type { ResponseMyInfoDto } from "../types/auth";
import { useEffect, useState } from "react";
import { getMyInfo } from "../../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getMyInfo();
                setData(response);
            } catch (error) {
                console.error("내 정보 가져오기 실패:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/")
    };

    if (isLoading) return <div>로딩 중...</div>;
    if (!data) return <div>데이터를 불러올 수 없습니다.</div>;

    return (
        <div>
            <h1>{data.data?.name}님 환영합니다.</h1>
            {data.data?.avatar && (
                <img src={data.data.avatar} alt="아바타 이미지" />
            )}
            <h1>{data.data?.email}</h1>

            <button className="cursor-pointer" onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default MyPage;