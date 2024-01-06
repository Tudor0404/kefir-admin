"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { TbX, TbArrowUp, TbArrowDown } from "react-icons/tb"; // Importing the required icons

interface Item {
  key: string;
  value: string;
}

interface Props {
  keyName: string;
  valueName: string;
  placeholderKeyName: string;
  placeholderValueName: string;
  state: Item[];
  setter: Dispatch<SetStateAction<Item[]>>;
}

export default function DictionaryEditor(props: Props) {
  const addItem = () => {
    props.setter([...props.state, { key: "", value: "" }]);
  };

  const removeItem = (index: number) => {
    const newItems = [...props.state];
    newItems.splice(index, 1);
    props.setter(newItems);
  };

  const updateItem = (index: number, key: string, value: string) => {
    const newItems = [...props.state];
    newItems[index] = { key, value };
    props.setter(newItems);
  };

  const moveItemUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...props.state];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    props.setter(newItems);
  };

  const moveItemDown = (index: number) => {
    if (index === props.state.length - 1) return;
    const newItems = [...props.state];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    props.setter(newItems);
  };

  return (
    <div className="">
      <table className="table w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2"></th>
            <th className="border px-4 py-2">{props.keyName}</th>
            <th className="border px-4 py-2">{props.valueName}</th>
            <th className="border px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {props.state.map((item, index) => (
            <tr key={index}>
              <td className="border text-center p-1.5">
                <div className="flex flex-row h-full w-full justify-center gap-2 items-center">
                  <button
                    onClick={() => moveItemUp(index)}
                    type="button"
                    disabled={index == 0}
                    className={` ${index == 0 && "text-base-300"}`}
                  >
                    <TbArrowUp size={16} />
                  </button>

                  <button
                    onClick={() => moveItemDown(index)}
                    type="button"
                    disabled={index == props.state.length - 1}
                    className={` ${
                      index == props.state.length - 1 && "text-base-300"
                    }`}
                  >
                    <TbArrowDown size={16} />
                  </button>
                </div>
              </td>
              <td className="border p-1.5">
                <input
                  type="text"
                  placeholder={props.placeholderKeyName}
                  value={item.key}
                  onChange={(e) =>
                    updateItem(index, e.target.value, item.value)
                  }
                  className="input input-sm input-bordered rounded-none w-full text-sm p-1 !outline-none"
                />
              </td>
              <td className="border p-1.5">
                <input
                  type="text"
                  placeholder={props.placeholderValueName}
                  value={item.value}
                  onChange={(e) => updateItem(index, item.key, e.target.value)}
                  className="input input-sm input-bordered rounded-none w-full text-sm p-1 !outline-none"
                />
              </td>
              <td className="border p-1.5 text-center">
                <div className="h-full w-full flex justify-center items-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeItem(index);
                    }}
                    className="text-red-500 hover:text-red-700"
                    type="button"
                  >
                    <TbX size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addItem}
        type="button"
        className="btn-sm btn-success mt-2"
      >
        Add Item
      </button>
    </div>
  );
}
