"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbBuildings } from "react-icons/tb";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function Signin() {
    const [code, setCode] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (code.length !== 6) return;

        localStorage.setItem("authCode", code);
        alert("Code Saved Successfully");

        // router.push("/login");
    };

    return (
        <div className="flex items-center justify-center min-h-screen 
    bg-purple-700 px-4">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg 
        w-full max-w-sm sm:max-w-md md:max-w-lg"
            >
                {/* Icon */}
                <div className="flex justify-center">
                    <TbBuildings className="text-blue-500 text-5xl sm:text-6xl" />
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-center mt-4">
                    Waste Management Platform
                </h2>

                <p className="text-gray-500 mt-2 mb-4 text-center text-xs sm:text-sm">
                    Enterprise Optimization System
                </p>

                {/* Info Alert Box */}
                <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 
        rounded-lg px-4 py-3 mb-6 shadow-sm">

                    <AiOutlineInfoCircle className="text-blue-500 text-xl" />

                    <p className="text-sm text-blue-700">
                        Enter the 6-digit code from your authenticator app
                    </p>
                </div>

                {/* Input */}
                <div className="mb-6">
                    <fieldset className="border-2 border-blue-500 rounded-lg px-3">
                        <legend className="px-2 text-xs sm:text-sm text-blue-400">
                            MFA Code*
                        </legend>

                        <input
                            type="text"
                            maxLength={6}
                            required
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            onInvalid={(e) =>
                                e.target.setCustomValidity(
                                    "Enter 6 digit code from your authenticator app"
                                )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}
                            className="w-full py-2 outline-none
              tracking-widest text-lg sm:text-xl"
                        />
                    </fieldset>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded 
          text-sm sm:text-base hover:bg-blue-600 transition"
                >
                    VERIFY
                </button>

                {/* Back */}
                <span
                    onClick={() => router.push("/login")}
                    className="block mt-4 text-sm sm:text-base text-center 
          text-blue-500 cursor-pointer hover:text-blue-800"
                >
                    BACK TO LOGIN
                </span>
            </form>
        </div>
    );
}