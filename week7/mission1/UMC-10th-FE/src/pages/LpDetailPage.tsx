import React from 'react'
import { useParams } from 'react-router-dom'
import useGetLpDetail from '../hooks/queries/useGetLpDetail';
import { Heart } from "lucide-react"
import useGetMyInfo from '../hooks/queries/useGetMyInfo';
import { useAuth } from '../context/AuthContext';
import { postLike } from '../../apis/lp';
import { deleteLike } from '../../apis/lp';
import usePostLike from '../hooks/mutations/usePostLike';
import useDeleteLike from '../hooks/mutations/useDeleteLike';

 const LpDetailPage = () => {
    const { accessToken } = useAuth();
     const { lpid } = useParams();
     const { data: lp, 
         isPending, 
         isError } 
     = useGetLpDetail({lpid:Number(lpid)});

     const { data: myInfo } = useGetMyInfo(accessToken);
     //mutate -> 비동기 요청을 실행하고, 콜백함수를 이용해서 후속작업처리함
     //mutateAsync => Promise를 반환해서 await 사용 가능
     const { mutate : likeMutate } = usePostLike();
     const { mutate : dislikeMutate } = useDeleteLike();

     const isLiked = lp?.data.likes
     .map((like) => like.userId)
     .includes(myInfo?.id as number);

    //  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id)

     const handleLikeLp =  () => {
        likeMutate ({lpid:Number(lpid)})
     }

     const handleDeleteLp =  () => {
        dislikeMutate ({lpid:Number(lpid)})
     }

     if(isPending && isError) {
         return <></>
     }

     return (
     <div className='mt-12'>
         <h1>{lp?.title}</h1>
         <img src={lp?.data.thumbnail} alt={lp?.data.title} />
         <p>{lp?.data.content}</p>

         <button onClick={isLiked ? handleDeleteLp : handleLikeLp}>
            <Heart color={isLiked ? "red" : "black"}
            fill={isLiked ? "red" : "transparent"}/>
         </button>
     </div>
   )
 }

export default LpDetailPage