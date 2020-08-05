// Libs
import * as React from 'react';

export const GoogleButton = (props: React.HTMLProps<HTMLDivElement>) => (
  <div className="google-btn" onClick={props.onClick}>
    <div className="google-icon-wrapper">
      <img alt="Google" className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
    </div>

    <p className="btn-text"><b>{props.children}</b></p>
  </div>
);

export const FacebookButton = (props: React.HTMLProps<HTMLDivElement>) => (
  <div className="google-btn" onClick={props.onClick}>
    <div className="google-icon-wrapper">
      <img alt="Facebook" className="facebook-icon" src="https://cdnjs.cloudflare.com/ajax/libs/webicons/2.0.0/webicons/webicon-facebook.svg" />
    </div>

    <p className="btn-text"><b>{props.children}</b></p>
  </div>
);