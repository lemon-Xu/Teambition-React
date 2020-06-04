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
      </button>
      <button
        style={{ display: isHover ? "inline" : "none" }}
        onClick={() => {
          deleteFC(index);
        }}
      >
        <CloseOutlined />
      </button>
    </span>
  );
};

interface Label {
  color: string;
  name: string;
  inUse: boolean;
}

interface IPEditLabel {
  label: Label;
  index: number;
  optionalColor: Array<string>;
  goBackFC: () => void;
  alterLabel: (label: Label) => void;
}

const EditLabel = (props: IPEditLabel) => {
  const [name, setName] = useState(props.label.name);
  const [color, setColor] = useState(props.label.color);
  const label: Label = {
    name: name,
    color: color,
    inUse: props.label.inUse,
  };
  return (
    <div>
      <div>
        <span onClick={() => props.goBackFC()}>返回</span>
        <span>编辑标签</span>
        <span>关闭</span>
      </div>
      <input
        value={name}
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div>
        {props.optionalColor.map((item) => {
          return (
            <span>
              <button
                style={{ backgroundColor: item }}
                onClick={() => {
                  setColor(item);
                }}
              >
                {color === item ? "选中" : "备选"}
              </button>
            </span>
          );
        })}
      </div>
      <div>
        <button>删除</button>
        <button
          onClick={() => {
            props.alterLabel(label);
            props.goBackFC();
          }}
        >
          完成
        </button>
      </div>
    </div>
  );
};

export default () => {
  const [labels, setLabels] = useState(new Array<Label>());
  const [nameArray, setNameArray] = useState(new Array<string>()); // 标签名字

  const optionalColor = [
    "rgb(63,165,238)",
    "rgb(119,198,62)",
    "rgb(42,190,176)",
    "rgb(119,124,202)",
    "rgb(253,173,52)",
    "rgb(254,77,61)",
  ]; // 备选颜色
  const [length, setLength] = useState(0);
  const [color, setColor] = useState("rgb(63,165,238)");
  const [name, setName] = useState("");
  const [textChange, setTextChange] = useState(false); // 文本改变
  const [state, setState] = useState(0); // 0搜索   1编辑
  const [index, setIndex] = useState(-1); // 当前选择的标签下标
  const [version, setVersion] = useState(0);

  const labelDeleteEvent = (index: number): void => {
    labels.splice(index, 1);
    setLength((pre) => pre - 1);
  };

  const toEdit = (index: number) => {
    setState(1);
    setIndex(index);
  };

  const labelAddEvent = () => {
    let label = {
      color: color,
      name: name,
      inUse: true,
    };
    labels.push(label);
    setVersion((pre) => pre + 1);
    setName("");
    setState(0);
    setTextChange(false);
  };

  const editProps = {
    label: labels[index],
    index: index,
    optionalColor: optionalColor,
    goBackFC: () => {
      setState(0);
      setIndex(-1);
    },
    alterLabel: (label: Label) => {
      labels[index] = label;
      setVersion((pre) => pre + 1);
    },
  };

  let b = <div>2</div>;
  switch (state) {
    case 0:
      break;
    case 1:
      b = <EditLabel {...editProps}></EditLabel>;
      break;
  }

  return (
    <div>
      <p>添加标签2</p>
      <div>
        {labels.map((item, index) => {
          let props: ButtonProps = {
            name: item.name,
            color: item.color,
            index: index,
            deleteFC: labelDeleteEvent,
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
      </div>
      // 颜色选择器
      <div>
        <div>{b}</div>
        <div>
          {optionalColor.map((item) => {
            return (
              <span>
                <button
                  style={{ backgroundColor: item }}
                  onClick={() => setColor(item)}
                >
                  1
                </button>
              </span>
            );
          })}
        </div>
        <div>
          <button
            onClick={() => {
              labelDeleteEvent(index);
              setState(0);
            }}
          >
            删除
          </button>
          <button onClick={() => labelAddEvent()}>完成</button>
        </div>
      </div>
      // 历史标签选择器
      <div>
        {length}
        <ul style={{ display: state === 0 ? "inline" : "none" }}>
          {labels.map((item, index) => {
            return <li onClick={() => toEdit(index)}>{item.name}</li>;
          })}
        </ul>
        <div style={{ display: state === 1 ? "inline" : "none" }}>
          展示{nameArray[index]}
        </div>
      </div>
    </div>
  );
};
