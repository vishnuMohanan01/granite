# frozen_string_literal: true

Rails.application.routes.draw do
  def draw(routes_name)
    instance_eval(File.read(Rails.root.join("config/routes/#{routes_name}.rb")))
  end

  draw :sidekiq

  constraints(lambda { |req| req.format == :json }) do
    resources :tasks, { except: %i(new edit), param: :slug }
    resources :users, { only: %i(index create) }
    resource :session, { only: %i(create destroy) }
    resources :comments, { only: :create }
    resource :preference, only: %i[show update] do
      patch :mail, on: :collection
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
