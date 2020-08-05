import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

export const bgOffset = keyframes`
  0% { background-position-x: 0; }
  100% { background-position-x: -${Math.sqrt(2)}rem;  }
`;

export const scaleInfinity = keyframes`
  0% { transform: scale(0.25); }
  50% { transform: scale(1); }
  100% { transform: scale(0.25); }
`;

export const scaleIn = keyframes`
  0% { transform: scale(0.9); }
  100% { transform: scale(1); }
`;

export const scaleOut = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(0.9); }
`;

export const fadeScaleIn = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
`;

export const fadeScaleOut = keyframes`
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.9); }
`;

export const fullScaleIn = keyframes`
  0% { opacity: 0; transform: scale(0); }
  100% { opacity: 1; transform: scale(1); }
`;

export const fullScaleOut = keyframes`
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0); }
`;

export const translateTopIn = keyframes`
  0% { opacity: 0; transform: translate(0, -50%) scale(0); }
  100% { opacity: 1; transform: translate(0, 0) scale(1); }
`;

export const translateTopOut = keyframes`
  0% { opacity: 1; transform: translate(0, 0) scale(1); }
  100% { opacity: 0; transform: translate(0, -50%) scale(0); }
`;

export const translateRightIn = keyframes`
  0% { opacity: 0; transform: translate(50%, 0) scale(0); }
  100% { opacity: 1; transform: translate(0, 0) scale(1); }
`;

export const translateRightOut = keyframes`
  0% { opacity: 1; transform: translate(0, 0) scale(1); }
  100% { opacity: 0; transform: translate(50%, 0%) scale(0); }
`;

export const translateTopRightIn = keyframes`
  0% { opacity: 0; transform: translate(50%, -50%) scale(0); }
  100% { opacity: 1; transform: translate(0, 0) scale(1); }
`;

export const translateTopRightOut = keyframes`
  0% { opacity: 1; transform: translate(0, 0) scale(1); }
  100% { opacity: 0; transform: translate(50%, -50%) scale(0); }
`;

export const translateBottomRightIn = keyframes`
  0% { opacity: 0; transform: translate(50%, 50%) scale(0); }
  100% { opacity: 1; transform: translate(0, 0) scale(1); }
`;

export const translateBottomRightOut = keyframes`
  0% { opacity: 1; transform: translate(0, 0) scale(1); }
  100% { opacity: 0; transform: translate(50%, 50%) scale(0); }
`;

export const ANIMATIONS = {
  fade: { in: fadeIn, out: fadeOut },
  scale: { in: scaleIn, out: scaleOut },
  fullScale: { in: fullScaleIn, out: fullScaleOut },
  translateTop: { in: translateTopIn, out: translateTopOut },
  translateRight: { in: translateRightIn, out: translateRightOut },
  translateTopRight: { in: translateTopRightIn, out: translateTopRightOut },
  translateBottomRight: { in: translateBottomRightIn, out: translateBottomRightOut },
};
