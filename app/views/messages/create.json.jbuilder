json.id @message.id
json.content @message.content
json.image @message.image
json.group_id @message.group_id
json.user_id @message.user_id
json.name @message.user.name
json.date @message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")
json.user_sign_in current_user