import React from "react";

import Button from "components/Button";
import Input from "components/Input";

const Form = ({ type = "create", title, setTitle, loading, handleSubmit }) => (
  <form className="mx-auto max-w-lg" onSubmit={handleSubmit}>
    <Input
      label="Title"
      placeholder="Todo Title (Max 50 Characters Allowed)"
      value={title}
      onChange={e => setTitle(e.target.value.slice(0, 50))}
    />
    <Button
      buttonText={type === "create" ? "Create Task" : "Update Task"}
      loading={loading}
      type="submit"
    />
  </form>
);

export default Form;
