import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);
  const navigate = useNavigate();

  const [title, settitle] = useState("");
  const [value, setvalue] = useState("");

  useEffect(() => {
    if (paste) {
      settitle(paste.title);
      setvalue(paste.content);
    }
  }, [paste]);

  if (!paste) {
    return <div>Paste not found</div>;
  }

  return (
    <div>
      <div className='flex px-5 py-10 justify-center w-[100%] gap-6 max-md:flex-col max-md:gap-5'>
        <div className='flex flex-col gap-2 w-[45%] max-md:w-[100%]'>
          <input
            disabled
            className='p-1 rounded-2xl  w-[100%] pl-4 border-2 border-black'
            type='text'
            placeholder='Entet title here'
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
          <textarea
            disabled
            className='rounded-2xl mt-4 w-[100%] px-4 border-2 py-3 h-[400px]'
            value={value}
            placeholder='Enter content here'
            onChange={(e) => setvalue(e.target.value)}
            rows={20}
          />
        </div>
        <div className='flex flex-col items-center'>
          <button className='px-6 py-2 rounded-2xl  bg-amber-300 active:bg-amber-50 active:border-2 border-amber-300'
            onClick={() => { navigate(`/?pasteId=${paste?._id}`) }}>
            Edit
          </button>
        </div>
      </div>
    </div >
  )
}

export default ViewPaste