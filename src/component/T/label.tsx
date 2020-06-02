import React, { useState, FC } from "react";
import { CloseOutlined } from "@ant-design/icons";

interface ButtonProps {
  name: string;
  color: string;
  index: number;
  deleteFC(index: number): void;
}
const Button = (props: ButtonProps) => {
  const [isHover, setHover] = useState(false);
  const color = props.color;
  const deleteFC = props.deleteFC;
  const name = props.name;
  const index = props.index;
  return (
    <span onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <button style={{ backgroundColor: color }}>{name}</button>
      <button
        style={{ display: isHover ? "inline" : "none" }}
        onClick={() => {
          deleteFC(index);
        }}
      >
        <CloseOutlined />
      </button>
      {index}
    </span>
  );
};

export default () => {
  const [labelArray, setLabelArray] = useState(new Array<string>());
  const [length, setLength] = useState(0);
  const [name, setName] = useState("");
  const [change, setChange] = useState(false);

  const deleteFC = (index: number): void => {
    labelArray.splice(index, 1);
    setLength((pre) => pre - 1);
  };

  return (
    <div>
      <p>12312</p>
      <p>添加标签2</p>
      <div>
        {labelArray.map((item, index) => {
          return (
            <Button
              name={item}
              color={"#00ff00"}
              index={index}
              deleteFC={deleteFC}
            ></Button>
          );
        })}
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setChange(true);
        }}
        placeholder="搜索标签"
      />
      <button
        onClick={() => {
          if (change) {
            labelArray.push(name);
            setName("");
            setChange(false);
            setLength((pre) => pre + 1);
          }
        }}
      >
        添加
      </button>
      {length}
    </div>
  );
};
