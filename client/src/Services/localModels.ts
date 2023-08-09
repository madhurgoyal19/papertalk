import { OpenAI } from "langchain";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { OPEN_AI_API_KEY, OPEN_AI_TEMPERATURE } from "../constants.ts";

// const template = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.

// Chat History:
// {chat_history}
// Follow Up Input: {question}
// Standalone question:`;

// const promptTemplate = new PromptTemplate({
//   template: template,
//   inputVariables: ["chat_history", "question"],
// });

const t = `Be funny when answering questions\n Question: {question}`;

const pt = new PromptTemplate({ template: t, inputVariables: ["question"] });

const openAIModel = new OpenAI({
  openAIApiKey: OPEN_AI_API_KEY,
  temperature: OPEN_AI_TEMPERATURE,
});

const chain = new LLMChain({
  llm: openAIModel,
  prompt: pt,
});

export default chain;
