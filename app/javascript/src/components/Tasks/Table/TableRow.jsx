import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import Tooltip from "components/Tooltip";

const TableRow = ({
  type = "pending",
  data,
  destroyTask,
  showTask,
  handleProgressToggle,
  starTask,
}) => {
  const isCompleted = type === "completed";
  const toggledProgress = isCompleted ? "pending" : "completed";

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {data.map(rowData => (
        <tr key={rowData.id}>
          <td className="text-center">
            <input
              checked={isCompleted}
              type="checkbox"
              className="rounded focus:ring-bb-purple ml-6 h-4 w-4
                  cursor-pointer border-gray-300 text-bb-purple"
              onChange={() =>
                handleProgressToggle({
                  slug: rowData.slug,
                  progress: toggledProgress,
                })
              }
            />
          </td>
          <td
            className={classnames(
              "truncate block w-64 px-6 py-4 text-sm font-medium capitalize leading-8 text-bb-purple",
              {
                "cursor-pointer": !isCompleted,
                "text-opacity-50": isCompleted,
              }
            )}
            onClick={() => !isCompleted && showTask(rowData.slug)}
          >
            <Tooltip content={rowData.title} delay={200} direction="top">
              <div className="truncate max-w-64 ">{rowData.title}</div>
            </Tooltip>
          </td>
          {!isCompleted && (
            <>
              <td
                className="whitespace-no-wrap px-6 py-4 text-sm font-medium
                            leading-5 text-bb-gray-600"
              >
                {rowData.assigned_user.name}
              </td>
              <td className="cursor-pointer py-4 pl-6 text-center">
                <i
                  className={classnames(
                    "transition p-1 text-2xl duration-300 ease-in-out hover:text-bb-yellow",
                    {
                      "ri-star-line text-bb-border":
                        rowData.status !== "starred",
                    },
                    {
                      "ri-star-fill text-white text-bb-yellow":
                        rowData.status === "starred",
                    }
                  )}
                  onClick={() => starTask(rowData.slug, rowData.status)}
                />
              </td>
            </>
          )}
          {isCompleted && (
            <>
              <td style={{ width: "164px" }} />
              <td className="cursor-pointer py-4 pl-6 text-center">
                <i
                  className="transition ri-delete-bin-5-line text-center
                  text-2xl text-bb-border duration-300
                  ease-in-out hover:text-bb-red"
                  onClick={() => destroyTask(rowData.slug)}
                />
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string,
  destroyTask: PropTypes.func,
  showTask: PropTypes.func,
  handleProgressToggle: PropTypes.func,
  starTask: PropTypes.func,
};

export default TableRow;
