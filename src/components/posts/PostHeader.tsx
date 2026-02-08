import {useNavigate} from "react-router-dom";
import {Logo} from "../common/Logo.tsx";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import {ROUTES} from "../../utils/constants.ts";

interface PostHeaderProps {
    userName?: string;
}

//Header for post list
export const PostHeader = ({userName}: PostHeaderProps) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(ROUTES.HOME);
    };

    return (
        <header className="shadow-2xl">
            <div className="max-w-[1440px] mx-auto px-5 py-4 flex items-center justify-between">
                <Logo/>
                <span className="hidden desktop:block text-[#0e0eef] font-medium text-[32px] font-bold font-serif">
                    {userName ? `${userName}'s Posts` : "Posts"}
                </span>
                <button onClick={handleBack} className="px-5 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer">
                    <ArrowLeftCircleIcon className="w-[40px] h-[40px] text-[#0e0eef] hover:opacity-80" />
                </button>
            </div>
        </header>
    );
};
