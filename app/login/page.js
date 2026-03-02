"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbBuildings } from "react-icons/tb";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) return;

        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);

        router.push("/signin");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-purple-700 px-4">

            <form
                onSubmit={handleSubmit}
                className="
          bg-white 
          p-6 
          sm:p-8 
          rounded-2xl 
          shadow-lg 
          w-full 
          max-w-sm 
          sm:max-w-md 
          md:max-w-lg
        "
            >
                {/* Icon */}
                <div className="flex justify-center">
                    <TbBuildings className="text-blue-500 text-5xl sm:text-6xl" />
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-center mt-4">
                    Waste Management Platform
                </h2>

                <p className="text-gray-500 text-center text-xs sm:text-sm mt-2 mb-6">
                    Enterprise Optimization System
                </p>

                {/* Email */}
                <div className="mb-5">
                    <fieldset className="border-2 border-blue-500 rounded px-3">
                        <legend className="px-2 text-xs sm:text-sm text-blue-400">
                            Email Address*
                        </legend>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full py-2 outline-none text-sm sm:text-base"
                        />
                    </fieldset>
                </div>

                {/* Password */}
                <div className="relative mb-6">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password *"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="
              w-full 
              px-4 
              py-2 
              border 
              rounded 
              text-sm 
              sm:text-base
              focus:ring-2 
              focus:ring-blue-500 
              outline-none
            "
                    />

                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="
              absolute 
              right-3 
              top-2.5 
              cursor-pointer 
              text-lg 
              sm:text-xl 
              text-gray-600
            "
                    >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="
            w-full 
            bg-blue-500 
            text-white 
            py-2 
            rounded 
            text-sm 
            sm:text-base 
            hover:bg-blue-600 
            transition
          "
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}