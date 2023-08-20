import { useRef, useState, useLayoutEffect, useMemo, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import useResizeObserver from "@react-hook/resize-observer";
import FilesDragAndDrop from "@Components/FilesDragAndDrop";
import { ChatTable } from "@Database";
import { deleteFromStorage } from "@rehooks/local-storage";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface DocWindowProps {
  chatId: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = (
  callback: { apply: (arg0: any, arg1: any) => void },
  interval: number | undefined
) => {
  let timeId: string | number | NodeJS.Timeout | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (...args: any) {
    clearTimeout(timeId);
    timeId = setTimeout(() => callback.apply(this, args), interval);
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSize = (target: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [size, setSize] = useState<any>(null);
  useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  useResizeObserver(
    target,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debounce((entry: { contentRect: any }) => setSize(entry.contentRect), 300)
  );

  return size;
};

const PDFViewer = (props: { File: File }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const target = useRef(null);
  const size = useSize(target);
  const file = useMemo(() => props.File, [props.File]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onDocumentLoadSuccess(pdfObject: any) {
    setNumPages(pdfObject.numPages);
  }

  return (
    <Document
      file={file}
      onLoadSuccess={onDocumentLoadSuccess}
      inputRef={target}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          width={size.width * 0.8}
          // className={`pdf-darkmode`}
        />
      ))}
    </Document>
  );
};

const DocWindow = (props: DocWindowProps) => {
  const [pdfFile, setPdfFile] = useState<File>();
  const newChat = localStorage.getItem("newChat");

  useEffect(() => {
    ChatTable.get(props.chatId).then((chat) => {
      if (chat) {
        setPdfFile(chat.pdf);
      }
    });
  }, []);

  const uploadHandler = (file: File) => {
    ChatTable.update(props.chatId, { pdf: file });
    setPdfFile(file);
    if (newChat === props.chatId) {
      deleteFromStorage("newChat");
    }
  };

  return (
    <div className="flex-1 overflow-hidden max-h-full flex flex-col  bg-midnight ">
      <div className="sticky top-0 border-b border-midnight-highlight text-white">
        <div className="flex items-center h-14 px-3">Chat Name</div>
      </div>
      {!pdfFile && (
        <FilesDragAndDrop
          onDrop={uploadHandler}
          className="w-[70%] mt-10 bg-midnight-light h-80 flex justify-center items-center rounded-lg self-center"
        >
          <div className="text-white select-none">
            Drop a pdf file here, and start asking questions.
          </div>
        </FilesDragAndDrop>
      )}
      {pdfFile && (
        <div className="max-h-full w-[99.5%] overflow-y-scroll custom-scrollbar relative py-16 ">
          <PDFViewer File={pdfFile} />
        </div>
      )}
    </div>
  );
};

export default DocWindow;
