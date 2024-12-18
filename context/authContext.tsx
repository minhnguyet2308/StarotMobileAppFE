import { userLogin } from "@/service/authSevice";
import { ResponseTypeOJ, userLoginResponse, userType } from "@/utils/datatype";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Toast from "react-native-toast-message";

type AuthContextType = {
  user: userType | null;
  changeUserInfo: (formData: userType) => void;
  isAuthenticated: boolean | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  changeUserInfo: (formData: userType) => {},
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

  const checkTokenValidity = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode<{
          sub: string;
          email: string;
          role: string;
          name: string;
          exp: number;
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
        }>(token);

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          const userInfo = {
            sub: decodedToken.sub,
            email: decodedToken.email,
            name: decodedToken.name,
            role: decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
          } as userType;

          setUser(userInfo);
          setIsAuthenticated(true);

          router.push("/");
        } else {
          await logout();
        }
      }
    } catch (error) {
      console.error("Error checking token validity:", error);
      await logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = (await userLogin({
        email: email,
        password: password,
      })) as unknown as ResponseTypeOJ<userLoginResponse>;

      if (res.status === 200) {
        const token = res.data.token;
        const refreshToken = res.data.refreshToken;

        // Store tokens in AsyncStorage
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("refreshToken", refreshToken);

        const decodedToken = jwtDecode<{
          sub: string;
          email: string;
          name: string;
          role: string;
          exp: number;
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
        }>(token);

        const userInfo = {
          sub: decodedToken.sub,
          email: decodedToken.email,
          name: decodedToken.name,
          role: decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
        } as userType;

        setUser(userInfo);
        setIsAuthenticated(true);
        Toast.show({ type: "success", text1: res.message });
        router.push("/");
      } else {
        Toast.show({ type: "error", text1: res.message });
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "Login failed. Please try again." });
    }
  };

  const logout = async () => {
    try {
      // Remove tokens from AsyncStorage
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("refreshToken");

      setUser(null);
      setIsAuthenticated(false);
      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const changeUserInfo = (formData: userType) => {
    setUser(formData);
  };
  useEffect(() => {
    checkTokenValidity();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, changeUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
