import React from "react";

interface MenuItemsProps {
    children: React.ReactNode
    onClick: () => void;
}

const MenuItems: React.FC<MenuItemsProps> = ({
  onClick, children
}) => {
  return (
      <div className="px-4 py-3 hover:bg-neutral-100 flex items-center gap-2" onClick={onClick}>
          {children}
    </div>
  )
}

export default MenuItems