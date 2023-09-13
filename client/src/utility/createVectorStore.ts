import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

interface createVectorStoreI {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  docs: any;
}

const createVectorStore = async (props: createVectorStoreI) => {
  const vectorStore = await MemoryVectorStore.fromDocuments(
    props.docs,
    new OpenAIEmbeddings()
  );
  return vectorStore;
};

export default createVectorStore;
