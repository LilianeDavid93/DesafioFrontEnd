import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        login,
        setLogin,
        senha,
        setSenha,
        usuarioLogado,
        setUsuarioLogado,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
