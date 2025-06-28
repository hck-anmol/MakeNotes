import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/PasteSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setsearchTerm] = useState(""); // Fix: initialize as empty string

  const navigate = useNavigate();

  const filteredData = pastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId))
  }

  return (
    <div className='flex flex-col items-center'>
      <input
        className='p-2 rounded-2xl min-w-[600px] mt-5 border-2'
        type='search'
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setsearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5 mt-5 pb-10'>
        {
          filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div key={paste?._id || paste.title} className='flex flex-col justify-between h-50 py-3 w-140 px-4 border-2 rounded-2xl'>
              <div className='flex flex-row gap-4 place-content-evenly'>
                <button className='bg-emerald-300 py-2 px-3 rounded-xl' onClick={() => { navigate(`/?pasteId=${paste?._id}`) }}>Edit</button>
                <button className='bg-emerald-300 py-2 px-3 rounded-xl' onClick={() => { navigate(`/pastes/${paste?._id}`) }}>View</button>
                <button className='bg-emerald-300 py-2 px-3 rounded-xl' onClick={() => { handleDelete(paste?._id) }}>Delete</button>
                <button className='bg-emerald-300 py-2 px-3 rounded-xl' onClick={() => { navigator.clipboard.writeText(paste?.content), toast.success("Copied") }}>Copy</button>
              </div>
              <div>
                {paste.title}
              </div>
              <div className='truncate'>
                {paste.content}
              </div>
              <div>
                <p>{new Date(paste.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Paste