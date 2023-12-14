const { default: mongoose } = require('mongoose');
const { catchAsync, httpStatusCodes, checkIsValidId } = require('../helper/helper');
const {addActivity} = require('../helper/activityHandler');
const faqPostCategoryModel = require('../model/schema/faqPostCategorySchema');
const faqPostModel = require('../model/schema/faqPostSchema');

const getAllFaqCategories = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page is required',
      });
   }

   const DOCUMENT_LIMIT = 30;
   const documentCount = await faqPostCategoryModel.countDocuments();
   const allFaqCategory = await faqPostCategoryModel.aggregate([
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      { $sort: { createdAt: -1 } },
      { $project: { heading: 1, isShow: 1, createdAt: 1 } },
   ]);

   if (allFaqCategory) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
         totalDocuments: documentCount,
         categories: allFaqCategory,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'categories not found!',
   });
});

const createNewFaqCategory = catchAsync(async function (req, res, next) {
   const { heading, isShow, metaData } = req.body;

   const storeData = await faqPostCategoryModel({
      heading,
      isShow,
      metaData,
   }).save();

   if (storeData) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'New FAQ',
         action: `admin created new FAQ category`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         errror: false,
         message: 'Saved',
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      errror: true,
      message: 'Internal server errror',
   });
});

const deleteFaqCategory = catchAsync(async function (req, res, next) {
   const { categoryId } = req.query;

   if (!categoryId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Category id is required',
      });
   }

   const isValidId = checkIsValidId(categoryId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Category is not valid id please check.',
      });
   }

   const deleteCategory = await faqPostCategoryModel.deleteOne({ _id: categoryId });

   if (deleteCategory.deletedCount) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'FAQ deleted',
         action: `admin deleted a FAQ category`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Category is deleted',
         categoryId,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      errror: true,
      message: 'Not found',
   });
});

const getSingleCategory = catchAsync(async function (req, res, next) {
   const { categoryId } = req.query;

   if (!categoryId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Category id is required',
      });
   }

   const isValidId = checkIsValidId(categoryId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Category is not valid id please check.',
      });
   }

   const findCategory = await faqPostCategoryModel.findOne({ _id: categoryId }, { createdAt: 0, __v: 0 });

   if (findCategory) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         item: findCategory,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      errror: true,
      message: 'Not found',
   });
});

const updateFaqCategory = catchAsync(async function (req, res, next) {
   const { _id, heading, isShow, metaData } = req.body;

   if (!_id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Category id is required',
      });
   }

   const isValidId = checkIsValidId(_id);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Id is not valid id please check.',
      });
   }

   const findCategoryAndUpdate = await faqPostCategoryModel.updateOne(
      { _id },
      {
         $set: {
            heading,
            isShow,
            metadata: !!metaData ? metaData : '',
         },
      }
   );

   if (findCategoryAndUpdate.modifiedCount) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'Update FAQ',
         action: `admin updated a FAQ category`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Category updated',
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

const getAllFaqCategoriesList = catchAsync(async function (req, res, next) {
   const allFaqCategory = await faqPostCategoryModel.find({}, { heading: 1 });

   if (allFaqCategory) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         items: allFaqCategory,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      errror: true,
      message: 'Not found',
   });
});

const createNewFaqPost = catchAsync(async function (req, res, next) {
   const { heading, isDefault, metaData, categoryId } = req.body;

   if (!categoryId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Category id is required',
      });
   }

   const isValidId = checkIsValidId(categoryId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Id is not valid id please check.',
      });
   }

   const _id = mongoose.Types.ObjectId();

   const newPost = await faqPostModel({
      _id,
      heading,
      isDefault,
      metaData,
      categoryId,
   }).save();

   if (newPost) {
      // store post id in faq category document.
      const storePostInCategoryDoc = await faqPostCategoryModel.updateOne(
         { _id: categoryId },
         {
            $push: {
               posts: {
                  postId: _id,
               },
            },
         }
      );

      console.log(storePostInCategoryDoc);

      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId,
         type: 'New FAQ',
         action: `admin created new FAQ`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         message: 'Post saved',
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      errror: true,
      message: 'Internal server errror',
   });
});

const getAllFaqPosts = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page is required',
      });
   }

   const DOCUMENT_LIMIT = 30;
   const documentCount = await faqPostModel.countDocuments();
   const allFaqPosts = await faqPostModel.aggregate([
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      { $sort: { createdAt: -1 } },
      { $project: { heading: 1, isDefault: 1, createdAt: 1 } },
   ]);

   if (allFaqPosts) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
         totalDocuments: documentCount,
         posts: allFaqPosts,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'categories not found!',
   });
});

const getSingleFaqPosts = catchAsync(async function (req, res, next) {
   const { postId } = req.query;

   if (!postId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'postId is required',
      });
   }

   const isValidId = checkIsValidId(postId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'postId is not valid id please check.',
      });
   }

   const findPost = await faqPostModel.findOne({ _id: postId }, { createdAt: 0, __v: 0 });

   if (findPost) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         item: findPost,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Post not found!',
   });
});

const updatePost = catchAsync(async function (req, res, next) {
   const { heading, isDefault, metaData, categoryId, postId } = req.body;

   if (!postId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'postId is required',
      });
   }

   const isValidId = checkIsValidId(postId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'postId is not valid id please check.',
      });
   }

   const checkPostExists = await faqPostModel.findOne({ _id: postId }, { _id: 1, categoryId: 1 });

   if (!checkPostExists) {
      return res.status(httpStatusCodes.NOT_FOUND).json({
         success: false,
         error: true,
         message: 'post not found!',
      });
   }

   const updatePostDocument = await faqPostModel.updateOne(
      { _id: postId },
      {
         $set: {
            heading,
            isDefault,
            metaData,
            categoryId,
         },
      }
   );

   if (updatePostDocument.modifiedCount) {
      // update post category
      // if the post id is same then no need to store the update the post document.
      if (!!checkPostExists && checkPostExists?.categoryId.valueOf() !== categoryId) {
         const removeIdFromPrevCategory = await faqPostCategoryModel.updateOne(
            { _id: checkPostExists?.categoryId },
            {
               $pull: { posts: { postId: postId } },
            }
         );

         if (!removeIdFromPrevCategory) {
            throw Error('someting worng with removing post id from prev post category document');
         }

         const storePostInCategoryDoc = await faqPostCategoryModel.updateOne(
            { _id: categoryId },
            { $push: { posts: { postId: postId } } }
         );

         if (!storePostInCategoryDoc) {
            throw Error('someting worng with add post id from new post category document');
         }
      }

      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'update FAQ',
         action: `admin updated a FAQ`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Updated',
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No change',
   });
});

const deleteFaqPost = catchAsync(async function (req, res, next) {
   const { postId } = req.query;

   if (!postId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'postId is required',
      });
   }

   const isValidId = checkIsValidId(postId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'postId is not valid id please check.',
      });
   }

   const deletePost = await faqPostModel.deleteOne({ _id: postId });

   if (deletePost.deletedCount) {
      // create admin activity
      const time = new Date();
      await addActivity({
         userId: req.userId, 
         type: 'delete FAQ',
         action: `admin deleted a FAQ`,
         createdAt: time,
         createdById: req.userId
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: true,
         message: 'Post Deleted',
         postId,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

module.exports = {
   getAllFaqCategories,
   createNewFaqCategory,
   deleteFaqCategory,
   getSingleCategory,
   updateFaqCategory,
   getAllFaqCategoriesList,
   createNewFaqPost,
   getAllFaqPosts,
   getSingleFaqPosts,
   updatePost,
   deleteFaqPost,
};
