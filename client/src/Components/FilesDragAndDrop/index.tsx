import { useState } from "react";

interface FilesDragAndDropProps {
  onDrop: (file: File) => void;
  className?: string;
  children?: React.ReactNode;
  placeholder?: React.ReactNode;
  count?: number;
  formats?: string[];
}

const FilesDragAndDrop = (props: FilesDragAndDropProps) => {
  const [countError, setCountError] = useState(false);
  const [formatError, setFormatError] = useState(false);
  const [dragging, setDragging] = useState(false);
  const handleDragOver = (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const files = [...e.dataTransfer.files];

    if (props.count && files.length > props.count) {
      setCountError(true);
      return;
    }

    if (
      props.formats &&
      files.some(
        (file) =>
          !props.formats?.some((format) =>
            file.name.toLowerCase().endsWith(format.toLowerCase)
          )
      )
    ) {
      setFormatError(true);
      return;
    }

    props.onDrop(files[0]);
  };
  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  return (
    <div
      className={`FilesDragAndDrop ${props.className}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {dragging && (
        <div className="FilesDragAndDrop__placeholder">
          {props.placeholder ? (
            props.placeholder
          ) : (
            <>
              Drop that file down low
              <span role="img" aria-label="emoji" className="placeholder__icon">
                &#128526;
              </span>
            </>
          )}
        </div>
      )}
      {props.children}
      {countError && <div>Cannot upload more than {props.count} files</div>}
      {formatError && <div>Cannot upload files with this format</div>}
    </div>
  );
};

export default FilesDragAndDrop;
