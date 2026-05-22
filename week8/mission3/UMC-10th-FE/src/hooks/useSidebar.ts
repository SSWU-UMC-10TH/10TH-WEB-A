import { useState, useEffect } from "react";

const useSidebar = () => {
    const [isSideOpen, setIsSideOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isSideOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isSideOpen]);

    const open = () => setIsSideOpen(true);
    const close = () => setIsSideOpen(false);
    const toggle = () => setIsSideOpen((prev) => !prev);

    return { isSideOpen, open, close, toggle }
}

export default useSidebar