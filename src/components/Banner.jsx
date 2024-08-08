// Banner.jsx (Tambahkan efek parallax)
import React, { useEffect } from 'react';
import './Banner.css';

const Banner = ({ imageUrl, title, desc }) => {
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            document.querySelector('.banner-image').style.backgroundPositionY = `${scrollPosition * 0.08}px`;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative overflow-hidden">
            <div className="banner-image bg-center h-[400px] bg-no-repeat" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                    <h1 className="text-white text-4xl font-semibold font-mono  z-10 ">{title}</h1>
                    <p className="text-white text-xl text-center font-semibold font-mono  z-10 ">{desc}</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
