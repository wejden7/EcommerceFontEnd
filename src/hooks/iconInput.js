import { useState } from "react";
export default function useIconInput() {
    const [file, setFile] = useState(null);
    const [icon, setIcon] = useState(null);
    const [iconName, setIconName] = useState(null);
  const reset = () => {
    setFile();
    setIcon(null);
    setIconName(null)
  };
  const bind = {
    icon,
    onChange: (e) => {
        if (e.target.files.length > 0) {
            setIcon(e.target.files[0]);
            setIconName(e.target.files[0].name);
            const file = URL.createObjectURL(e.target.files[0]);
            setFile(file);
          }
          e.target.value = null;
    },
  };
  return [file,icon,iconName, bind, reset,];
}