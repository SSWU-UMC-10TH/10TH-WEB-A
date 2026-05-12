import React, { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, Edit2, Trash2, Check, X, Camera } from "lucide-react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import useGetLpDetail from '../hooks/queries/useGetLpDetail'
import useGetMyInfo from '../hooks/queries/useGetMyInfo'
import usePostLike from '../hooks/mutations/usePostLike'
import useDeleteLike from '../hooks/mutations/useDeleteLike'
import { deleteLp, updateLp } from '../../apis/lp'

const LpDetailPage = () => {
    const { accessToken } = useAuth();
    const { lpid } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 상세 페이지 쿼리 키 정의
    const detailQueryKey = ['lpDetail', Number(lpid)];

    const { data: lp, isPending, isError } = useGetLpDetail({ lpid: Number(lpid) });
    const { data: myInfo } = useGetMyInfo(accessToken);

    // --- 1. 좋아요 추가 (낙관적 업데이트) ---
    const { mutate: likeMutate } = usePostLike({
        onMutate: async () => {
            // 진행 중인 refetch 취소 (낙관적 업데이트 덮어쓰기 방지)
            await queryClient.cancelQueries({ queryKey: detailQueryKey });

            // 이전 데이터 스냅샷 저장
            const previousLp = queryClient.getQueryData(detailQueryKey);

            // 캐시 데이터 즉시 수정
            queryClient.setQueryData(detailQueryKey, (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    data: {
                        ...old.data,
                        // 내 ID를 좋아요 목록에 즉시 추가
                        likes: [...old.data.likes, { userId: myInfo?.data?.id }]
                    }
                };
            });

            return { previousLp };
        },
        onError: (err, variables, context) => {
            // 실패 시 이전 데이터로 복구
            if (context?.previousLp) {
                queryClient.setQueryData(detailQueryKey, context.previousLp);
            }
        },
        onSettled: () => {
            // 최종적으로 서버 데이터와 동기화
            queryClient.invalidateQueries({ queryKey: detailQueryKey });
        }
    });

    // --- 2. 좋아요 취소 (낙관적 업데이트) ---
    const { mutate: dislikeMutate } = useDeleteLike({
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: detailQueryKey });

            const previousLp = queryClient.getQueryData(detailQueryKey);

            queryClient.setQueryData(detailQueryKey, (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    data: {
                        ...old.data,
                        // 내 ID를 좋아요 목록에서 즉시 제거
                        likes: old.data.likes.filter((like: any) => like.userId !== myInfo?.data?.id)
                    }
                };
            });

            return { previousLp };
        },
        onError: (err, variables, context) => {
            if (context?.previousLp) {
                queryClient.setQueryData(detailQueryKey, context.previousLp);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: detailQueryKey });
        }
    });

    // --- 기타 상태 및 핸들러 ---
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [preview, setPreview] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteLp,
        onSuccess: () => {
            alert("삭제되었습니다.");
            queryClient.invalidateQueries({ queryKey: ['lps'] });
            navigate('/');
        }
    });

    const { mutate: updateMutate } = useMutation({
        mutationFn: updateLp,
        onSuccess: () => {
            setIsEditing(false);
            queryClient.invalidateQueries({ queryKey: detailQueryKey });
            alert("수정되었습니다.");
        }
    });

    const isLiked = lp?.data.likes.some((like: any) => like.userId === myInfo?.data?.id);

    if (isPending) return <div className="bg-[#121212] min-h-screen text-white p-10">Loading...</div>;
    if (isError) return <div className="bg-[#121212] min-h-screen text-white p-10">Error!</div>;

    return (
        <div className='flex justify-center items-start min-h-screen bg-[#121212] pt-12 px-4 font-sans'>
            <div className='w-full max-w-3xl bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/5'>
                {/* 상단 유저 바 */}
                <div className='p-6 flex justify-between items-center border-b border-white/10'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-gray-600 overflow-hidden'>
                             <img src={lp?.data.user?.avatar} alt="user" className='w-full h-full object-cover' />
                        </div>
                        <p className='text-white font-medium'>{lp?.data.user?.name}</p>
                    </div>
                    <div className='flex gap-4 text-gray-400'>
                        {isEditing ? (
                            <>
                                <Check size={22} className='cursor-pointer text-green-500' onClick={() => {
                                    const formData = new FormData();
                                    formData.append('title', editTitle);
                                    formData.append('content', editContent);
                                    if (file) formData.append('thumbnail', file);
                                    updateMutate({ lpid: Number(lpid), formData });
                                }} />
                                <X size={22} className='cursor-pointer text-red-500' onClick={() => setIsEditing(false)} />
                            </>
                        ) : (
                            <>
                                <Edit2 size={20} className='cursor-pointer hover:text-white' onClick={() => {
                                    setEditTitle(lp?.data.title || "");
                                    setEditContent(lp?.data.content || "");
                                    setPreview(lp?.data.thumbnail || "");
                                    setIsEditing(true);
                                }} />
                                <Trash2 size={20} className='cursor-pointer hover:text-red-500' onClick={() => window.confirm("삭제하시겠습니까?") && deleteMutate({lpid: Number(lpid)})} />
                            </>
                        )}
                    </div>
                </div>

                {/* 이미지 영역 */}
                <div className='relative w-full aspect-video bg-black flex items-center justify-center group'>
                    <img src={isEditing ? preview : lp?.data.thumbnail} alt="thumbnail" className='max-w-full max-h-full object-contain' />
                    {isEditing && (
                        <div className='absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity' onClick={() => fileInputRef.current?.click()}>
                            <Camera size={40} className='text-white' />
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) { setFile(f); setPreview(URL.createObjectURL(f)); }
                            }} />
                        </div>
                    )}
                </div>

                {/* 내용 및 좋아요 버튼 */}
                <div className='p-8'>
                    {isEditing ? (
                        <div className='flex flex-col gap-4'>
                            <input className='bg-transparent border-b border-gray-600 text-2xl font-bold text-white outline-none focus:border-pink-500 pb-2' value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                            <textarea className='bg-transparent border border-gray-600 rounded-md p-3 text-gray-300 outline-none focus:border-pink-500 h-32' value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                        </div>
                    ) : (
                        <>
                            <h1 className='text-white text-3xl font-bold mb-4'>{lp?.data.title}</h1>
                            <p className='text-gray-300 text-lg leading-relaxed mb-8'>{lp?.data.content}</p>
                        </>
                    )}

                    <div className='flex items-center justify-between border-t border-white/10 pt-6'>
                        <button 
                            onClick={() => isLiked ? dislikeMutate({lpid: Number(lpid)}) : likeMutate({lpid: Number(lpid)})} 
                            className='flex items-center gap-2 transition-transform active:scale-90'
                        >
                            <Heart 
                                size={30} 
                                color={isLiked ? "#ff4b4b" : "white"} 
                                fill={isLiked ? "#ff4b4b" : "transparent"} 
                                className="transition-colors duration-200"
                            />
                            <span className='text-white text-xl'>{lp?.data.likes.length}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LpDetailPage;