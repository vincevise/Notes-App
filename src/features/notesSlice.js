import { createSlice, nanoid } from "@reduxjs/toolkit";

let initialState = {
    data : []

}

const notesSlice = createSlice({
    name:'notes',
    initialState,
    reducers:{ 
        addNotes:{
            reducer(state,action){
                state.data.push(action.payload)
            },
            prepare(title,content,color){
                return {
                    payload:{
                        id:nanoid(),
                        title,
                        content,
                        color
                    }
                }
            }
        },
        deleteNote(state,action){   
            state.data = state.data.filter((item)=>item.id !== action.payload.id) 
        },
        updateNote(state,action){
            const {id,title,content} = action.payload 
            state.data[(state.data.findIndex((x)=>x.id===id))].title = title 
            state.data[(state.data.findIndex((x)=>x.id===id))].content = content 
        },
        changeColor(state,action){
            console.log(action.payload.id)
              state.data[(state.data.findIndex((x)=>x.id===action.payload.id))].color = action.payload.color
        }, 
    }
})

export const 
notesData = (state) => state.notes;

export const {addNote,deleteNote,changeColor,updateNote,addNotes,searchData} = notesSlice.actions;

export default notesSlice.reducer;

