const express = require("express");
const router = express.Router();
const { varifyJwtToken } = require("../middlewares/jwtValidator");
const faqController = require("../controllers/faqController");
const { validateNewFaqCategory, validateFaqPostData } = require("../middlewares/faqValidator");

// API => GET
router.get("/get-all-faq-categories", varifyJwtToken, faqController.getAllFaqCategories);
router.get("/get-single-faq-category", varifyJwtToken, faqController.getSingleCategory);
router.get("/get-all-faq-categories-list", varifyJwtToken, faqController.getAllFaqCategoriesList);
router.get("/get-all-faq-posts", varifyJwtToken, faqController.getAllFaqPosts);
router.get("/get-single-faq-post", varifyJwtToken, faqController.getSingleFaqPosts);

// API => POST
router.post("/create-new-faq-category", varifyJwtToken, validateNewFaqCategory, faqController.createNewFaqCategory);
router.post("/create-new-faq-post", varifyJwtToken, validateFaqPostData, faqController.createNewFaqPost);

// API => PATCH
router.patch("/update-faq-category", varifyJwtToken, validateNewFaqCategory, faqController.updateFaqCategory);
router.patch("/update-post", varifyJwtToken, validateFaqPostData, faqController.updatePost);

// API => DELETE
router.delete("/delete-faq-category", varifyJwtToken, faqController.deleteFaqCategory);
router.delete("/delete-faq-post", varifyJwtToken, faqController.deleteFaqPost);

module.exports = router;