import React, { useEffect, useState } from "react";

import { useParams, useHistory } from "react-router-dom";

import commentsApi from "apis/comments";
import tasksApi from "apis/tasks";
import Comments from "components/Comments";
import Container from "components/Container";
import PageLoader from "components/PageLoader";

const Show = () => {
  const [task, setTask] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  const history = useHistory();

  const updateTask = () => {
    history.push(`/tasks/${task.slug}/edit`);
  };

  const fetchTaskDetails = async () => {
    try {
      const {
        data: { task },
      } = await tasksApi.show(slug);
      setTask(task);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await commentsApi.create({ content: newComment, task_id: task.id });
      fetchTaskDetails();
      setNewComment("");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="mt-10 flex justify-between text-bb-gray-600">
        <h1 className="mt-5 mb-3 pb-3 text-lg font-bold leading-5">
          {task?.title}
        </h1>
        <div className="rounded mt-2 mb-4 bg-bb-env px-2">
          <i
            className="transition ri-edit-line text-center text-2xl
             duration-300 ease-in-out hover:text-bb-yellow"
            onClick={updateTask}
          />
        </div>
      </div>
      <h2
        className="text-md mb-3 pb-3 leading-5 text-bb-gray-600
       text-opacity-50"
      >
        <span>Assigned To : </span>
        {task?.assigned_user.name}
      </h2>
      <h2 className="text-md mb-3 pb-3 leading-5 text-bb-gray-600 text-opacity-50">
        <span>Created By : </span>
        {task?.task_owner?.name}
      </h2>
      <Comments
        comments={task?.comments}
        handleSubmit={handleSubmit}
        loading={loading}
        newComment={newComment}
        setNewComment={setNewComment}
      />
    </Container>
  );
};

export default Show;
