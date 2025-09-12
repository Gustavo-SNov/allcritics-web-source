"use client"

import React, {useState} from "react"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {LogIn,  UserPlus} from "lucide-react"
import {AuthData} from "@/types/Auth";


const AuthModal = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [open, setOpen] = useState(false)
    const [data, setData] = useState<AuthData>({ username: "", email: "", password: "" })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        console.log(data);

        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"
                        className="bg-transparent border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                    Sign in
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-3">
                        {!isLogin && (
                            <Input
                                name="username"
                                placeholder="Username"
                                value={data.username}
                                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                                onChange={handleChange}
                            />
                        )}
                        <Input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={handleChange}
                            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={handleChange}
                            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                        />
                    </div>
                    <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={(event) => handleSubmit(event)}
                    >
                        {isLogin ? (
                            <>
                                <LogIn className="w-4 h-4 mr-2"/>
                                Sign In
                            </>
                        ) : (
                            <>
                                <UserPlus className="w-4 h-4 mr-2"/>
                                Create Account
                            </>
                        )}
                    </Button>
                    <div className="text-center">
                        <Button
                            variant="link"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-purple-400 hover:text-purple-300"
                        >
                            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AuthModal;