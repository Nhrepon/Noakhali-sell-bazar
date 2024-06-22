const express = require("express");
const ProductController = require("../controller/ProductController");
const UserController = require("../controller/UserController");
const WishListController = require("../controller/WishListController");
const CartListController = require("../controller/CartListController");
const InvoiceController = require("../controller/InvoiceController");
const FeaturesController = require("../controller/FeaturesController");

const router = express.Router();

const AuthMiddleware = require("../middleware/AuthMiddleware");




/// Product
router.get("/productBrandList",AuthMiddleware,ProductController.productBrandList);
router.get("/productCategoryList", ProductController.productCategoryList);
router.get("/productSliderList", ProductController.productSliderList);
router.get("/productListByBrand/:brandId",ProductController.productListByBrand);
router.get("/productListByCategory/:categoryId",ProductController.productListByCategory);
router.get( "/productListBySimilar/:categoryId",ProductController.productListBySimilar);
router.get( "/productListByKeyword/:keyword", ProductController.productListByKeyword);
router.get( "/productListByRemark/:remark",ProductController.productListByRemark);
router.get("/productDetails/:productId", ProductController.productDetails);
router.get( "/productReviewList/:productId", ProductController.productReviewList);
router.post("/productListByFilter", ProductController.productListByFilter);

/// User
router.get("/userOtp/:email", UserController.userOtp);
router.get("/verifyLogin/:email/:otp", UserController.verifyLogin);
router.get("/userLogout", UserController.userLogout);

router.post("/userRegistration", UserController.userRegistration);
router.get("/userLogin/:email/:password", UserController.userLogin);
router.get("/userVerify/:email/:otp", UserController.userVerify);

router.get("/userProfileRead", AuthMiddleware, UserController.userProfileRead);
router.post("/userProfileUpdate", AuthMiddleware, UserController.userProfileUpdate);
router.post("/userProfileDelete/:id",AuthMiddleware,UserController.userProfileDelete);

/// Wish
router.get("/saveWishList", AuthMiddleware, WishListController.saveWishList);
router.get("/wishList", AuthMiddleware, WishListController.wishList);
router.get("/removeWishList",AuthMiddleware,WishListController.removeWishList);

/// Cart
router.get("/saveCartList", AuthMiddleware, CartListController.saveCartList);
router.get("/cartList", AuthMiddleware, CartListController.cartList);
router.get("/updateCartList/:cartId",AuthMiddleware,CartListController.updateCartList);
router.get("/deleteCartList", AuthMiddleware,CartListController.deleteCartList);

/// Invoice
router.post("/createInvoice", AuthMiddleware, InvoiceController.createInvoice);
router.get("/invoiceList", AuthMiddleware, InvoiceController.invoiceList);
router.get("/invoiceProductList/:invoiceId",AuthMiddleware,InvoiceController.invoiceProductList);

router.get( "/paymentSuccess/:txnId", AuthMiddleware, InvoiceController.paymentSuccess);
router.get( "/paymentCancel/:txnId", AuthMiddleware, InvoiceController.paymentCancel);
router.get("/paymentFail/:txnId", AuthMiddleware, InvoiceController.paymentFail);
router.get("/paymentIPN/:txnId", AuthMiddleware, InvoiceController.paymentIPN);

/// Features
router.get("/featureList", FeaturesController.featureList);
router.get("/legalDetails/:type", FeaturesController.legalDetails);

/// Create Review
router.post("/createReview", AuthMiddleware, ProductController.createReview);

module.exports = router;
