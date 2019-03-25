# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|
|email|string|null: false, default: ""|

### Association

- has_many :group_users
- has_many :groups, through: :group_users
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association

- has_many :group_users
- has_many :users, through: :group_users
- has_many :messages

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|foreign_key: true|
|group_id|references|foreign_key: true|

### Association

- belongs_to :user
- belongs_to :group

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|content|string||
|image|string||
|user_id|references|foreign_key: true|
|group_id|references|foreign_key: true|

### Association

- belongs_to :group
- belongs_to :user
