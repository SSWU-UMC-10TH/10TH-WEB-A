// // import React from 'react';
// // import { data, Link } from 'react-router-dom'; // useActionData는 사용하지 않으므로 삭제
// // import { useAuth } from '../context/AuthContext';
// // import { useEffect, useState } from 'react';
// // import { getMyInfo } from '../../apis/auth';
// // import type { ResponseMyInfoDto } from '../types/auth';
// // import { useQuery } from '@tanstack/react-query';
// // import { QUERY_KEY } from '../constants/key';

// // const Nav = () => {
// //   const { accessToken } = useAuth();

// //   const { data: userData, isSuccess } = useQuery({
// //     queryKey: [QUERY_KEY.user, accessToken], // 유저 키와 토큰을 키로 설정
// //     queryFn: getMyInfo,
// //   });
  
// //   return (
// //     <div className='flex justify-between bg-gray-900 p-8'>
// //         <h1 className='text-pink-500 text-2xl font-bold'>돌려돌려LP판</h1>
// //         <div className="flex gap-4">

// //             {!accessToken && (
// //               <>
// //                 <Link to='/login'>
// //                   <button className="px-4 py-1 text-sm bg-black text-white rounded-sm">로그인</button>
// //                 </Link>
// //                 <Link to='/signup'>
// //                   <button className="px-4 py-1 text-sm bg-pink-500 text-white rounded-sm">회원가입</button>
// //                 </Link>
// //               </>
// //             )}
// //             <div className="px-4 py-1 text-sm bg-black-900 text-white rounded-sm">{data.data?.name}님 반갑습니다.</div>
// //             {accessToken && (
// //               <Link to='/logout'>
// //                 <button className="px-4 py-1 text-sm bg-black-900 text-white rounded-sm">로그아웃</button>
// //               </Link>
// //             )}
            
// //             {/* {accessToken && (
// //               <Link to='/mypage'>
// //                 <button className="px-4 py-1 text-sm bg-black text-white rounded-sm">마이페이지</button>
// //               </Link>
// //             )}
// //             <Link to='/search'>
// //                 <button className="px-4 py-1 text-sm bg-black text-white rounded-sm">검색</button>
// //             </Link> */}
// //         </div>
// //     </div>
// //   );
// // };

// // export default Nav;

// import React, { use, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useQuery } from '@tanstack/react-query';
// import { getMyInfo } from '../../apis/auth';
// import { QUERY_KEY } from '../constants/key'; 
// import sidebar_icon from '../assets/hamburger-button.svg'

// const Nav = ({ onClick }) => {
//   const { accessToken } = useAuth();

//   const { data: userData, isSuccess } = useQuery({
//     queryKey: [QUERY_KEY.user, accessToken], 
//     queryFn: getMyInfo,
//     enabled: !!accessToken, // 토큰이 없으면 호출 안 함
//   });
 
//   return (
//     <div className='flex justify-between items-center bg-gray-900 p-8'>
      
//       <svg 
//       onClick={onClick} 
//       width="48" 
//       height="48" 
//       viewBox="0 0 48 48" 
//       xmlns="http://www.w3.org/2000/svg"
//       className="inline-block text-white cursor-pointer"
//     >
//       <path 
//         fill="none" 
//         stroke="currentColor" 
//         strokeLinecap="round" 
//         strokeLinejoin="round" 
//         strokeWidth="4" 
//         d="M7.95 11.95h32m-32 12h32m-32 12h32"
//       />
//     </svg>
//       <Link to='/'>
//         <h1 className='text-pink-500 text-2xl font-bold cursor-pointer'>돌려돌려LP판</h1>
//       </Link>
      
//       <div className="flex gap-4 items-center">
//         {!accessToken && (
//           <>
//             <Link to='/login'>
//               <button className="px-4 py-1 text-sm bg-black text-white rounded-sm border border-gray-700">로그인</button>
//             </Link>
//             <Link to='/signup'>
//               <button className="px-4 py-1 text-sm bg-pink-500 text-white rounded-sm">회원가입</button>
//             </Link>
//           </>
//         )}

//         {accessToken && (
//           <>
//             {isSuccess && userData && (
//               <span className="text-sm text-white font-medium">
//                 <span className="text-white">{userData.data.name}</span>님 반갑습니다.
//               </span>
//             )}
                        
//             <Link to='/logout'>
//               <button className="px-4 py-1 text-sm bg-gray-900 text-white rounded-sm">로그아웃</button>
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Nav;

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../../apis/auth';
import { QUERY_KEY } from '../constants/key';

const Nav = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { accessToken } = useAuth();

  const { data: userData, isSuccess } = useQuery({
    queryKey: [QUERY_KEY.user, accessToken],
    queryFn: getMyInfo,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });

  return (
    <nav className='flex justify-between items-center bg-gray-900 p-8 sticky top-0 z-50'>
      <div className="flex items-center gap-4">
        {/* 햄버거 버튼 */}
        <svg 
          onClick={onMenuClick} 
          width="40" height="40" viewBox="0 0 48 48" 
          className="text-white cursor-pointer"
        >
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M7.95 11.95h32m-32 12h32m-32 12h32"/>
        </svg>
        
        <Link to='/'>
          <h1 className='text-pink-500 text-2xl font-bold'>돌려돌려 LP판</h1>
        </Link>
      </div>
      
      <div className="flex gap-4 items-center">
        {!accessToken ? (
          <>
            <Link to='/login'><button className="text-white text-sm">로그인</button></Link>
            <Link to='/signup'><button className="bg-pink-500 text-white px-4 py-1 rounded-sm text-sm">회원가입</button></Link>
          </>
        ) : (
          <>
            {isSuccess && userData && (
              <span className="text-white text-sm">
                <span className="font-bold">{userData.data?.name}</span>님 반갑습니다.
              </span>
            )}
            <Link to='/logout'><button className="text-white text-sm">로그아웃</button></Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;