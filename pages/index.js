import { useState, useEffect } from "react";
import Error from "next/error";
import Paste from "../components/Paste";

function extname(path) {
  const index = path.lastIndexOf(".");
  if(index === -1) return "";
  return path.slice(index);
}

function Pasted({ id }) {
  const [code, setCode] = useState("Loading code...");
  const ext = extname(id);
  const cid = ext ? id.trimEnd(ext) : id;

  useEffect(() => {
    fetch(`https://pasted.vercel.app/api/${cid}`)
      .then((res) => {
        if (!res.ok) return { code: null };
        return res.json();
      })
      .then(({ body }) => setCode(body));
  });

  if (!code) return <Error statusCode={404} />;
  return <Paste language={ext.slice(1) || "js"} code={code} />;
}

Pasted.getInitialProps = function ({ query: { id } }) {
  return { id };
}

export default Pasted;
