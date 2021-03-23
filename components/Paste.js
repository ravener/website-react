import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

const Pre = ({ children }) => (
  <pre style={{
    textAlign: "left",
    margin: "1em 0",
    padding: "0.5em",
    overflow: "scroll"
  }}>
    {childen}
  </pre>
);

const Line = ({ children }) => (
  <div style={{ display: "table-row" }}>{children}</div>
);

const LineNo = ({ children }) => (
  <span style={{
    display: "table-cell",
    textAlign: "right",
    paddingRight: "1em",
    userSelect: "none",
    opacity: "0.5"
  }}>
    {children}
  </span>
)

const LineContent = ({ children }) => (
  <span style={{ display: "table-cell" }}>
    {children}
  </span>
)

const Paste = ({ code, language = "js" }) => (
  <Highlight {...defaultProps} theme={theme} code={code} language={language}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
        {tokens.map((line, i) => (
          <Line key={i} {...getLineProps({ line, key: i })}>
            <LineNo>{i + 1}</LineNo>
            <LineContent>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </LineContent>
          </Line>
        ))}
      </Pre>
    )}
  </Highlight>
);

export default Paste;


