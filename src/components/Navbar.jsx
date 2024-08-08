import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsVisible(scrollTop < lastScrollTop || scrollTop === 0);
            setLastScrollTop(scrollTop);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollTop]);

    return (
        <header className={`fixed top-0 w-full transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-opacity-80 backdrop-blur-md`}>
            <nav className="container mx-auto p-4 flex justify-between items-center">
                <div className="text-xl font-bold">Logo</div>
                <div className="flex space-x-4">
                    <a href="/">
                        <p>Home</p>
                    </a>
                    <NavLink
                        to="/posts"
                        className={({ isActive }) =>
                            isActive ? 'text-blue-500' : ''
                        }
                    >
                        Posts
                    </NavLink>
                    {/* Add more links as needed */}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
