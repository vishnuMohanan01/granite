# frozen_string_literal: true

require "test_helper"

class CommentsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @task = create(:task)
    @headers = headers(@task.assigned_user)
  end

  def test_should_create_comment_for_valid_request
    content = "Wow!"
    post comments_path, params: { comment: { content: content, task_id: @task.id } }, headers: @headers
    assert_response :success
    assert_equal @task.comments.last.content, content
  end

  def test_shouldnt_create_comment_without_content
    post comments_path, params: { comment: { content: "", task_id: @task.id } }, headers: @headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Content can't be blank"
  end

  def test_shouldnt_create_comment_without_task
    post comments_path, params: { comment: { content: "This is a comment", task_id: "" } }, headers: @headers
    assert_response :not_found
    response_json = response.parsed_body
    assert_equal response_json["error"], t("not_found", entity: "Task")
  end
end
