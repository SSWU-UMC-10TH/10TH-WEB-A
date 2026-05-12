// import React from 'react'
// import { useParams } from 'react-router-dom'
// import useGetLpDetail from '../hooks/queries/useGetLpDetail';
// import { Heart } from "lucide-react"
// import useGetMyInfo from '../hooks/queries/useGetMyInfo';
// import { useAuth } from '../context/AuthContext';
// import { postLike } from '../../apis/lp';
// import { deleteLike } from '../../apis/lp';
// import usePostLike from '../hooks/mutations/usePostLike';
// import useDeleteLike from '../hooks/mutations/useDeleteLike';

//  const LpDetailPage = () => {
//     const { accessToken } = useAuth();
//      const { lpid } = useParams();
//      const { data: lp, 
//          isPending, 
//          isError } 
//      = useGetLpDetail({lpid:Number(lpid)});

//      const { data: myInfo } = useGetMyInfo(accessToken);
//      //mutate -> 비동기 요청을 실행하고, 콜백함수를 이용해서 후속작업처리함
//      //mutateAsync => Promise를 반환해서 await 사용 가능
//      const { mutate : likeMutate } = usePostLike();
//      const { mutate : dislikeMutate } = useDeleteLike();

//      const isLiked = lp?.data.likes
//      .map((like) => like.userId)
//      .includes(myInfo?.id as number);

//     //  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id)

//      const handleLikeLp =  () => {
//         likeMutate ({lpid:Number(lpid)})
//      }

//      const handleDeleteLp =  () => {
//         dislikeMutate ({lpid:Number(lpid)})
//      }

//      if(isPending && isError) {
//          return <></>
//      }

//      return (
//      <div className='mt-12'>
//          <h1>{lp?.title}</h1>
//          <img src={lp?.data.thumbnail} alt={lp?.data.title} />
//          <p>{lp?.data.content}</p>

//          <button onClick={isLiked ? handleDeleteLp : handleLikeLp}>
//             <Heart color={isLiked ? "red" : "black"}
//             fill={isLiked ? "red" : "transparent"}/>
//          </button>
//      </div>
//    )
//  }

// export default LpDetailPage

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

    // --- 상태 관리 ---
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [preview, setPreview] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const { data: lp, isPending, isError } = useGetLpDetail({ lpid: Number(lpid) });
    const { data: myInfo } = useGetMyInfo(accessToken);
    
    // --- Mutations ---
    const { mutate: likeMutate } = usePostLike();
    const { mutate: dislikeMutate } = useDeleteLike();

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
            queryClient.invalidateQueries({ queryKey: ['lpDetail', Number(lpid)] });
            alert("수정되었습니다.");
        }
    });

    // --- 핸들러 ---
    const handleEditStart = () => {
        setEditTitle(lp?.data.title || "");
        setEditContent(lp?.data.content || "");
        setPreview(lp?.data.thumbnail || "");
        setIsEditing(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpdateSubmit = () => {
        const formData = new FormData();
        formData.append('title', editTitle);
        formData.append('content', editContent);
        if (file) formData.append('thumbnail', file);
        updateMutate({ lpid: Number(lpid), formData });
    };

    const isLiked = lp?.data.likes.some((like: any) => like.userId === myInfo?.id);

    if (isPending) return <div className="bg-[#121212] min-h-screen text-white p-10">Loading...</div>;
    if (isError) return <div className="bg-[#121212] min-h-screen text-white p-10">Error!</div>;

    return (
        <div className='flex justify-center items-start min-h-screen bg-[#121212] pt-12 px-4'>
            <div className='w-full max-w-3xl bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/5'>
                
                {/* 헤더: 유저 정보 및 버튼 */}
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
                                <Check size={22} className='cursor-pointer text-green-500' onClick={handleUpdateSubmit} />
                                <X size={22} className='cursor-pointer text-red-500' onClick={() => setIsEditing(false)} />
                            </>
                        ) : (
                            <>
                                <Edit2 size={20} className='cursor-pointer hover:text-white' onClick={handleEditStart} />
                                <Trash2 size={20} className='cursor-pointer hover:text-red-500' onClick={() => window.confirm("삭제하시겠습니까?") && deleteMutate({lpid: Number(lpid)})} />
                            </>
                        )}
                    </div>
                </div>

                {/* 이미지 영역 */}
                <div className='relative w-full aspect-video bg-black flex items-center justify-center group'>
                    <img src={isEditing ? preview : lp?.data.thumbnail} alt="thumbnail" className='max-w-full max-h-full object-contain' />
                    {isEditing && (
                        <div 
                            className='absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity'
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Camera size={40} className='text-white' />
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                        </div>
                    )}
                </div>

                {/* 콘텐츠 영역 */}
                <div className='p-8'>
                    {isEditing ? (
                        <div className='flex flex-col gap-4'>
                            <input 
                                className='bg-transparent border-b border-gray-600 text-2xl font-bold text-white outline-none focus:border-pink-500 pb-2'
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <textarea 
                                className='bg-transparent border border-gray-600 rounded-md p-3 text-gray-300 outline-none focus:border-pink-500 h-32'
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                        </div>
                    ) : (
                        <>
                            <h1 className='text-white text-3xl font-bold mb-4'>{lp?.data.title}</h1>
                            <p className='text-gray-300 text-lg leading-relaxed mb-8'>{lp?.data.content}</p>
                        </>
                    )}

                    <div className='flex items-center justify-between border-t border-white/10 pt-6'>
                        <button onClick={() => isLiked ? dislikeMutate({lpid: Number(lpid)}) : likeMutate({lpid: Number(lpid)})} className='flex items-center gap-2'>
                            <Heart size={30} color={isLiked ? "#ff4b4b" : "white"} fill={isLiked ? "#ff4b4b" : "transparent"} />
                            <span className='text-white text-xl'>{lp?.data.likes.length}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LpDetailPage;