import React, { useState, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";

const ImageEditor = ({ image, onSave, onCancel }) => {
  const [scale, setScale] = useState(1);
  const [editorWidth, setEditorWidth] = useState(250);
  const [editorHeight, setEditorHeight] = useState(250);

  const editorRef = React.createRef();

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const editedImage = canvas.toDataURL();
      onSave(editedImage);
    }
  };

  const updateEditorSize = () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setEditorWidth(200);
      setEditorHeight(200);
    } else {
      setEditorWidth(250);
      setEditorHeight(250);
    }
  };

  useEffect(() => {
    updateEditorSize();
    window.addEventListener("resize", updateEditorSize);
    return () => {
      window.removeEventListener("resize", updateEditorSize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="mb-4">
        <AvatarEditor
          ref={editorRef}
          image={image}
          width={editorWidth}
          height={editorHeight}
          border={50}
          scale={scale}
        />
      </div>
      <div className="mb-4">
        <input
          type="range"
          min="1"
          max="2"
          step="0.01"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
        />
      </div>
      <div className="flex flex-row mb-4 w-[250px]">
        <button
          className="w-full px-4 py-2 mr-3 text-white rounded bg-primary2 hover:bg-primary1 focus:outline-none focus:shadow-outline"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="w-full px-4 py-2 text-white rounded bg-primary2 hover:bg-primary1 focus:outline-none focus:shadow-outline"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ImageEditor;
