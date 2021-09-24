import { useContext, useEffect } from "react";

import { SpeechContext } from "contexts/speech.context";

export const useCommand = (command: string, fn: (command?: string) => void) => {
  const speech = useContext(SpeechContext);

  useEffect(() => {
    const phraze = speech?.results.find(i => i.toLowerCase().indexOf(command.toLowerCase()) !== -1);

    if (speech?.final && phraze) {
      console.log('COMMAND', command);
      fn(phraze);
    }
  }, [command, fn, speech]);
}