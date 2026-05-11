export function Button({children,type = "button"}){
    return (
        <button 
            className="bg-secondary text-white font-medium text-lg rounded-full px-16 py-4 transition-colors duration-200 hover:bg-main" 
            type={type}>
            {children}
        </button>
    )
}