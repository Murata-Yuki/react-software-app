import { useState, useRef, useEffect } from "react";

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState();

  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e) => {
      if (containerRef.current?.contains(e.target)) return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("mousedown", onClick);
    };
  }, [isOpen, setIsOpen]);

  const onClickDropdown = () => {
    setIsOpen((flag) => !flag);
  };

  const onClickItem = (item) => {
    setSelectedFloor(item);
    setIsOpen(false);
  };

  return {
    isOpen,
    onClickDropdown,
    onClickItem,
    selectedFloor,
    containerRef
  };
};
