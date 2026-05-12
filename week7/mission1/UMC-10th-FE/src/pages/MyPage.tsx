import React, { useEffect, useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyInfo, updateMyInfo } from "../../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { ResponseMyInfoDto } from "../types/auth";
import Nav from "./Nav";

const MyPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { logout } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 상태 관리
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // 수정용 상태
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [preview, setPreview] = useState("");
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getMyInfo();
                setData(response);
                // 초기값 세팅
                setName(response.data?.name || "");
                setBio(response.data?.bio || "");
                setPreview(response.data?.avatar || "");
            } catch (error) {
                console.error("내 정보 가져오기 실패:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, []);

    // 이미지 변경 핸들러
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    // 정보 수정 Mutation
    const { mutate } = useMutation({
        mutationFn: updateMyInfo,
        onSuccess: () => {
            alert("프로필이 수정되었습니다.");
            queryClient.invalidateQueries({ queryKey: ["myInfo"] });
        },
        onError: () => {
            alert("수정에 실패했습니다.");
        }
    });

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("bio", bio || ""); // 빈 값 허용
        if (file) {
            formData.append("avatar", file); // 선택 시에만 전송
        }
        mutate(formData);
    };

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    if (isLoading) return <div className="bg-black min-h-screen text-white p-8">로딩 중...</div>;
    if (!data) return <div className="bg-black min-h-screen text-white p-8">데이터를 불러올 수 없습니다.</div>;

    return (
        <div className="bg-black min-h-screen text-white flex flex-col items-center font-sans">
            <div className="w-full mb-20">
                <Nav/>
            </div>
            <div className="flex items-center gap-10 w-full max-w-2xl px-10">
                
                {/* 프로필 이미지 (클릭 시 수정) */}
                <div 
                    className="relative w-44 h-44 rounded-full overflow-hidden cursor-pointer bg-gray-300 flex-shrink-0"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {preview ? (
                        <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-400" />
                    )}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                    />
                </div>

                {/* 정보 입력 UI */}
                <div className="flex flex-col flex-1 gap-4 relative">
                    <div className="relative flex items-center">
                        <input 
                            className="w-full bg-transparent border border-white rounded-lg p-3 text-2xl font-bold outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름"
                        />
                        {/* 저장 버튼 (체크 아이콘) */}
                        <button 
                            onClick={handleUpdate}
                            className="absolute -right-10 text-white hover:text-gray-400 transition"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </button>
                    </div>

                    <input 
                        className="w-full bg-transparent border border-white rounded-lg p-2 text-lg outline-none"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Bio를 입력하세요"
                    />

                    <div className="text-xl text-gray-300 mt-2">
                        {data.data?.email}
                    </div>
                </div>
            </div>

            <button 
                className="mt-20 text-gray-500 hover:text-white transition cursor-pointer" 
                onClick={handleLogout}
            >
                로그아웃
            </button>
        </div>
    );
};

export default MyPage;