
const HamburgerMenu = ({handleNavToggle, navOpen}) => {

    return (
        <button className="relative flex items-center justify-center overflow-hidden" onClick={handleNavToggle}>
            <div className="flex flex-col justify-center gap-[6px] w-[24px] h-[24px] transform transition-all duration-300 origin-center overflow-hidden">
                <div className={"bg-black h-[2px] w-7 transform transition-all duration-300 origin-left "  + (navOpen && "translate-x-10")}></div>
                <div className={"bg-black h-[2px] w-7 rounded transform transition-all duration-300 delay-75 " + (navOpen && "translate-x-10")}></div>
                <div className={"bg-black h-[2px] w-7 transform transition-all duration-300 origin-left delay-150 "  + (navOpen && "translate-x-10")}></div>

                <div className={"absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 flex w-0 " + (navOpen && "w-12 translate-x-0")}>
                    <div className={"absolute bg-black h-[2px] w-6 transform transition-all duration-500 rotate-0 delay-300 " + (navOpen && "rotate-45")}></div>
                    <div className={"absolute bg-black h-[2px] w-6 transform transition-all duration-500 -rotate-0 delay-300 " + (navOpen && "-rotate-45")}></div>
                </div>
            </div>
        </button>
    )
}

export default HamburgerMenu