import React, { useState, FC, useReducer, useContext } from "react";
import { CloseOutlined } from "@ant-design/icons";

interface IState {
  nameArray: Array<string>; // 标签名字
  colorArray: Array<string>; // 标签颜色
}

interface IAction {
  type: IActionType;
}

interface IActionType {}

const LABEL_ADD: IActionType = "LABEL_ADD";
const LABEL_DELETE: IActionType = "LABEL_DELETE";
const LABEL_ALTER: IActionType = "LABEL_ALTER";

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case LABEL_ADD:
      return {
        ...state,
      };
    case LABEL_DELETE:
      return {
        ...state,
      };
    case LABEL_ALTER:
      return {
        ...state,
      };
  }
};

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
  const [state, setState] = useState(0); // 0搜索   1编辑
  const [index, setIndex] = useState(-1);

  const deleteFC = (index: number): void => {
    labelArray.splice(index, 1);
    setLength((pre) => pre - 1);
  };

  const toEdit = (index: number) => {
    setState(1);
    setIndex(index);
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
      <div>
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
        <ul style={{ display: state === 0 ? "inline" : "none" }}>
          {labelArray.map((item, index) => {
            return <li onClick={() => toEdit(index)}>{item}</li>;
          })}
        </ul>
        <div style={{ display: state === 1 ? "inline" : "none" }}>
          展示{labelArray[index]}
        </div>
      </div>
    </div>
  );
};
