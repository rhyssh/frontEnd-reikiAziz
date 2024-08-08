import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'react-feather';
import './Header.css'; // Pastikan Anda menambahkan file CSS ini

const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [opacity, setOpacity] = useState(0.8); // Default opacity 80%
    const [menuOpen, setMenuOpen] = useState(false); // State untuk mengontrol menu hamburger

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;

            // Mengatur visibilitas header
            if (scrollTop > lastScrollTop) {
                setIsVisible(false); // Scroll ke bawah, sembunyikan header
            } else {
                setIsVisible(true); // Scroll ke atas, tampilkan header
            }

            // Mengatur opacity header
            if (scrollTop + windowHeight >= documentHeight) {
                setOpacity(1); // Opacity 100% saat mencapai bagian bawah halaman
            } else if (scrollTop === 0) {
                setOpacity(1); // Opacity 100% saat berada di posisi atas
            } else {
                setOpacity(0.6); // Opacity 80% saat scroll ke bawah
            }

            setLastScrollTop(scrollTop);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollTop]);

    return (
        <header
            className={`fixed z-10 top-0 w-full transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} backdrop-blur-md`}
            style={{ backgroundColor: `rgba(255, 102, 0, ${opacity})` }}
        >
            <nav className="container mx-auto p-4 px-10 flex justify-between items-center relative">
                <div className="text-xl font-bold text-white">Logo</div>

                {/* Icon menu */}
                <div className="block lg:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Menu links (Sidebar for mobile) */}
                <div className={`fixed inset-0 bg-[#ff8533]   z-20 transform transition-transform lg:relative lg:flex lg:space-x-4 lg:bg-transparent lg:space-y-0 ${menuOpen ? 'translate-x-0 h-fit' : 'translate-x-full  '} lg:translate-x-0 `}>
                    <div className="lg:hidden absolute top-4 right-24">
                        <button onClick={() => setMenuOpen(false)} className="text-white focus:outline-none">
                            <X size={24} />
                        </button>
                    </div>
                    <div className={`flex flex-col lg:flex-row lg:space-x-4 lg:space-y-0 space-y-4 lg:mt-0 mt-4 text-white text-center lg:text-left`}>
                        <NavLink onClick={() => setMenuOpen(false)}
                            to="/"
                            className={({ isActive }) =>
                                isActive ? 'underline underline-offset-4 decoration-white decoration-2 ' : ''
                            }
                            end
                        >
                            Work
                        </NavLink>
                        <NavLink
                            to="/about" onClick={() => setMenuOpen(false)}
                            className={({ isActive })  =>
                                isActive ? 'underline underline-offset-4 decoration-white decoration-2' : ''
                            }
                            end
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/services" onClick={() => setMenuOpen(false)}
                            className={({ isActive })  =>
                                isActive ? 'underline underline-offset-4 decoration-white decoration-2' : ''
                            }
                            end
                        >
                            Services
                        </NavLink>
                        <NavLink
                            to="/posts" onClick={() => setMenuOpen(false)}
                            className={({ isActive })  =>
                                isActive ? 'underline underline-offset-4 decoration-white decoration-2' : ''
                            }
                        >
                            Posts
                        </NavLink>
                        <NavLink
                            to="/careers" onClick={() => setMenuOpen(false)}
                            className={({ isActive })  =>
                                isActive ? 'underline underline-offset-4 decoration-white decoration-2' : ''
                            }
                        >
                            Careers
                        </NavLink>
                        <NavLink
                            to="/contact" onClick={() => setMenuOpen(false)}
                            className={({ isActive })  =>
                                isActive ? 'underline underline-offset-4 decoration-white decoration-2' : ''
                            }
                        >
                            Contact
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
