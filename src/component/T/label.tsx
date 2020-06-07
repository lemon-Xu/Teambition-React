import React, { useState, FC, useReducer, useContext } from "react";
import Icon, {
  CloseOutlined,
  CheckOutlined,
  LeftOutlined,
  EditOutlined,
  SecurityScanTwoTone,
} from "@ant-design/icons";
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

interface LabelProps {
  name: string;
  color: string;
  index: number;
  deleteFC(index: number): void;
}
const Label = (props: LabelProps) => {
  const [isHover, setHover] = useState(false);
  const color = props.color;
  const deleteFC = props.deleteFC;
  const name = props.name;
  const index = props.index;
  return (
    <span onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <button
        className="gardeb-birder-radius-25"
        style={{ backgroundColor: color }}
      >
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

interface CreateLabelProps {
  add: (label: Label) => void;
  name: string;
  optionalColor: Array<string>;
  setState: (index: number) => void;
}

const CreateLabel = (props: CreateLabelProps) => {
  const [name, setName] = useState(props.name);
  const [color, setColor] = useState(props.optionalColor[0]);
  return (
    <div>
      <input
        type="text"
        value={name}
        autoFocus={true}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div>
        {props.optionalColor.map((item, index) => {
          return (
            <button
              style={{ backgroundColor: item }}
              onClick={() => {
                setColor(item);
              }}
              className="garden"
            >
              {item === color ? <CheckOutlined /> : <Icon />}
            </button>
          );
        })}
        <div>
          <button
            onClick={() => {
              const label = {
                name: name,
                color: color,
                inUse: true,
              };
              props.add(label);
              props.setState(-1);
            }}
          >
            创建
          </button>
        </div>
      </div>
    </div>
  );
};

interface SearchLabelProps {
  labels: Array<Label>;
  index: number;
  toEdit: () => void;
  delete: (index: number) => void;
  setSearchName: (name: string) => void;
  setState: (state: number) => void;
  setIndex: (index: number) => void;
}

const SearchLabel = (props: SearchLabelProps) => {
  const [labelArray, setLabelArray] = useState(props.labels);
  const [index, setIndex] = useState(props.index);

  return (
    <div className="menuSearch">
      <input
        type="text"
        placeholder="搜索标签"
        onChange={(e) => {
          const text = e.target.value;
          if (labelArray.length === 0) {
            props.setSearchName(text);
            props.setState(2);
          }
          for (let i in labelArray) {
            if (text === labelArray[i].name) {
              break;
            }
            props.setSearchName(text);
            props.setState(2);
          }
        }}
      />
      {labelArray.map((item, i) => {
        return (
          <div
            onMouseOver={() => {
              setIndex(i);
            }}
            onMouseOut={() => {
              setIndex(-1);
            }}
          >
            <button style={{ backgroundColor: item.color }} className="dot" />
            <span style={{ color: "black" }}>{item.name}</span>

            <CheckOutlined
              style={{
                float: "right",
                display: item.inUse === true ? "inline" : "none",
              }}
            />
            <EditOutlined
              style={{
                float: "right",
                display: index === i ? "inline" : "none",
              }}
              onClick={() => {
                props.setIndex(i);
                props.setState(1);
              }}
            />
          </div>
        );
      })}
    </div>
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
  delete: (index: number) => void;
  setState: (index: number) => void;
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
    <div className="menu">
      <div className="menuHeadline">
        <LeftOutlined
          style={{ float: "left" }}
          onClick={() => props.goBackFC()}
        />
        编辑标签
        <CloseOutlined style={{ float: "right" }} />
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
            <button
              style={{ backgroundColor: item }}
              onClick={() => {
                setColor(item);
              }}
              className="garden"
            >
              {color === item ? <CheckOutlined /> : <Icon />}
            </button>
          );
        })}
      </div>
      <div>
        <button
          className="middleButton dangerousButton"
          onClick={() => {
            props.delete(props.index);
            props.setState(0);
          }}
        >
          删除
        </button>
        <button
          onClick={() => {
            props.alterLabel(label);
            props.setState(0);
          }}
          className="middleButton ordinaryButton"
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
  const [color, setColor] = useState("rgb(63,165,238)");
  const [name, setName] = useState("");
  const [textChange, setTextChange] = useState(false); // 文本改变
  const [state, setState] = useState(-1); //-1隐藏 0搜索   1编辑 2创建
  const [index, setIndex] = useState(-1); // 当前选择的标签下标
  const [version, setVersion] = useState(0);
  const [searchName, setSearchName] = useState("");

  const labelDeleteEvent = (index: number): void => {
    // let label = labels[index];
    // label.inUse = false;
    labels.splice(index, 1);
    // labels.push(label);
    setVersion((pre) => pre + 1);
  };

  const toEdit = (index: number) => {
    setState(1);
    setIndex(index);
  };

  const labelAddEvent = (label: Label) => {
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
    delete: labelDeleteEvent,
    setState: setState,
  };

  const searchLabel = {
    labels: labels,
    index: index,
    toEdit: () => {
      setState(0);
    },
    setSearchName: (name: string) => {
      setSearchName(name);
    },
    setIndex: (index: number) => {
      setIndex(index);
    },
    delete: labelDeleteEvent,
    setState: setState,
  };

  const createLabel: CreateLabelProps = {
    optionalColor: optionalColor,
    name: searchName,
    add: labelAddEvent,
    setState: setState,
  };

  let fold = <div></div>;
  switch (state) {
    case 0:
      fold = <SearchLabel {...searchLabel} />;
      break;
    case 1:
      fold = <EditLabel {...editProps} />;
      break;
    case 2:
      fold = <CreateLabel {...createLabel} />;
      break;
  }

  return (
    <div>
      <p
        style={{ display: labels.length === 0 ? "inline" : "none" }}
        onClick={() => {
          setState(0);
        }}
      >
        添加标签
      </p>
      <div>
        {labels.map((item, index) => {
          let props: LabelProps = {
            name: item.name,
            color: item.color,
            index: index,
            deleteFC: labelDeleteEvent,
          };
          return <Label {...props}></Label>;
        })}
        <span
          onClick={() => {
            setState(0);
          }}
          style={{ display: labels.length === 0 ? "none" : "inline" }}
        >
          添加
        </span>
      </div>
      {fold}
    </div>
  );
};
