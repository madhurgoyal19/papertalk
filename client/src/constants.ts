export let OPEN_AI_API_KEY =
  "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";
export let OPEN_AI_TEMPERATURE = 0;

export const SET_OPEN_AI_API_KEY = (key: string) => {
  OPEN_AI_API_KEY = key;
};

export const SET_OPEN_AI_API_TEMPERATURE = (temperature: number) => {
  OPEN_AI_TEMPERATURE = temperature;
};
