const Articles = require("../models/articles");

exports.create = (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.price ||
    !req.body.url
  ) {
    return res.status(400).send({
      message: "User can not be empty or bad request"
    });
  }
  const article = new Articles({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    url: req.body.url
  });

  article
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the article."
      });
    });
};

exports.findAll = (req, res) => {
  Articles.find()
    .then(articles => {
      res.send(articles);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving articles."
      });
    });
};

exports.findOne = (req, res) => {
  Articles.findById(req.params.articleId)
    .then(article => {
      if (!article) {
        return res.status(404).send({
          message: "Article not found with id " + req.params.articleId
        });
      }
      res.send(article);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Article not found with id " + req.params.articleId
        });
      }
      return res.status(500).send({
        message: "Error retrieving article with id " + req.params.articleId
      });
    });
};

exports.update = (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.price ||
    !req.body.url
  ) {
    return res.status(400).send({
      message: "Article can not be empty or bad request"
    });
  }

  Articles.findByIdAndUpdate(
    req.params.articleId,
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      url: req.body.url
    },
    { new: true }
  )
    .then(article => {
      if (!article) {
        return res.status(404).send({
          message: "Article not found with id " + req.params.articleId
        });
      }
      res.send(article);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.articleId
        });
      }
      return res.status(500).send({
        message: "Error updating article with id " + req.params.articleId
      });
    });
};

exports.delete = (req, res) => {
    Articles.findByIdAndRemove(req.params.articleId)
    .then(article => {
      if (!article) {
        return res.status(404).send({
          message: "Article not found with id " + req.params.articleId
        });
      }
      res.send({ message: "Article deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Article not found with id " + req.params.articleId
        });
      }
      return res.status(500).send({
        message: "Could not delete article with id " + req.params.articleId
      });
    });
};
