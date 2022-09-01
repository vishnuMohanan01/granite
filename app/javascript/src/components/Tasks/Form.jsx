import React from "react";

import Select from "react-select";

import Button from "components/Button";
import Input from "components/Input";

const Form = ({
  type = "create",
  title,
  setTitle,
  assignedUser,
  users,
  setUserId,
  loading,
  handleSubmit,
}) => {
  const userOptions = users.map(user => ({
    value: user.id,
    label: user.name,
  }));
  const defaultOption = {
    value: assignedUser?.id,
    label: assignedUser?.name,
  };

  return (
    <form className="mx-auto max-w-lg" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Todo Title (Max 50 Characters Allowed)"
        value={title}
        onChange={e => setTitle(e.target.value.slice(0, 50))}
      />
      <div className="mt-3 flex flex-row items-center justify-start">
        <p className="text-md w-3/12 leading-5 text-gray-800">Assigned To: </p>
        <div className="w-full">
          <Select
            isSearchable
            defaultValue={defaultOption}
            options={userOptions}
            onChange={e => setUserId(e.value)}
          />
        </div>
      </div>
      <Button
        buttonText={type === "create" ? "Create Task" : "Update Task"}
        loading={loading}
        type="submit"
      />
    </form>
  );
};

export default Form;
