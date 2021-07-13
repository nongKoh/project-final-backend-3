'use strict';

const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();

const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        const users = await firestore.collection('users')
        const datas = await users.get();
        const usersArray = [];
        if(datas.empty) {
            await firestore.collection('users').doc().set(data);
            return res.status(200).send('Record saved successfuly');
        }else {
            datas.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().username,
                    doc.data().password,
                    doc.data().name,
                    doc.data().lastname,
                    doc.data().cardid
                );
                usersArray.push(user);
            });
        }
        const user = usersArray.filter((item) => (item.username === data.username) && item)
        if(user.length !== 0) {
            const response = {
                user: {},
                status: false
            }
            res.status(200).send(response)
        } else {
            await firestore.collection('users').doc().set(data);
            res.status(200).send('Record saved successfuly');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        d
        await user.update(data);
        res.send('User record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('users').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);ห
    }
}

const userLogin = async (req, res, next) => {
    try {
        const { username ,password }  = req.body
        const users = await firestore.collection('users')
        const data = await users.get();
        const usersArray = [];
        if(data.empty) {
            res.status(404).send('No student record found');
        }else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().username,
                    doc.data().password,
                );
                usersArray.push(user);
            });
        }
        const user = usersArray.filter((item) => (item.username === username && item.password === password) && item)
        if(user.length !== 0) {
            const response = {
                user: user,
                status: true
            }
            res.status(200).send(response);
        } else {
            const response = {
                user: user,
                status: false
            }
            res.status(200).send(response)
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllUser = async (req, res, next) => {
    try {
        const users = await firestore.collection('users')
        const data = await users.get();
        const usersArray = [];
        if(data.empty) {
            res.status(404).send('No student record found');
        }else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().username,
                    doc.data().password,
                );
                usersArray.push(user);
            });
        }
            const response = {
                user: usersArray,
                status: true
            }
            res.status(200).send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {
    addUser,
    updateUser,
    deleteUser,
    userLogin,
    getAllUser
}