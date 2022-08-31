import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import tasksApi from "apis/tasks";
import Container from "components/Container";
import PageLoader from "components/PageLoader";

import Form from "./Form";

const Edit = ({ history }) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await tasksApi.update({
        slug,
        payload: { title },
      });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchTaskDetails = async () => {
    try {
      const {
        data: {
          task: { title, user_id },
        },
      } = await tasksApi.show(slug);
      setTitle(title);
      setUserId(user_id);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <Form
        handleSubmit={handleSubmit}
        loading={loading}
        setTitle={setTitle}
        setUserId={setUserId}
        title={title}
        type="update"
        userId={userId}
      />
    </Container>
  );
};

export default Edit;
