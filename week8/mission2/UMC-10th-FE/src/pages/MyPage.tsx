import React, { useEffect, useState, useRef } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getMyInfo, updateMyInfo } from "../../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY } from "../constants/key";
import Nav from "./Nav";

const MyPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { accessToken, logout } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [preview, setPreview] = useState("");
    const [file, setFile] = useState<File | null>(null);

    // Nav와 동일한 고정 키 구독
    const { data: userData, isLoading } = useQuery({
        queryKey: [QUERY_KEY.myInfo],
        queryFn: getMyInfo,
        enabled: !!accessToken,
    });

    useEffect(() => {
        if (userData) {
            setName(userData.data?.name || "");
            setBio(userData.data?.bio || "");
            setPreview(userData.data?.avatar || "");
        }
    }, [userData]);

    const { mutate } = useMutation({
        mutationFn: updateMyInfo,
        onMutate: async (formData) => {
            const queryKey = [QUERY_KEY.myInfo];
            const newName = formData.get("name") as string;

            // 1. 진행 중인 쿼리 취소
            await queryClient.cancelQueries({ queryKey });

            // 2. 이전 데이터 백업
            const previousUser = queryClient.getQueryData(queryKey);

            // 3. 캐시 낙관적 업데이트 (즉시 반영)
            queryClient.setQueryData(queryKey, (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    data: { ...old.data, name: newName }
                };
            });

            return { previousUser, queryKey };
        },
        onError: (err, variables, context) => {
            if (context?.previousUser) {
                queryClient.setQueryData(context.queryKey, context.previousUser);
            }
            alert("수정에 실패했습니다.");
        },
        onSuccess: (responseData) => {
            // [핵심] 서버 응답 데이터를 캐시에 직접 주입하여 304 응답으로 인한 복구 방지
            queryClient.setQueryData([QUERY_KEY.myInfo], responseData);
        },
        onSettled: () => {
            // 강제 리프레시로 최종 정합성 확인
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo], refetchType: 'all' });
        }
    });

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("bio", bio || "");
        if (file) formData.append("avatar", file);
        mutate(formData);
    };

    if (isLoading) return <div className="bg-black min-h-screen text-white p-8 font-sans">로딩 중...</div>;

    return (
        <div className="bg-black min-h-screen text-white flex flex-col items-center font-sans">
            <Nav onMenuClick={() => {}} />
            
            <div className="flex items-center gap-10 w-full max-w-2xl px-10 mt-20">
                <div 
                    className="relative w-44 h-44 rounded-full overflow-hidden cursor-pointer bg-gray-300 flex-shrink-0"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {preview ? <img src={preview} alt="Avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-400" />}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) { setFile(f); setPreview(URL.createObjectURL(f)); }
                    }} />
                </div>

                <div className="flex flex-col flex-1 gap-4 relative">
                    <div className="relative flex items-center">
                        <input 
                            className="w-full bg-transparent border border-white rounded-lg p-3 text-2xl font-bold outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button onClick={handleUpdate} className="absolute -right-10 text-white hover:text-gray-400 transition">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                    </div>
                    <input 
                        className="w-full bg-transparent border border-white rounded-lg p-2 text-lg outline-none"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Bio"
                    />
                    <div className="text-xl text-gray-300 mt-2">{userData?.data?.email}</div>
                </div>
            </div>

            <button className="mt-20 text-gray-500 hover:text-white transition" onClick={() => { logout(); navigate("/"); }}>
                로그아웃
            </button>
        </div>
    );
};

export default MyPage;