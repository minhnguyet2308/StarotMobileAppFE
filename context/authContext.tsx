import { userLogin } from "@/service/authSevice";
import {
  navigatorType,
  ResponseTypeOJ,
  userLoginResponse,
  userType,
} from "@/utils/datatype";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
import Toast from "react-native-toast-message";

type AuthContextType = {
  user: userType | null;
  isAuthenticated: boolean | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: undefined,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const navigation = useNavigation();
  const [user, setUser] = useState<userType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = async (email: string, password: string) => {
    try {
      const res = (await userLogin({
        email: email,
        password: password,
      })) as unknown as ResponseTypeOJ<userLoginResponse>;
      console.log("res", res);
      if (res.status === 200) {
        const token = res.data.token;
        const refreshToken = res.data.refreshToken;
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("refreshToken", refreshToken);
        const decodedToken = jwtDecode<{
          sub: string;
          email: string;
          role: string;
          exp: number;
        }>(token);
        const userInfo = {
          sub: decodedToken.sub,
          email: decodedToken.email,
          role: decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
        } as userType;

        setUser(userInfo);
        setIsAuthenticated(true);
        Toast.show({ type: "success", text1: res.message });
        if (userInfo.role === "Customer") {
          navigation.navigate("TabNavigator");
        } else {
          navigation.navigate("ReaderNav");
        }
      } else {
        Toast.show({ type: "error", text1: res.message });
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "Login failed. Please try again." });
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
