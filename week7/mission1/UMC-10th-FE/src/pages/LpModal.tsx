import React, { useState, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postLp } from '../../apis/lp'

const LpModal = ({ lp, onClick }) => { 
  const queryClient = useQueryClient();
  
  const [preview, setPreview] = useState(lp?.thumbnail || '');
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 분리된 API 함수(postLp)를 mutationFn에 연결
  const { mutate } = useMutation({
    mutationFn: postLp, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      onClick(); // 모달 닫기
    },
    onError: (error) => {
      alert("LP 등록에 실패했습니다.");
      console.error(error);
    }
  });

  const handleAddLp = () => {
    if (!name || !content) return alert("이름과 내용을 입력해주세요.");

    const formData = new FormData();
    formData.append('title', name); 
    formData.append('description', content); 
    tags.forEach(tag => formData.append('tags[]', tag)); 
    
    if (file) {
      formData.append('file', file);
    }
    
    mutate(formData);
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='relative bg-gray-800 p-8 rounded-lg'>
        <button className='absolute top-2 right-2 text-gray-400' onClick={onClick}> X </button>
        
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48 cursor-pointer overflow-hidden rounded-lg" onClick={() => fileInputRef.current.click()}>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center bg-[#2a2a2a]">
                <div className="absolute inset-0 rounded-full border-[6px] border-[#111]"></div>
                <div className="w-12 h-12 bg-white rounded-full border-[5px] border-[#111]"></div>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-4'>
            <input 
              className='w-full border-2 text-gray-600 rounded-sm p-2' 
              type="text" 
              placeholder='LP Name' 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              className='w-full border-2 text-gray-600 rounded-sm p-2' 
              type="text" 
              placeholder='LP Content' 
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className='w-full flex gap-2'>
                <input 
                  className='flex-1 border-2 text-gray-600 rounded-sm p-2' 
                  type="text" 
                  placeholder='LP Tag' 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                />
                <button className='h-10 rounded-sm w-20 bg-gray-400 text-white' onClick={addTag}>Add</button>
            </div>

            <div className='flex flex-wrap gap-2'>
                {tags.map((tag) => (
                    <span key={tag} className="bg-gray-700 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="text-white font-bold ml-1">x</button>
                    </span>
                ))}
            </div>

            <button 
              className='h-10 rounded-sm w-full bg-gray-400 text-white' 
              onClick={handleAddLp}
            >
              Add LP
            </button>
        </div>
      </div>
    </div>
  )
}

export default LpModal