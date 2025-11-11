import React from 'react'

const Header = () => {
    return (
        <>
            <header>
                <div className="container mx-auto z-10 flex justify-between items-center py-6 text-white">
                    <div className="text-3xl font-bold tracking-widest">
                        <span className="text-indigo-500">Loc</span>
                        Language
                    </div>

                    <nav>
                        <ul className="flex space-x-8 text-lg font-semibold">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-300 transform hover:scale-105 transition-all duration-300"
                                >
                                    Trang chủ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-300 transform hover:scale-105 transition-all duration-300"
                                >
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-300 transform hover:scale-105 transition-all duration-300"
                                >
                                    Khóa học
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-300 transform hover:scale-105 transition-all duration-300"
                                >
                                    Liên hệ
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex items-center space-x-3">
                        <span>Xin chào, Phước Lộc</span>
                        <img
                            src="/img/avatar.png"
                            alt="avatar"
                            className="w-10 h-10 rounded-full border-2 border-white"
                        />
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
