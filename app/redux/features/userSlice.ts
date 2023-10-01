import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    id: null,
    nombre: null,
    apellido: null,
    correo: null,
    rol: null,
    token: null,

}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
       
    reducers: {
        addUser:(state, action) => {
            state.id = action.payload.id;
            state.nombre = action.payload.nombre;
            state.apellido = action.payload.apellido;
            state.correo = action.payload.correo;
            state.rol = action.payload.rol;
            state.token = action.payload.token;
        },
        deleteUser:(state, action) => {
            state.id = null;
            state.nombre = null;
            state.apellido = null;
            state.correo = null;
            state.rol = null;
            state.token = null;
        },
        updateUser:(state, action) => {
            state.id = action.payload.id;
            state.nombre = action.payload.nombres;
            state.apellido = action.payload.apellidos;
            state.correo = action.payload.correo;
            state.rol = action.payload.rol;
            state.token = action.payload.token;
         }
    }
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
//export const { addUser } = userSlice.actions;

export default userSlice.reducer;