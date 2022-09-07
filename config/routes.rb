# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

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
