import {Logo} from "./Logo.tsx";

interface HeaderProps {
    onAddUser?: () => void;
}

export const Header = ({ onAddUser }: HeaderProps) => {
    return (
    <header className="shadow-2xl">
        <div className="max-w-[1440px] mx-auto px-5 py-4 flex items-center flex justify-between">
           <Logo/>
            <span className="hidden desktop:block text-[#0e0eef] font-medium text-[32px] font-bold font-serif">USERS</span>
            <button onClick={onAddUser} className="px-5 py-2.5 rounded-xl bg-[#0e0eef]/90 text-white mr-2.5 cursor-pointer hover:opacity-80">Add user</button>
        </div>
    </header>
    )
}