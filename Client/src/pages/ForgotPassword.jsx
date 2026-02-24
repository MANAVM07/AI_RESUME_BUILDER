import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react'
import React, { useState } from 'react'
import api from '../config/api'
import toast from 'react-hot-toast'

const ForgotPassword = ({ onBack }) => {
    const [email, setEmail] = useState('')
    const [isSent, setIsSent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            // Placeholder for actual API call
            // const { data } = await api.post('/api/users/forgot-password', { email })

            // Simulating a successful request for now
            setTimeout(() => {
                setIsSent(true)
                setIsLoading(false)
                toast.success("Reset link sent to your email!")
            }, 1500)

        } catch (error) {
            setIsLoading(false)
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }

    if (isSent) {
        return (
            <div className="text-center py-10">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-green-100 rounded-full">
                        <ShieldCheck size={40} className="text-green-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
                <p className="text-gray-500 mb-8">
                    We've sent a password reset link to <br />
                    <span className="font-semibold text-gray-900">{email}</span>
                </p>
                <button
                    onClick={onBack}
                    className="w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                    <ArrowLeft size={18} /> Back to Login
                </button>
            </div>
        )
    }

    return (
        <div className="text-center py-6">
            <h1 className="text-gray-900 text-3xl font-medium">Forgot Password</h1>
            <p className="text-gray-500 text-sm mt-3">Enter your email and we'll send you a link to reset your password.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="flex items-center w-full hover:border-green-500 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <Mail size={16} className='text-gray-500' />
                    <input
                        type="email"
                        placeholder="Email id"
                        className="w-full placeholder:text-gray-500 border-none outline-none ring-0"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50"
                >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                </button>

                <button
                    type="button"
                    onClick={onBack}
                    className="text-gray-500 text-sm hover:text-green-500 flex items-center justify-center gap-1 mx-auto"
                >
                    <ArrowLeft size={14} /> Back to Login
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword
