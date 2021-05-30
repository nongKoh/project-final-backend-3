'use strict';

const firebase = require('../db');
const JobInformation = require('../models/jobInformation');
const JobDetail = require('../models/jobDetail')
const firestore = firebase.firestore();

const addJob = async (req, res, next) => {
    try {
        const data = req.body
        await firestore.collection('jobs').doc().set(data);
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getJobByUsername = async (req, res, next) => {
    try {
        const username = req.body.username
        const jobs = await firestore.collection('jobs')
        const data = await jobs.get();
        const jobsArray = [];
        if(data.empty) {
            res.status(404).send('No student record found');
        }else {
            data.forEach(doc => {
                const job = {
                    information: {
                        id:doc.id,
                        status:doc.data().status,
                        title:doc.data().title,
                        companyName:doc.data().companyName,
                        username:doc.data().username,
                        date:doc.data().date
                    },
                    detail: {
                        detail:doc.data().detail,
                        long: doc.data().long,
                        lat: doc.data().lat,
                        record: doc.data().record,
                        start: doc.data().start,
                        stop: doc.data().stop,
                    }
                }
                jobsArray.push(job);
            });
            res.send(jobsArray.filter((item) => item.information.username === username));
        }
        res.status(200).send(jobsArray)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllJob = async (req,res, next) => {
    try {
        const jobs = await firestore.collection('jobs')
        const data = await jobs.get();

        const jobsArray = [];
        if(data.empty) {
            res.status(404).send('No student record found');
        }else {
            data.forEach(doc => {
                const job = {
                    information: {
                        id:doc.id,
                        status:doc.data().status,
                        title:doc.data().title,
                        companyName:doc.data().companyName,
                        username:doc.data().username,
                        date:doc.data().date
                    },
                    detail: {
                        detail:doc.data().detail,
                        long: doc.data().long,
                        lat: doc.data().lat,
                        record: doc.data().record,
                        start: doc.data().start,
                        stop: doc.data().stop,
                    }
                }
                jobsArray.push(job);
            });
            res.send(jobsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateJobByUser = async (req,res, next) => {
    try {
        const data = req.body
        const id = req.body.id
        const job = await firestore.collection('jobs').doc(id)
        await job.update(data)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteJob = async (req,res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('jobs').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addJob,
    getAllJob,
    getJobByUsername,
    updateJobByUser,
    deleteJob
}