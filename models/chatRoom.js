const mongoose = require('mongoose');
const uuidv4 = require('uuid');

const CHAT_ROOM_TYPES = [
  'consumer-to-consumer',
  'consumer-to-support',
];
// console.log(typeof USER_TYPES);

module.exports = toString(CHAT_ROOM_TYPES);

const chatRoomSchema = new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => uuidv4.v4().replace(/-/g, ''), // real version : /\-/g

      },
      userIds: Array,
      type: String,
      chatInitiator: String,
    },
    {
      timestamps: true,
      collection: "chatrooms",
    }
  );
  
  chatRoomSchema.statics.initiateChat = async function (
      userIds, type, chatInitiator
  ) {
    try {
      const availableRoom = await this.findOne({
        userIds: {
          $size: userIds.length,
          $all: [...userIds],
        },
        type,
      });
      if (availableRoom) {
        return {
          isNew: false,
          message: 'retrieving an old chat room',
          chatRoomId: availableRoom._doc._id,
          type: availableRoom._doc.type,
        };
      }
  
      const newRoom = await this.create({ userIds, type, chatInitiator });
      return {
        isNew: true,
        message: 'creating a new chatroom',
        chatRoomId: newRoom._doc._id,
        type: newRoom._doc.type,
      };
    } catch (error) {
      console.log('error on start chat method', error);
      throw error;
    }
  }

  chatRoomSchema.statics.getChatRoomByRoomId = async function (roomId) {
    try {
      const room = await this.findOne({ _id: roomId });
      return room;
    } catch (error) {
      throw error;
    }
  }

  chatRoomSchema.statics.getChatRoomsByUserId = async function (userId) {
    try {
      const rooms = await this.find({ userIds: { $all: [userId] } });
      return rooms;
    } catch (error) {
      throw error;
    }
  }
module.exports = mongoose.model("ChatRoom", chatRoomSchema);
