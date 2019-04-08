class MessagesController < ApplicationController
  before_action :set_group
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    respond_to do |format|
        format.json { @new_messages = @messages.where('id > ?', params[:message][:id])}
    end
  end

  def create
    @message = @group.messages.new(message_params)
    @message.user = current_user
    if @message.save
      respond_to do |format|
        format.html
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      redirect_to group_messages_path(@group)
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
