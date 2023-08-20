import { OpenAI } from "langchain";
import { PromptTemplate } from "langchain/prompts";

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import {
  LLMChain,
  SimpleSequentialChain,
  RetrievalQAChain,
  loadQAStuffChain,
} from "langchain/chains";
import { OPEN_AI_API_KEY, OPEN_AI_TEMPERATURE } from "@Constants";
import { BaseRetriever } from "langchain/schema/retriever";
import { Document } from "node_modules/langchain/dist/document";

const template = `Given the following conversation and a follow up question, answer the question. 

Chat History:
{chat_history}
Follow Up Input: {question}
Answer:`;

const pt = new PromptTemplate({
  template: template,
  inputVariables: ["chat_history", "question"],
});

const openAIModel = new OpenAI({
  openAIApiKey: OPEN_AI_API_KEY,
  temperature: OPEN_AI_TEMPERATURE,
});

const chain = new LLMChain({
  llm: openAIModel,
  prompt: pt,
});

const AddPDFToChain = async (documents: Document<Record<string, any>>[]) => {
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: OPEN_AI_API_KEY,
    verbose: true,
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    embeddings
  );

  const chain = new RetrievalQAChain({
    combineDocumentsChain: loadQAStuffChain(openAIModel),
    retriever: vectorStore.asRetriever(),
    returnSourceDocuments: true,
  });

  return chain;
};

export default chain;
