class TasksController < ApplicationController

  def create
    if !!params[:list_id]
      @task = Task.new(task_params)
      @task.list_id = params.permit(:list_id)[:list_id]
      @task.save
      render json: @task, status: 201
    else
      render json: {error: "List not Found"}, status: 404
    end

  end

  def update
    @task = Task.find(params[:id])
    @task.update(task_params)
    render json: @task
  end

  private
  def task_params
    params.permit(:done, :name)
  end

end
