const bookModel = require("../models/bookModel")
const mongoose = require('mongoose')
//-----------------Validation functions---------
const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidObjectId = function(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}
//-----------------Add book API ---------------
const addBook = async function(req,res){
    try{
        const requestBody = req.body
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, Message: "Invalid request parameters, Please provide book details." })
            return
        }   
    //----------validation starts-----------
    if(requestBody){
    let {title, author, summary, image} = requestBody
    if (!isValid(title)) {
        res.status(400).send({ status: false, msg: "Title is required." })
    }

    const isTitleAlreadyExsit = await bookModel.findOne({ title })
    if (isTitleAlreadyExsit) {
        res.status(400).send({ msg: "Title already exsist." })
        return
    }

    if (!isValid(author)) {
        res.status(400).send({ status: false, msg: "Author is required." })
    }

    if (!isValid(summary)) {
        res.status(400).send({ status: false, msg: "Summary is required." })
    }
    if (!isValid(image)) {
        res.status(400).send({ status: false, msg: "Image is required." })
    }
    //----------------Adding book into db------------------------------
    const bookDetails ={title, author, summary,image}
    const addBook = await bookModel.create(bookDetails)
    res.status(201).send({ status :true, msg: "Book added successfully." , data : {addBook}})

    }else{
        res.status(400).send({ status: false, message: "Sorry, book is not added." })
    }
    }catch(err){
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}
//-----------------View books API ---------------

const viewBook = async function(req, res){
    try {
        let books = await bookModel.find({isDeleted:false})
        res.status(200).send({ status: true, data : {books}})
    } catch (error) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}

//----------------View Books by ID-----------------

const viewBooksbyId = async function(req,res){
    try {
        let id = req.params.id
        if (!isValidObjectId(id)) {
            res.status(400).send({ status: false, Message: "Please provide a valid book id" })
        }

        let book = await bookModel.findOne({isDeleted:false,_id:id})
        if (!book) {
            res.status(404).send({ status: false, msg: 'Book not found ' })
        } else {
            let bookData = {
                bookId: book._id,
                title: book.title,
                author: book.author,
                summary: book.summary
            }
            res.status(200).send({ status: true, data : {bookData}})

        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}

//-----------------Update books by ID-----------------

const updateBooksbyId = async function(req, res){
    try {
        const id = req.params.id
        if (!isValidObjectId(id)) {
            res.status(400).send({ status: false, Message: "Please provide a valid book id" })
        }

        let requestbody = req.body
        if (!isValidRequestBody(requestbody)) {
            res.status(400).send({ status: false, Message: "Invalid request parameters, Please provide book details." })
            return
        }  

        let {title , author, summary, } =requestbody
        //------------validation for bookdata----------------------
        if (title) {
            if (!isValid(title)) {
                return res.status(400).send({ status: false, message: 'Please provide a valid title' })
            }
        }
        if (author) {
            if (!isValid(author)) {
                return res.status(400).send({ status: false, message: 'Please provide a valid title' })
            }
        }
        if (summary) {
            if (!isValid(summary)) {
                return res.status(400).send({ status: false, message: 'Please provide a valid title' })
            }
        }
        //-----------updating book data by id---------------
        let updatedBook = await bookModel.findOneAndUpdate({isDeleted:false,_id: id},requestbody, {new:true}).select({_id : 1, title : 1, author : 1, summary : 1})
        if(updatedBook){
            res.status(200).send({ status: true, message: "Book updated successfully", data: updatedBook })
        } else {
            res.status(404).send({ status: false, message: "Can't find book!! Either your book is deleted or book not found" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}

//----------------Delete books api-------------------------------

const deleteBook = async function(req, res) {
    try {
        const id = req.params.id
        if (!isValidObjectId(id)) {
            res.status(400).send({ status: false, Message: "Please provide a valid book id" })
        }

        let deletedBook = await bookModel.findOneAndUpdate({isDeleted:false,_id: id},{isDeleted:true},{ new: true })
        if (deletedBook) {
            res.status(200).send({ status: true, Message: "Book deleted successfully", data: deletedBook })
        } else {
            res.status(404).send({ status: false, message: "Cannot find book! or book is deleted already." })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports = {addBook, viewBook, viewBooksbyId, updateBooksbyId, deleteBook}