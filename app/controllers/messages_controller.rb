class MessagesController < ApplicationController
  def index
    @groups = []
    group1  = {name: "sample", text: "test"}
    group2  = {name: "chatGroup1", text: "message1"}
    group3  = {name: "chatGroup2", text: "message2"}
    @groups << group1
    @groups << group2
    @groups << group3

    @messages = []
    message1 = {user: "Kosaka", time: "2019/10/23(Wed) 16:52:10",text: "message-test1"}
    message2 = {user: "Masaki", time: "2019/10/23(Wed) 17:30:32",text: "message-test2"}
    message3 = {user: "Kaneko", time: "2019/10/23(Wed) 18:26:45",text: "message-test3"}
    @messages << message1
    @messages << message2
    @messages << message3

  end
end
