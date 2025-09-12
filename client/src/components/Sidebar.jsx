import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";
import toast from "react-hot-toast";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const {
    chats,
    setSelectedChat,
    theme,
    setTheme,
    user,
    navigate,
    createNewChat,
    axios,
    setChats,
    fetchUserChats,
    setToken,
    token,
  } = useAppContext();
  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully");
  };

  const deleteChat = async (event, chatId) => {
    try {
      event.stopPropagation();
      const confirm = window.confirm(
        "Are you sure you want to delete this chat?"
      );
      if (!confirm) return;
      const { data } = await axios.post(
        "/api/chat/delete",
        { chatId },
        { headers: { Authorization: token } }
      );
      if (data.success) {
        setChats((prev) => prev.filter((chat) => chat._id !== chatId));
        await fetchUserChats();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      className={`flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 border-r border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1 ${
        !isMenuOpen && "max-md:-translate-x-full"
      }`}
    >
      {/* Logo */}
      <img
        className="w-full max-w-48"
        src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
        alt="Logo"
      />

      {/* New Chat Button */}
      <button
        onClick={createNewChat}
        className="flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer"
      >
        <span className="mr-2 text-xl ">+</span> New Chat
      </button>

      {/* Search Conversations */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md">
        <img
          className="w-4 not-dark:invert"
          src={assets.search_icon}
          alt="Search Icon"
        />
        <input
          className="text-xs placeholder:text-gray-400 outline-none"
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          type="text"
          placeholder="Search Conversations"
        />
      </div>

      {/* Recent Chats */}
      {chats.length > 0 && <p className="mt-4 text-sm">Recent Chats</p>}
      <div className="mt-1 mb-5  flex-1 overflow-y-auto">
        {chats
          .filter((chat) =>
            chat.messages[0]
              ? chat.messages[0]?.content
                  .toLowerCase()
                  .includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <div
              className="mt-2 py-1.5 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group"
              key={chat._id}
              onClick={() => {
                navigate("/");
                setSelectedChat(chat);
                setIsMenuOpen(false);
              }}
            >
              <div>
                <p className="truncate w-full">
                  {chat.messages.length > 0
                    ? chat.messages[0].content.slice(0, 32)
                    : chat.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>
              <img
                onClick={(event) =>
                  toast.promise(deleteChat(event, chat._id), {
                    loading: "deleting...",
                  })
                }
                src={assets.bin_icon}
                alt="Delete Icon"
                className="hidden group-hover:block w-4 cursor-pointer not-dark:invert"
              />
            </div>
          ))}
      </div>

      {/* Community Images */}
      <div
        onClick={() => {
          navigate("/community");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-2 p-3 mt-auto border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all "
      >
        <img
          className="w-4.5 not-dark:invert"
          src={assets.gallery_icon}
          alt="Community Galley Icon"
        />
        <div className="flex flex-col text-sm">
          <p>Community Images</p>
        </div>
      </div>

      {/* Credit Purchases Option */}
      <div
        onClick={() => {
          navigate("/credits");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-3 p-2 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all "
      >
        <img
          className="w-4.5 dark:invert"
          src={assets.diamond_icon}
          alt="Credits Icon"
        />
        <div className="flex flex-col text-sm">
          <p>Credits : {user?.credits}</p>
          <p className="text-xs text-gray-400">
            Purchase credits to use QuickGPT
          </p>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md">
        <div className="flex items-center gap-2 text-sm">
          <img
            className="w-4 not-dark:invert"
            src={assets.theme_icon}
            alt="Theme Icon"
          />
          <p>Dark Mode</p>
        </div>
        <label className="relative inline-flex cursor-pointer">
          <input
            className="sr-only peer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            type="checkbox"
            checked={theme === "dark"}
          />
          <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all"></div>
          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
        </label>
      </div>

      {/* User Account */}
      <div className="flex items-center gap-3 p-2 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group">
        <img
          className="w-7 rounded-full"
          src={assets.user_icon}
          alt="User Icon"
        />
        <p className="flex-1 text-sm dark:text-primary truncate">
          {user ? user.name : "Login your account"}
        </p>
        {user && (
          <img
            onClick={logout}
            src={assets.logout_icon}
            className="h-5 cursor-pointer hidden not-dark:invert group-hover:block"
          />
        )}
      </div>

      <img
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert"
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        alt="Close Icon"
      />
    </div>
  );
};

export default Sidebar;
