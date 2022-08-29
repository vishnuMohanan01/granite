import React from "react";

import PropTypes from "prop-types";

const TableRow = ({ data }) => (
  <tbody className="divide-y divide-gray-200 bg-white">
    {data.map(rowData => (
      <tr key={rowData.id}>
        <td
          className="truncate block w-64 px-6 py-4 text-sm
            font-medium capitalize leading-8 text-bb-purple"
        >
          {rowData.title}
        </td>
      </tr>
    ))}
  </tbody>
);

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TableRow;
