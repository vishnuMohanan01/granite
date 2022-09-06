import React from "react";

import { compose, head, join, juxt, tail, toUpper } from "ramda";

const TableHeader = ({ type }) => {
  const getTitleCase = compose(join(""), juxt([compose(toUpper, head), tail]));

  const title = `${getTitleCase(type)} Tasks`;

  return (
    <thead>
      <tr>
        <th className="w-1" />
        <th
          className="bg-gray-50 px-6 py-3 text-left
        text-xs font-bold uppercase leading-4
        tracking-wider text-bb-gray-600 text-opacity-50"
        >
          {title}
        </th>
        {type === "pending" && (
          <th
            className="bg-gray-50 px-6 py-3 text-left text-sm
          font-bold leading-4 tracking-wider
          text-bb-gray-600 text-opacity-50"
          >
            Assigned To
          </th>
        )}
        {type === "completed" && (
          <>
            <th style={{ width: "164px" }} />
            <th
              className="bg-gray-50 py-3 pl-6 text-center text-sm
            font-bold leading-4 tracking-wider
            text-bb-gray-600 text-opacity-50"
            >
              Delete
            </th>
          </>
        )}
        {type === "pending" && (
          <th
            className="bg-gray-50 py-3 pl-6 text-center text-sm
          font-bold leading-4 tracking-wider
          text-bb-gray-600 text-opacity-50"
          >
            Starred
          </th>
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
