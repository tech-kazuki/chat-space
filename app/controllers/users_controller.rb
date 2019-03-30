class UsersController < ApplicationController

  def index
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%")
      respond_to do |format|
        format.html
        format.json
      end
  end

  def new
    @users = User.all
    flash[:sign_in] = "ログインしました。"
  end

  def create
    flash[:user_create] = "アカウントが登録されました。"
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def destroy
    flash[:sign_out] = "ログアウトしました。"
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
