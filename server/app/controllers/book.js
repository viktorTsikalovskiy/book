"use strict";
const models = require('../models');

module.exports = {
    index: function*() {
        let data = yield models.books.findAll({
            raw: true,
            attributes: ["id", "name", "author", "year", "pages"]
        }).then(books => {
            return books;
        });
        yield this.render('pages/book/index', {
            data: data,
            page: "index"
        });

    },
    add: function*() {
        yield this.render('pages/book/add', {
            msg: false,
            page: "addBook",
            book: false
        });

    },
    addBook: function*() {
        let msg = yield models.books.create(this.body).then(()=> false)
            .catch((bac) => bac.message.split(','));
        console.log("msg: ", msg);
        if (!msg) {
            return this.redirect("/");
        }
        yield this.render("pages/book/add", {
            page: "addBook",
            msg: msg,
            book: false
        })

    },
    update: function*() {
        let editId = this.params.id;
        let book = yield models.books.findById(editId, {
            attributes: ["id", "name", "author", "year", "pages"]
        })
            .then((book) => {
                return book
            });
        yield this.render("pages/book/add", {
            msg: false,
            page: "updateBook",
            book: JSON.stringify(book)
        })

    },
    update_post: function*() {
        let editId = this.params.id;
        console.log("id: ", editId);
        let msg = yield models.books.update({
            name: this.body.name,
            author: this.body.author,
            year: this.body.year,
            pages: this.body.pages
        }, {
            where: {
                id: editId
            }
        })
            .then((book) => {
                console.log("update book: ", book);
            })
            .catch((bac) => bac.message.split(','));
        console.log(msg);
        if (!msg) {
            return this.redirect("/");
        }
        yield this.render("pages/book/add", {
            msg: msg,
            page: "updateBook",
            book: false
        })

    },
    delete_book: function*() {
        console.log("ok");
        let idBook = this.params.id;

        models.books.destroy({where: {id: idBook}});
        this.redirect("/")
    }
};
