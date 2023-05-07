const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Chat = require('../Chat.model');



exports.getChats = (req, res) => {
    Chat.find()
        .then((chats) => {
            res.json(chats);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getChat = (req, res) => {
    const { id } = req.params;
    Chat.findById(id)
        .then((chat) => {
            res.json(chat);
        }
        )
        .catch((err) => {
            console.log(err);
        }
        );
}

exports.createChat = (req, res) => {
    const newChat = {
        messages: req.body.messages,
        name: req.body.name,
        description: req.body.description,
        private: req.body.private,
        members: req.body.members,
        admin: req.body.admin,

    }


    console.log('chat created :' + JSON.stringify(req.body));
    const chat = new Chat(newChat);
    chat.save().then((chat) => {
        res.json(chat);
    }).catch((err) => {
        console.log(err);
    });
}


exports.updateChat = (req, res) => {
    const { id } = req.params;
    const { messages, name } = req.body;
    console.log('chat updated :' + (JSON.stringify(req.body)))

    const updatedChat = {
        messages: messages,
        name: name,
    }


    Chat.findByIdAndUpdate(id, updatedChat, { new: true }).then((chat) => {
        res.json(chat);
    }).catch((err) => {
        console.log(err);
    });
}


exports.deleteChat = (req, res) => {
    const { id } = req.params;
    Chat.findByIdAndDelete(id)
        .then((chat) => {
            res.json(chat);
        })
        .catch((err) => {
            console.log(err);
        });
}
