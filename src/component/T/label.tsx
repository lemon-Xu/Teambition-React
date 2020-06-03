import React, { useState, FC, useReducer, useContext } from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./label.less";

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
      <button className="border" style={{ backgroundColor: color }}>
        {name}
        {color}
      </button>
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

interface label {
  color: string;
  name: string;
  inUse: boolean;
}

export default () => {
  const [labels, setLabels] = useState(new Array<label>());
  const [nameArray, setNameArray] = useState(new Array<string>()); // 标签名字
  const [colorArray, setColorArray] = useState(new Array<number>()); // 标签颜色（备选颜色下标）
  const optionalColor = [
    "63,165,238",
    "119,198,62",
    "42,190,176",
    "119,124,202",
    "253,173,52",
    "254,77,61",
  ]; // 备选颜色
  const [length, setLength] = useState(0);
  const [name, setName] = useState("");
  const [textChange, setTextChange] = useState(false); // 文本改变
  const [state, setState] = useState(0); // 0搜索   1编辑
  const [index, setIndex] = useState(-1);

  const deleteFC = (index: number): void => {
    nameArray.splice(index, 1);
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
        {nameArray.map((item, index) => {
          let props = {
            name: item,
            color: "rgb(".concat("63,165,238").concat(")"),
            index: index,
            deleteFC: deleteFC,
          };
          return <Button {...props}></Button>;
        })}
      </div>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setTextChange(true);
          }}
          placeholder="搜索标签"
        />
        <button
          onClick={() => {
            if (textChange) {
              nameArray.push(name);
              setName("");
              setTextChange(false);
              setLength((pre) => pre + 1);
            }
          }}
        >
          添加
        </button>
      </div>
      // 颜色选择器
      <div></div>
      // 历史标签选择器
      <div>
        {length}
        <ul style={{ display: state === 0 ? "inline" : "none" }}>
          {nameArray.map((item, index) => {
            return <li onClick={() => toEdit(index)}>{item}</li>;
          })}
        </ul>
        <div style={{ display: state === 1 ? "inline" : "none" }}>
          展示{nameArray[index]}
        </div>
      </div>
    </div>
  );
};
