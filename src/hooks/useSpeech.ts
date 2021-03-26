import { useEffect, useState } from "react";

export const useSpeech = () => {
  const [ result, setResult ] = useState<{ results: string[], final: boolean }>();

  useEffect(() => {
    // @ts-ignore
    const voice = new webkitSpeechRecognition();

    voice.lang = 'ru-RU';
    voice.continious = true;
    voice.interimResults = true;

    voice.onerror = (err: any) => {
      console.log('error', err);
    }

    voice.onresult = (e: any) => {
      const results = Object.keys(e.results[0]).filter(i => parseInt(i, 10).toString() === i).map(i => e.results[0][i].transcript);
      
      setResult({ results, final: e.results[0].isFinal });
      console.log(results);
    }

    voice.onend = () => {
      console.log('end');

      setTimeout(() => voice.start(), 100);
    }

    voice.start();
  }, []);

  return result;
}