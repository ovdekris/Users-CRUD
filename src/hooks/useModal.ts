import { useState, useCallback } from 'react';

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState<any>(null);

    const open = useCallback((data?: any) => {
        setModalData(data);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setModalData(null);
    }, []);

    return {
        isOpen,
        modalData,
        open,
        close,
    };
};