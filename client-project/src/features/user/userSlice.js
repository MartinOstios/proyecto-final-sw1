import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    {
            name: "",
            lastname: "",
            email: "",
            password: "",
            active: true,
            avatar: null,
            address: "",
            role: "",
    }
];

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUsers: (state, action) => {
            const { name, lastname, email, password, active, avatar, address, role } = action.payload;
            state.push({
                name: name,
                lastname: lastname,
                email: email,
                password: password,
                avatar: avatar,
                address: address,
                role: role,
            });
        },
        editUsers: (state, action) => {
            const { name, lastname, email, password, avatar, address } = action.payload;
            const user = state.find(user => user.email === email);
            if (user) {
                user.name = name;
                user.lastname = lastname;
                user.email = email;
                user.password = password;
                user.avatar = avatar;
                user.address = address;
            }
        }
    }
});

export const { addUsers, editUsers } = userSlice.actions;

export default userSlice.reducer;