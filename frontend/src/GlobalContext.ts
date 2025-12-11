import { createContext } from "react";


const GlobalContext = createContext(null as unknown as {
    loggedInUserId: string | null;
    setLoggedInUserId: (id: string | null) => void;
    users:string[] | null;
    setUsers: (users: []) => void;
});

export default GlobalContext;
