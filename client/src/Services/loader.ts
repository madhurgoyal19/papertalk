import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { Buffer } from "buffer";
import { pdfjs } from "react-pdf";

window.Buffer = window.Buffer || Buffer;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LoadPDF = async (file: Blob) => {
  const loader = new PDFLoader(file, {
    pdfjs: () => pdfjs,
  });
  const docs = await loader.load();

  const splitter = new CharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 50,
  });

  const documents = await splitter.splitDocuments(docs);
  return documents;
};

export default LoadPDF;
