# frozen_string_literal: true

module SidekiqHelper
  def clear_redis_data
    Sidekiq.redis do |conn|
      conn.keys("cron_job*").each do |key|
        conn.del(key)
      end
    end
  end

  def clear_sidekiq_queues
    Sidekiq::Queue.all.each do |queue|
      queue.clear
    end
  end

  def after_teardown
    Sidekiq::Worker.clear_all
    super
  end
end
