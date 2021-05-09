import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { Speech } from "../types/speech";

export const SpeechContext = createContext<Speech | undefined>(undefined);

export const SpeechProvider = ({ children }: PropsWithChildren<{}>) => {
  const [ result, setResult ] = useState<Speech>();

  useEffect(() => {
    // @ts-ignore
    const voice = new webkitSpeechRecognition();

    voice.lang = 'ru-RU';
    voice.continious = true;
    voice.interimResults = true;

    voice.onerror = (err: any) => {
      // console.log('error', err);
    }

    voice.onresult = (e: any) => {
      const results = Object.keys(e.results[0]).filter(i => parseInt(i, 10).toString() === i).map(i => e.results[0][i].transcript);
      
      setResult({ results, final: e.results[0].isFinal });
    }

    voice.onend = () => {
      // console.log('end');

      setTimeout(() => voice.start(), 100);
    }

    voice.start();
  }, []);

  return (
    <SpeechContext.Provider value={result}>
      {children}
    </SpeechContext.Provider>
  );
}