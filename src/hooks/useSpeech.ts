import { useContext } from "react";

import { SpeechContext } from '../contexts/speech.context';

export const useSpeech = () => {
  const result = useContext(SpeechContext)

  return result;
}