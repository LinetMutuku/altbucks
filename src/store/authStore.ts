import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { API_URL } from "@/lib/utils";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  isTaskCreator?: boolean;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isTaskCreator: boolean;
  error: string | null;
  isLoading: boolean;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    confirmPassword: string
  ) => Promise<void>;
  signuptaskcreator: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    confirmPassword: string
  ) => Promise<void>;
  profileAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isTaskCreator: false,
      error: null,
      isLoading: false,

      loginWithEmailAndPassword: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await axios.post(
            `${API_URL}/users/login`,
            { email, password },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.data) {
            console.log("Login Response:", response.data.data.isTaskCreator);

            set({
              user: response.data.user || { email },
              isTaskCreator: response.data.data.isTaskCreator,
              isAuthenticated: true,
              error: null,
              isLoading: false,
            });

            localStorage.setItem("authToken", response.data.token);
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Failed to login";
          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
            user: null,
          });
          throw error;
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;

          const userInfo = {
            email: user.email!,
            firstName: user.displayName?.split(" ")[0] || "",
            lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
            photoURL: user.photoURL,
          };

          const response = await axios.post(`${API_URL}/users/google-auth`, {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
          });

          if (response.data && response.data.token) {
            localStorage.setItem("authToken", response.data.token);
            document.cookie = `authToken=${response.data.token}; path=/; max-age=86400; SameSite=Strict`;
          }

          set({
            user: userInfo,
            isAuthenticated: true,
            error: null,
            isLoading: false,
          });

          const firebaseToken = await user.getIdToken();
          localStorage.setItem("firebaseToken", firebaseToken);
        } catch (error: any) {
          console.error("Google login error:", error);
          set({
            error: error.message,
            isLoading: false,
            isAuthenticated: false,
            user: null,
          });
          throw error;
        }
      },

      signup: async (
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        confirmPassword
      ) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await axios.post(`${API_URL}/users/earn`, {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            confirmPassword,
          });

          if (data) {
            set({
              user: data,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            localStorage.setItem("authToken", data.token);
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Error signing up",
            isLoading: false,
            isAuthenticated: false,
            user: null,
          });
          throw error;
        }
      },

      signuptaskcreator: async (
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        confirmPassword
      ) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await axios.post(`${API_URL}/users/create`, {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            confirmPassword,
          });

          if (data) {
            set({
              user: data,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Error signing up",
            isLoading: false,
            isAuthenticated: false,
            user: null,
          });
          throw error;
        }
      },

      profileAuth: async () => {
        set({ isLoading: true, error: null });
        try {
          const token = localStorage.getItem("authToken");

          const { data } = await axios.get(`${API_URL}/users/user-profile`, {
            Credentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userData = data.profile || data.user || null;

          if (userData) {
            set({
              user: userData,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              error: "No user data found in response",
              isAuthenticated: false,
              isLoading: false,
              user: null,
            });
          }
        } catch (error) {
          console.error("Profile fetch error:", error);
          set({
            error:
              error.response?.data?.message || "Failed to load profile",
            isAuthenticated: false,
            isLoading: false,
            user: null,
          });
        }
      },

      logout: async () => {
        try {
          await auth.signOut();
          localStorage.removeItem("authToken");
          localStorage.removeItem("firebaseToken");
          document.cookie =
            "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

          set({
            user: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,
          });
        } catch (error: any) {
          console.error("Logout error:", error);
          set({ error: "Logout failed" });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
















// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import axios from "axios";
// import { API_URL } from "@/lib/utils";
// import { signInWithPopup } from 'firebase/auth';
// import { auth, googleProvider } from '@/firebase/config';

// interface User {
//     email: string;
//     firstName?: string;
//     lastName?: string;
//     phoneNumber?: string;
//     isTaskCreator?: boolean;
//     [key: string]: any;
// }

// interface AuthState {
//     user: User | null;
//     isAuthenticated: boolean;
//     isTaskCreator: boolean;
//     error: string | null;
//     isLoading: boolean;
//     loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
//     loginWithGoogle: () => Promise<void>;
//     signup: (email: string, password: string, firstName: string, lastName: string, phoneNumber: string, confirmPassword: string) => Promise<void>;
//     signuptaskcreator: (email: string, password: string, firstName: string, lastName: string, phoneNumber: string, confirmPassword: string) => Promise<void>;
//     profileAuth: () => Promise<void>;
//     logout: () => Promise<void>;
// }


// export const useAuthStore = create<AuthState>()(
//     persist(
//         (set, get) => ({
//             user: null,
//             isAuthenticated: false,
//             isTaskCreator: false,
//             error: null,
//             isLoading: false,
//         })
//     )
    

//     loginWithEmailAndPassword: async (email: string, password: string) => {
//         set({ isLoading: true, error: null });
    
//         try {
//             const response = await axios.post(
//                 `${API_URL}/users/login`,
//                 { email, password }, 
//                 {
//                     headers: { "Content-Type": "application/json" }
//                 }
//             );
    
//             if (response.data) {
//                 console.log("Login Response:", response.data);
    
              
//                 set({
//                     user: response.data.user || { email },
//                     isTaskCreator: response.data.isTaskCreator,
//                     isAuthenticated: true,
//                     error: null,
//                     isLoading: false
//                 });
//             }
//         } catch (error: any) {
//             const errorMessage = error.response?.data?.message || "Failed to login";
//             set({
//                 error: errorMessage,
//                 isLoading: false,
//                 isAuthenticated: false,
//                 user: null
//             });
//             throw error;
//         }
//     },
    

//     // loginWithEmailAndPassword: async (email: string, password: string) => {
//     //     set({ isLoading: true, error: null });
//     //     try {
//     //         const token = localStorage.getItem('authToken');
//     //         const response = await axios.post(`${API_URL}/users/login`, {
//     //             credentials:true,
//     //             headers: {
//     //                 'Authorization': `Bearer ${token}`
//     //             },
//     //             email,
//     //             password
//     //         });

//     //         if (response.data) {
//     //             console.log(response.data)
                
//     //             const token = response.data.token;
//     //             // const decoded = jwt_decode(token);
//     //             // console.log("decoded:")
//     //             set({
//     //                 user: response.data.user || { email },
//     //                 isAuthenticated: true,
//     //                 error: null,
//     //                 isLoading: false
//     //             });

//     //             if (response.data.token) {
//     //                 localStorage.setItem('authToken', response.data.token);
//     //             }
//     //         }
//     //     } catch (error: any) {
//     //         const errorMessage = error.response?.data?.message || "Failed to login";
//     //         set({
//     //             error: errorMessage,
//     //             isLoading: false,
//     //             isAuthenticated: false,
//     //             user: null
//     //         });
//     //         throw error;
//     //     }
//     // },




//     loginWithGoogle: async () => {
//         set({ isLoading: true, error: null });
//         try {
//             const result = await signInWithPopup(auth, googleProvider);
//             const user = result.user;

//             const userInfo = {
//                 email: user.email!,
//                 firstName: user.displayName?.split(' ')[0] || '',
//                 lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
//                 photoURL: user.photoURL
//             };

//             // Register the Google user with your backend
//             try {
//                 const response = await axios.post('/users/google-auth', {
//                     email: user.email,
//                     displayName: user.displayName,
//                     photoURL: user.photoURL,
//                     uid: user.uid
//                 });

//                 if (response.data && response.data.token) {
//                     localStorage.setItem('authToken', response.data.token);
//                     document.cookie = `authToken=${response.data.token}; path=/; max-age=86400; SameSite=Strict`;
//                 }
//             } catch (backendError) {
//                 console.error('Backend registration after Google login failed:', backendError);
//             }

//             set({
//                 user: userInfo,
//                 isAuthenticated: true,
//                 error: null,
//                 isLoading: false
//             });

//             const firebaseToken = await user.getIdToken();
//             localStorage.setItem('firebaseToken', firebaseToken);

//         } catch (error: any) {
//             console.error('Google login error:', error);
//             set({
//                 error: error.message,
//                 isLoading: false,
//                 isAuthenticated: false,
//                 user: null
//             });
//             throw error;
//         }
//     },




//     signup: async (email, password, firstName, lastName, phoneNumber, confirmPassword) => {
//         set({ isLoading: true, error: null });
//         try {
//             const { data } = await axios.post(`${API_URL}/users/earn`, {
//                 email, password, firstName, lastName, phoneNumber, confirmPassword
//             });

//             if (data) {
//                 set({
//                     user: data,
//                     isAuthenticated: true,
//                     isLoading: false,
//                     error: null
//                 });

//                 if (data.token) {
//                     localStorage.setItem('authToken', data.token);
//                     document.cookie = `authToken=${data.token}; path=/; max-age=86400; SameSite=Strict`;
//                 }
//             }
//         } catch (error: any) {
//             set({
//                 error: error.response?.data?.message || "Error signing up",
//                 isLoading: false,
//                 isAuthenticated: false,
//                 user: null
//             });
//             throw error;
//         }
//     },

//     signuptaskcreator: async (email, password, firstName, lastName, phoneNumber, confirmPassword) => {
//         set({ isLoading: true, error: null });
//         try {
//             const { data } = await axios.post(`${API_URL}/users/create`, {
//                 email, password, firstName, lastName, phoneNumber, confirmPassword
//             });

//             if (data) {
//                 set({
//                     user: data,
//                     isAuthenticated: true,
//                     isLoading: false,
//                     error: null
//                 });

//                 // if (data.token) {
//                 //     localStorage.setItem('authToken', data.token);
//                 //     document.cookie = `authToken=${data.token}; path=/; max-age=86400; SameSite=Strict`;
//                 // }
//             }
//         } catch (error: any) {
//             set({
//                 error: error.response?.data?.message || "Error signing up",
//                 isLoading: false,
//                 isAuthenticated: false,
//                 user: null
//             });
//             throw error;
//         }
//     },


//     profileAuth: async () => {
//         set({ isLoading: true, error: null });
//         try {
//             const token = localStorage.getItem('authToken');

//             const { data } = await axios.get(`${API_URL}/users/user-profile`, {
//                 Credentials: true,
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             // Extract user data from the response based on structure
//             const userData = data.profile || data.user || null;

//             if (userData) {
//                 set({
//                     user: userData,
//                     isAuthenticated: true,
//                     isLoading: false,
//                     error: null
//                 });
//             } else {
//                 set({
//                     error: "No user data found in response",
//                     isAuthenticated: false,
//                     isLoading: false,
//                     user: null
//                 });
//             }
//         } catch (error) {
//             console.error('Profile fetch error:', error);
//             set({
//                 error: error.response?.data?.message || "Failed to load profile",
//                 isAuthenticated: false,
//                 isLoading: false,
//                 user: null
//             });
//         }
//     },


//     logout: async () => {
//         try {
//             try {
//                 await auth.signOut();
//             } catch (e) {
//                 console.log('Firebase logout error:', e);
//             }

//             // Clear tokens
//             localStorage.removeItem('authToken');
//             localStorage.removeItem('firebaseToken');

//             // Clear cookie
//             document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

//             set({
//                 user: null,
//                 isAuthenticated: false,
//                 error: null,
//                 isLoading: false
//             });
//         } catch (error: any) {
//             console.error('Logout error:', error);
//             set({ error: "Logout failed" });
//             throw error;
//         }
//     }
// }));