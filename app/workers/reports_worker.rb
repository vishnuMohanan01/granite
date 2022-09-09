# frozen_string_literal: true

class ReportsWorker
  include Sidekiq::Worker

  def perform(user_id, report_path)
    tasks = Task.accessible_to(user_id)
    content = ApplicationController.render(
      assigns: {
        tasks: tasks
      },
      template: "tasks/report/download",
      layout: "pdf"
    )
    pdf_blob = WickedPdf.new.pdf_from_string content
    File.open(report_path, "wb") do |f|
      f.write(pdf_blob)
    end
  end
end
