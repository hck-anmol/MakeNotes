import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToPaste, updateToPaste } from '../redux/PasteSlice';

const HomePage = () => {
  const [title, settitle] = useState("");
  const [value, setvalue] = useState('');
  const [searchParams, setsearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      settitle(paste.title);
      setvalue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId ||
        Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if (pasteId) {
      //update
      dispatch(updateToPaste(paste));
    }
    else {
      //create
      dispatch(addToPaste(paste));
    }

    //after creation or updation
    settitle("");
    setvalue("");
    setsearchParams({});
  }

  return (
    <div className='flex px-5 py-10 justify-center w-[100%] gap-6 max-md:flex-col max-md:gap-5'>
      <div className='flex flex-col gap-2 w-[45%] max-md:w-[100%]'>
        <input
          className='p-1 rounded-2xl  w-[100%] pl-4 border-2 border-black'
          type='text'
          placeholder='Entet title here'
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <textarea
          className='rounded-2xl mt-4 w-[100%] px-4 border-2 py-3 h-[400px]'
          value={value}
          placeholder='Enter content here'
          onChange={(e) => setvalue(e.target.value)}
          rows={20}
        />
      </div>
      <div className='flex flex-col items-center'>
        <button className='p-2 rounded-2xl place-content-evenly bg-amber-300 active:bg-amber-50 active:border-2 border-amber-300'
          type='text' onClick={() => (
            createPaste()
          )}>
          {pasteId ? "Update My Notes" : "Create Notes"}
        </button>
      </div>
    </div>
  )
}

export default HomePage