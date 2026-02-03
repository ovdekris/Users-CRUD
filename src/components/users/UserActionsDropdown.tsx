import { useRef, useEffect, useState } from "react";
import type { User } from "../../types/user";

interface UserActionsDropdownProps {
    user: User;
    onDetails?: (user: User) => void;
    onEdit: () => void;
    onDelete: (user: User) => void;
    onViewPosts?: (userId: number) => void;
}

const UserActionsDropdown = ({user, onDetails, onEdit, onDelete, onViewPosts}: UserActionsDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 978);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 978);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && buttonRef.current && !dropdownRef.current.contains(e.target as Node) && !buttonRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isMobile || !isOpen || !buttonRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    setIsOpen(false);
                }
            },
            { threshold: 0 }
        );

        observer.observe(buttonRef.current);
        return () => observer.disconnect();
    }, [isMobile, isOpen]);


    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    }

    const handleEdit = () => {
        setIsOpen(false);
        onEdit();
    };

    const handleDelete = () => {
        setIsOpen(false);
        onDelete(user);
    };

    const handleViewPosts = () => {
        setIsOpen(false);
        onViewPosts?.(user.id);
    };

    const handleDetails = () => {
        setIsOpen(false);
        onDetails?.(user);
    }

    return (
        <div onMouseEnter={!isMobile ? () => setIsOpen(true) : undefined} onMouseLeave={!isMobile ? () => setIsOpen(false) : undefined} className="relative">
            <button ref={buttonRef} onClick={toggleDropdown} className="flex flex-row gap-1 desktop:flex-col cursor-pointer desktop:gap-1 p-1 rounded-md transition duration-200 z-10" aria-label="User actions">
                <div className="w-1 h-1 rounded-full bg-[#0e0eef] group-hover:bg-white transition duration-300"></div>
                <div className="w-1 h-1 rounded-full bg-[#0e0eef] group-hover:bg-white transition duration-300"></div>
                <div className="w-1 h-1 rounded-full bg-[#0e0eef] group-hover:bg-white transition duration-300"></div>
            </button>
            {isOpen && (
                <div className="absolute desktop:right-4 right-7 top-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                    {onViewPosts && (
                        <button  onClick={handleViewPosts} className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f0f0ff] hover:text-[#0e0eef] transition duration-150 flex items-center gap-2 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0
                                2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                            View Posts
                        </button>

                    )}
                    <button onClick={handleEdit} className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f0f0ff] hover:text-[#0e0eef] transition duration-150 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit
                    </button>
                    <button onClick={handleDelete} className="w-full cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition duration-150 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                        Delete
                    </button>
                    {onDetails && (
                        <button onClick={handleDetails} className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f0f0ff] hover:text-[#0e0eef] transition duration-150 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="16" x2="12" y2="12" />
                                <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                            Details
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export { UserActionsDropdown };