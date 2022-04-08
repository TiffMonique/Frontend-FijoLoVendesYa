import { createContext } from 'react';

const UserContext = createContext({
    logged: true,
    admin: true,
    cambiarContexto: (logged, admin) => {}
})
export default UserContext;