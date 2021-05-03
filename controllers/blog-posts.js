const BlogPost = require('../models/blog-post')
const successResponse = require('../lib/success-response-sender');
const errorResponse = require('../lib/error-response-sender');
const mailSend = require('../lib/mail-send');


module.exports = {
  fetchAll: async (req, res) => {
    try {
      const blogPosts = await BlogPost.find().populate('category', 'name').populate('user', 'full_name')
      successResponse(res, 'List of all blog posts', blogPosts);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  fetchOne: async (req, res) => {
    console.log(req.user);
    try {
      const blogPost = await (await BlogPost.findById(req.params.id).populate('category', 'name')).populate('user', 'full_name')
      if (!blogPost) errorResponse(res, 400, 'No user with the provided id')

      successResponse(res, `Post with id #${req.params.id}`, blogPost);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  create: async (req, res) => {
    try {
      const blogPost = await BlogPost.create(req.body);
      if (blogPost) {
        mailSend();
      }
      successResponse(res, 'New blog post created', blogPost);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }

  },
  patchUpdate: async (req, res) => {
    try {
      const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body)
      successResponse(res, 'Blog post updated', blogPost);
    } catch (error) {
      errorResponse(res, 500, {
        ...req.body,
        _id: req.params.id,
        error: error.message
      })
    }
  },
  putUpdate: async (req, res) => {
    try {
      const blogPost = await BlogPost.findOneAndReplace({ _id: req.params.id }, req.body)
      successResponse(res, 'Blog post updated', blogPost);
    } catch (error) {
      errorResponse(res, 500, {
        ...req.body,
        _id: req.params.id,
        error: error.message
      })
    }
  },
  delete: async (req, res) => {
    try {
      await BlogPost.remove({ _id: req.params.id });
      res.send(`BlogPost ${req.params.id} is deleted`);
    } catch (error) {
      res.send({ message: error });
    }
  }
}
