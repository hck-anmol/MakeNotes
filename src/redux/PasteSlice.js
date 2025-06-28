import { createSlice } from '@reduxjs/toolkit'
import { CrossIcon } from 'lucide-react';
import toast from 'react-hot-toast'

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      const exists = state.pastes.findIndex((item) => item.title === paste.title) !== -1;
      if (exists) {
        toast("This paste already exists");
        return;
      }
      if (paste.title == "" || paste.content == "") {
        toast('Invalid Paste');
        return;
      }
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Notes Created Successfully");
    },
    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id == paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Updated Sucessfully")
      }
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id == pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Deleted")
      }
    },
    resetPaste: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, removeFromPaste, resetPaste } = pasteSlice.actions

export default pasteSlice.reducer   