"use client"

import { useCallback, useState } from "react"
import { Avatar } from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItems from "./MenuItems";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { LuLayoutDashboard, LuLogIn, LuLogOut, LuUserPlus } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";

import NullData from "../NullData";

const UserMenu = () => {

    const { currentUser, logout } = useContext(AuthContext) || {};
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev)
    }, []);

    return (
        <>
            <div
                className="relative z-30"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                {/* Button area */}
                <div
                    className="p-2 flex flex-row items-center gap-2
                      cursor-pointer hover:bg-slate-700 hover:border hover:rounded-md hover:text-white"
                >
                    <Avatar />
                    {currentUser ? (currentUser.name || "User") : "Login"}
                    <AiFillCaretDown
                        className={`
                            text-sm transform transition-all duration-300
                            ${isOpen ? "rotate-180" : "rotate-0"}`}

                    />
                </div>
                {isOpen && (
                    <div className="absolute
                  rounded-md
                  shadow-md
                  w-[200px]
                  bg-white
                  overflow-hidden
                  right-0
                  text-sm
                  flex
                  flex-col
                  cursor-pointer
                  ">
                        {
                            currentUser ? (
                                <div>
                                    <Link href="/orders">
                                        <MenuItems onClick={toggleOpen}>
                                            <FiShoppingBag className="inline-block text-lg" />
                                            Your Orders
                                        </MenuItems>
                                    </Link>

                                    {currentUser.role === "ADMIN" && (
                                        <Link href="/admin">
                                            <MenuItems onClick={toggleOpen}>
                                                <LuLayoutDashboard className="inline-block text-lg mr-2" />
                                                Admin Dashboard
                                            </MenuItems>
                                        </Link>
                                    )}
                                    <MenuItems onClick={logout || (() => { })}>
                                        <LuLogOut className="inline-block text-lg" /> Logout
                                    </MenuItems>
                                </div>
                            ) : (
                                <div>
                                    <Link href="/login">
                                        <MenuItems onClick={toggleOpen}>
                                            <LuLogIn className="inline-block text-lg" /> Login
                                        </MenuItems>
                                    </Link>
                                    <Link href="/register">
                                        <MenuItems onClick={toggleOpen}>
                                            <LuUserPlus className="inline-block text-lg" />  Register
                                        </MenuItems>
                                    </Link>
                                </div>
                            )
                        }

                    </div>
                )}
            </div>
        </>
    )
}

export default UserMenu