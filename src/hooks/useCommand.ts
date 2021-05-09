import { useEffect } from "react";

import { useSpeech } from "./useSpeech";

export const useCommand = (command: string, fn: (command?: string) => void) => {
  const speech = useSpeech();

  useEffect(() => {
    const phraze = speech?.results.find(i => i.toLowerCase().indexOf(command.toLowerCase()) !== -1);

    if (speech?.final && phraze) {
      console.log('COMMAND', command);
      fn(phraze);
    }
  }, [ command, speech ]);
}