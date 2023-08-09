import { useRef, useState, useLayoutEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import samplePDF from "../../assets/test.pdf";
import useResizeObserver from "@react-hook/resize-observer";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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

const PDFViewer = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const target = useRef(null);
  const size = useSize(target);
  const file = useMemo(() => samplePDF, []);

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

const DocWindow = () => {
  return (
    <div className="flex-1 overflow-hidden max-h-full flex flex-col  bg-midnight ">
      <div className="sticky top-0 border-b border-midnight-highlight text-white">
        <div className="flex items-center h-14 px-3">Chat Name</div>
      </div>
      <div className="max-h-full w-[99.5%] overflow-y-scroll custom-scrollbar relative py-16 ">
        <PDFViewer />
      </div>
    </div>
  );
};

export default DocWindow;
