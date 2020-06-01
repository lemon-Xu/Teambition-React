import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";

interface ButtonProps {
  name: string;
}
const Button = (props: ButtonProps) => {
  const [isHover, setHover] = useState(false);
  return (
    <div>
      <button
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        {props.name}
      </button>
      <button style={{ display: isHover ? "none" : "inlint" }}>
        <CloseOutlined />
      </button>
    </div>
  );
};

export default () => {
  const [labelArray, setLabelArray] = useState(new Array<string>());
  const [name, setName] = useState("");
  const [change, setChange] = useState(false);
  return (
    <div>
      <p>12312</p>
      <a>添加标签2</a>
      {labelArray.map((item) => {
        return <Button name={item}></Button>;
      })}
      <button
        onClick={() => {
          if (change) {
            labelArray.push(name);
            alert(labelArray);
            setName("");
            setChange(false);
          }
        }}
      >
        添加
      </button>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setChange(true);
        }}
      />
    </div>
  );
};
