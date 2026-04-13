import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user , setUser] = useState(null);
  const [owners , setOwners] = useState(null);

  const contextValue = { navigate, user, setUser, owners, setOwners };
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};



export default AppContextProvider;