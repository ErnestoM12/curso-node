class Message {
  constructor(uid, user_name, message) {
    this.uid = uid;
    this.user_name = user_name;
    this.message = message;
  }
}

class ChatMessages {
  constructor() {
    this.messages = [];
    this.users = {};
  }

  get lastTenMessages() {
    return (this.messages = this.messages.splice(0, 10));
  }

  get usersArr() {
    return Object.values(this.users);
  }

  sendMessage(uid, user_name, message) {
    this.messages.unshift(new Message(uid, user_name, message));
  }
  connectUser(user) {
    this.users[user.id] = user;
  }

  disconnectUser(id) {
    delete this.users[id];
  }
}

module.exports = ChatMessages;
