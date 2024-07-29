// components/DynamicTable.js
"use client";
import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Image from "next/image";
import PlusSign from "./PlusSign";
import NineDots from "../../public/NineDots.png";

// Fake product data
const fakeProducts = [
  {
    title: "Product 1",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    title: "Product 2",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    title: "Product 3",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    title: "Product 4",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    title: "Product 5",
    thumbnail: "https://via.placeholder.com/150",
  },
];

const initialData = [
  { state: "tags", variants: [] },
  { state: "discount percentage", variants: [] },
];

const DynamicTable = () => {
  const [data, setData] = useState([]);
  const [variantCount, setVariantCount] = useState(0);

  useEffect(() => {
    // Initialize state once the component is mounted
    setData(initialData);
    setVariantCount(2);
  }, []);

  const addState = () => {
    setData((prevData) => [
      ...prevData,
      {
        state: `State ${prevData.length + 1}`,
        variants: Array(variantCount).fill(""),
      },
    ]);
  };

  const removeState = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariantCount((prevCount) => prevCount + 1);
    setData((prevData) =>
      prevData.map((row) => ({
        ...row,
        variants: [...row.variants, ""],
      }))
    );
  };

  const removeVariant = (index) => {
    if (variantCount <= 1) return;
    setVariantCount((prevCount) => prevCount - 1);
    setData((prevData) =>
      prevData.map((row) => {
        const newVariants = [...row.variants];
        newVariants.splice(index, 1);
        return { ...row, variants: newVariants };
      })
    );
  };

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRow = data[dragIndex];
    const newData = [...data];
    newData.splice(dragIndex, 1);
    newData.splice(hoverIndex, 0, dragRow);
    setData(newData);
  };

  return (
    <div className="container mx-auto p-8">
      <div className={`overflow-auto-x ${variantCount > 4 ? 'scrolling-touch' : ''}`}>
        <DndProvider backend={HTML5Backend}>
          <table className="min-w-full border-separate border border-slate-800 border-spacing-5 bg-gray-50 rounded border-opacity-0">
            <thead>
              <tr>
                <th></th>
                <th className="py-4 px-4 border border-slate-800 border-opacity-0">
                  Product filter
                </th>
                {Array(variantCount)
                  .fill()
                  .map((_, i) => (
                    <th key={i} className="py-2 px-4 border-opacity-0">
                      {i === 0 ? "Primary Variant" : `Variant ${i + 1}`}
                      <button
                        onClick={() => removeVariant(i)}
                        className="ml-2 bg-gray-50 text-slate-500 px-2 rounded"
                      >
                        <svg
                          className="w-[23px] h-[23px] text-gray-800"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-width="2"
                            d="M12 6h.01M12 12h.01M12 18h.01"
                          />
                        </svg>
                      </button>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <DraggableRow
                  key={rowIndex}
                  index={rowIndex}
                  row={row}
                  moveRow={moveRow}
                  removeState={removeState}
                >
                  <td>
                    <button
                      onClick={() => removeState(rowIndex)}
                      className="flex flex-col ml-[10px]"
                    >
                      <svg
                        className="w-[23px] h-[23px] text-gray-800 dark:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                        />
                      </svg>
                    </button>
                    <div className="flex flex-row">
                      <h1
                        style={{
                          fontFamily: "sans-serif",
                          fontSize: "30px",
                          fontWeight: "bold",
                        }}
                      >
                        {rowIndex + 1}
                      </h1>
                      <Image
                        src={NineDots}
                        width={20}
                        height={2}
                        alt="Nine Dots Icon"
                        className="ml-2 h-[15px] mt-[17px]"
                      />
                    </div>
                  </td>
                  <td className="py-2 px-4 border bg-white ">{row.state}</td>
                  {Array(variantCount)
                    .fill()
                    .map((_, colIndex) => {
                      const product = fakeProducts[colIndex % fakeProducts.length];
                      return (
                        <td key={colIndex} className="py-2 px-2 border bg-white border-opacity-0">
                          <Image src={product.thumbnail} width={50} height={50} alt={product.title} />
                          <p>{product.title}</p>
                        </td>
                      );
                    })}
                  <td>
                    <button onClick={addVariant} className="">
                      <PlusSign />
                    </button>
                  </td>
                </DraggableRow>
              ))}
              <tr>
                <td>
                  <button onClick={addState} className="flex justify-center w-full py-2">
                    <PlusSign />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </DndProvider>
      </div>
    </div>
  );
};

const DraggableRow = ({ index, row, moveRow, removeState, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "row",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "row",
    hover: (item) => {
      if (item.index !== index) {
        moveRow(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <tr ref={(node) => drag(drop(node))} className="group">
      {children}
    </tr>
  );
};

export default DynamicTable;
