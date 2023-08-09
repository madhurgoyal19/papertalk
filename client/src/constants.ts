export let OPEN_AI_API_KEY =
  "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";
export let OPEN_AI_TEMPERATURE = 0;

export const SET_OPEN_AI_API_KEY = (key: string) => {
  OPEN_AI_API_KEY = key;
};

export const SET_OPEN_AI_API_TEMPERATURE = (temperature: number) => {
  OPEN_AI_TEMPERATURE = temperature;
};
