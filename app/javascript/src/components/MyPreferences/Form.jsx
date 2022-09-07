import React from "react";

import classnames from "classnames";

import Button from "components/Button";
import Input from "components/Input";

// const defaultTimezone = "UTC";

const Form = ({
  notificationDeliveryHour,
  setNotificationDeliveryHour,
  shouldReceiveEmail,
  setShouldReceiveEmail,
  loading,
  updatePreference,
  updateEmailNotification,
}) => {
  const onHandleDeliveryHourChange = event => {
    const regex = /^[0-9\b]*$/;
    const deliveryHour = event.target.value;
    if (!regex.test(deliveryHour)) return null;

    return setNotificationDeliveryHour(deliveryHour);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (shouldReceiveEmail) {
      updatePreference();
    }
  };

  const handleEmailNotificationChange = e => {
    setShouldReceiveEmail(e.target.checked);
    return updateEmailNotification(e.target.checked);
  };

  return (
    <form className="mx-auto max-w-lg" onSubmit={handleSubmit}>
      <div className="mt-10 mb-2 flex justify-between text-bb-gray-600">
        <h1 className="mt-5 pb-3 text-2xl font-bold leading-5">
          Pending Tasks in Email
        </h1>
      </div>
      <div
        className={classnames("flex  items-baseline space-x-1", {
          "text-bb-gray-700": shouldReceiveEmail,
          "text-bb-gray-600": !shouldReceiveEmail,
        })}
      >
        <input
          checked={shouldReceiveEmail}
          id="shouldReceiveEmail"
          type="checkbox"
          onChange={handleEmailNotificationChange}
        />
        <span>
          Send me a daily email of the pending tasks assigned to me.
          <br /> No email will be sent if there are no pending tasks.
        </span>
      </div>
      <div
        className={classnames("flex items-center space-x-4", {
          "text-bb-gray-700": shouldReceiveEmail,
          "text-bb-gray-600": !shouldReceiveEmail,
        })}
      >
        <p className="mt-6 text-sm font-medium leading-5 ">
          Delivery Time (Hours)
        </p>
        <Input
          disabled={!shouldReceiveEmail}
          max={23}
          min={0}
          placeholder="Enter hour"
          type="number"
          value={notificationDeliveryHour}
          onChange={onHandleDeliveryHourChange}
        />
        <p className="mt-6 font-extrabold">(UTC)</p>
      </div>
      <div className="w-2/6">
        <Button
          buttonText="Schedule Email"
          loading={loading}
          type="submit"
          className={classnames({
            "bg-opacity-60 cursor-not-allowed": !shouldReceiveEmail,
          })}
        />
      </div>
    </form>
  );
};

export default Form;
