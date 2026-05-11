'use client';
import { useState } from "react";

export default function Input({
    type = "text",
    name,
    placeholder

}){
    const [value, setValue] = useState("");
    return (
        <input 
            className="bg-white w-lg max-w-full rounded-full px-8 py-4 text-center text-lg font-normal text-[#889893] border-2 border-transparent focus:border-main focus:border-2 focus:outline-none transition-colors duration-200"
            type={type} 
            placeholder={placeholder}
            value={value} 
            autoComplete="off"
            onChange={(e) => setValue(e.target.value)} name={name}/>
    )
}