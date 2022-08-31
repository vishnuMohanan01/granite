import React, { useState, useEffect } from "react";

import { isNil, isEmpty, either } from "ramda";

import tasksApi from "apis/tasks";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import Table from "components/Tasks/Table";

const Dashboard = ({ history }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const {
        data: { tasks },
      } = await tasksApi.list();
      setTasks(tasks);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const showTask = slug => {
    history.push(`/tasks/${slug}/show`);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(tasks)) {
    return (
      <Container>
        <h1 className="text-center text-xl leading-5">
          You have no tasks assigned 😔
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      <Table data={tasks} showTask={showTask} />
    </Container>
  );
};

export default Dashboard;
