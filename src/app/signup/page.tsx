"use client";
import Link from "next/link";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";



export default function signUpPage() {
  const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
          setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("SIgnup SUccess", response.data);
            toast.success("User created successfully");
            router.push("/login");
        } catch (error: any) {
            console.log("Signup Failed", error);
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
  setButtonDisabled(false);
}else {
  setButtonDisabled(true);
}
    }, [user])



    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800">{loading? "Processing" : "Create an Account"}</h1>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input 
                  id="username"
                  type="text" 
                  value={user.username}
                  onChange={(e) => setUser({...user, username: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  value={user.email}
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input 
                  id="password"
                  type="password" 
                  value={user.password}
                  onChange={(e) => setUser({...user, password: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>
            
            <button 
              onClick={onSignup}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {buttonDisabled ? "Not Sign Up" : "Sign Up"}
            </button>
            
            <div className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Log in
              </Link>
            </div>
          </div>
        </div>
      );
}