import React from "react";
import "./Page404.css";

const Page404 = () => {
  return (
    <div className="box">
      <div className="box__ghost">
        <div className="symbol" />
        <div className="symbol" />
        <div className="symbol" />
        <div className="symbol" />
        <div className="symbol" />
        <div className="symbol" />

        <div className="box__ghost-container">
          <div className="box__ghost-eyes">
            <div className="box__eye-left" />
            <div className="box__eye-right" />
          </div>
          <div className="box__ghost-bottom">
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
        <div className="box__ghost-shadow" />
      </div>

      <div className="box__description">
        <div className="box__description-container">
          <div className="box__description-title">Whoops!</div>
          <div className="box__description-text">Man</div>
        </div>

        <a href="/" className="box__button" id="go-back">
          Go back
        </a>
      </div>
    </div>
  );
};

export default React.memo(Page404);
