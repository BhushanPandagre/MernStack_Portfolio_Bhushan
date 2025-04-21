// import { v2 as cloudinary } from "cloudinary";
// import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
// import { User } from "../models/userSchema.js";
// import ErrorHandler from "../middlewares/error.js";
// import { generateToken } from "../utils/jwtToken.js";
// import crypto from "crypto";
// import { sendEmail } from "../utils/sendEmail.js";

// export const register = catchAsyncErrors(async (req, res, next) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return next(new ErrorHandler("Avatar Required!", 400));
//   }
//   const { avatar, resume } = req.files;

//   //POSTING AVATAR
//   const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
//     avatar.tempFilePath,
//     { folder: "PORTFOLIO AVATAR" }
//   );
//   if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
//     console.error(
//       "Cloudinary Error:",
//       cloudinaryResponseForAvatar.error || "Unknown Cloudinary error"
//     );
//     return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
//   }

//   //POSTING RESUME
//   const cloudinaryResponseForResume = await cloudinary.uploader.upload(
//     resume.tempFilePath,
//     { folder: "PORTFOLIO RESUME" }
//   );
//   if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
//     console.error(
//       "Cloudinary Error:",
//       cloudinaryResponseForResume.error || "Unknown Cloudinary error"
//     );
//     return next(new ErrorHandler("Failed to upload resume to Cloudinary", 500));
//   }
//   const {
//     fullName,
//     email,
//     phone,
//     aboutMe,
//     password,
//     portfolioURL,
//     githubURL,
//     instagramURL,
//     twitterURL,
//     facebookURL,
//     linkedInURL,
//   } = req.body;
//   const user = await User.create({
//     fullName,
//     email,
//     phone,
//     aboutMe,
//     password,
//     portfolioURL,
//     githubURL,
//     instagramURL,
//     twitterURL,
//     facebookURL,
//     linkedInURL,
//     avatar: {
//       public_id: cloudinaryResponseForAvatar.public_id,
//       url: cloudinaryResponseForAvatar.secure_url,// Set your cloudinary secure_url here
//     },
//     resume: {
//       public_id: cloudinaryResponseForResume.public_id,
//     url: cloudinaryResponseForResume.secure_url,
//     },
//   });
//   generateToken(user, "Registered!", 201, res);
// });

// export const login = catchAsyncErrors(async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return next(new ErrorHandler("Provide Email And Password!", 400));
//   }
//   const user = await User.findOne({ email }).select("+password");
//   if (!user) {
//     return next(new ErrorHandler("Invalid Email Or Password!", 404));
//   }
//   const isPasswordMatched = await user.comparePassword(password);
//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Invalid Email Or Password", 401));
//   }
//   generateToken(user, "Login Successfully!", 200, res);
// });

// export const logout = catchAsyncErrors(async (req, res, next) => {
//   res
//     .status(200)
//     .cookie("token", "", {
//       httpOnly: true,
//       expires: new Date(Date.now()),
//     })
//     .json({
//       success: true,
//       message: "Logged Out!",
//     });
// });

// export const getUser = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.user.id);
//   res.status(200).json({
//     success: true,
//     user,
//   });
// });

// export const updateProfile = catchAsyncErrors(async (req, res, next) => {
//   const newUserData = {
//     fullName: req.body.fullName,
//     email: req.body.email,
//     phone: req.body.phone,
//     aboutMe: req.body.aboutMe,
//     githubURL: req.body.githubURL,
//     instagramURL: req.body.instagramURL,
//     portfolioURL: req.body.portfolioURL,
//     facebookURL: req.body.facebookURL,
//     twitterURL: req.body.twitterURL,
//     linkedInURL: req.body.linkedInURL,
//   };
//   if (req.files && req.files.avatar) {
//     const avatar = req.files.avatar;
//     const user = await User.findById(req.user.id);
//     const profileImageId = user.avatar.public_id;
//     await cloudinary.uploader.destroy(profileImageId);
//     const newProfileImage = await cloudinary.uploader.upload(
//       avatar.tempFilePath,
//       {
//         folder: "PORTFOLIO AVATAR",
//       }
//     );
//     newUserData.avatar = {
//       public_id: newProfileImage.public_id,
//       url: newProfileImage.secure_url,
//     };
//   }

//   if (req.files && req.files.resume) {
//     const resume = req.files.resume;
//     const user = await User.findById(req.user.id);
//     const resumeFileId = user.resume.public_id;
//     if (resumeFileId) {
//       await cloudinary.uploader.destroy(resumeFileId);
//     }
//     const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
//       folder: "PORTFOLIO RESUME",
//     });
//     newUserData.resume = {
//       public_id: newResume.public_id,
//       url: newResume.secure_url,
//     };
//   }

//   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });
//   res.status(200).json({
//     success: true,
//     message: "Profile Updated!",
//     user,
//   });
// });

// export const updatePassword = catchAsyncErrors(async (req, res, next) => {
//   const { currentPassword, newPassword, confirmNewPassword } = req.body;
//   const user = await User.findById(req.user.id).select("+password");
//   if (!currentPassword || !newPassword || !confirmNewPassword) {
//     return next(new ErrorHandler("Please Fill All Fields.", 400));
//   }
//   const isPasswordMatched = await user.comparePassword(currentPassword);
//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Incorrect Current Password!"));
//   }
//   if (newPassword !== confirmNewPassword) {
//     return next(
//       new ErrorHandler("New Password And Confirm New Password Do Not Match!")
//     );
//   }
//   user.password = newPassword;
//   await user.save();
//   res.status(200).json({
//     success: true,
//     message: "Password Updated!",
//   });
// });

// export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
//   const id = "67f7ab6aca0963fd8cafb043";
//   const user = await User.findById(id);
//   res.status(200).json({
//     success: true,
//     user,
//   });
// });

// //FORGOT PASSWORD
// export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return next(new ErrorHandler("User Not Found!", 404));
//   }
//   const resetToken = user.getResetPasswordToken();

//   await user.save({ validateBeforeSave: false });

//   const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;

//   const message = `Your Reset Password Token is:- \n\n ${resetPasswordUrl}  \n\n If 
//   You've not requested this email then, please ignore it.`;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: `Personal Portfolio Dashboard Password Recovery`,
//       message,
//     });
//     res.status(201).json({
//       success: true,
//       message: `Email sent to ${user.email} successfully`,
//     });
//   } catch (error) {
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save({ validateBeforeSave: false });
//     return next(new ErrorHandler(error.message, 500));
//   }
// });

// //RESET PASSWORD
// export const resetPassword = catchAsyncErrors(async (req, res, next) => {
//   const { token } = req.params;
//   const resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(token)
//     .digest("hex");
//   const user = await User.findOne({
//     resetPasswordToken,
//     resetPasswordExpire: { $gt: Date.now() },
//   });
//   if (!user) {
//     return next(
//       new ErrorHandler(
//         "Reset password token is invalid or has been expired.",
//         400
//       )
//     );
//   }

//   if (req.body.password !== req.body.confirmPassword) {
//     return next(new ErrorHandler("Password & Confirm Password do not match"));
//   }
//   user.password = await req.body.password;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;

//   await user.save();

//   generateToken(user, "Reset Password Successfully!", 200, res);
// });


import { v2 as cloudinary } from "cloudinary";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

// REGISTER
export const register = catchAsyncErrors(async (req, res, next) => {
  const { avatar, resume } = req.files || {};
  if (!avatar || !resume) {
    return next(new ErrorHandler("Avatar and Resume are required!", 400));
  }

  // Upload Avatar
  const avatarUpload = await cloudinary.uploader.upload(avatar.tempFilePath, {
    folder: "PORTFOLIO AVATAR",
  });

  // Upload Resume
  const resumeUpload = await cloudinary.uploader.upload(resume.tempFilePath, {
    folder: "PORTFOLIO RESUME",
  });

  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    facebookURL,
    linkedInURL,
  } = req.body;

  const user = await User.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    facebookURL,
    linkedInURL,
    avatar: {
      public_id: avatarUpload.public_id,
      url: avatarUpload.secure_url,
    },
    resume: {
      public_id: resumeUpload.public_id,
      url: resumeUpload.secure_url,
    },
  });

  generateToken(user, "Registered!", 201, res);
});

// LOGIN
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please provide both Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  generateToken(user, "Login Successfully!", 200, res);
});

// LOGOUT
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out!",
    });
});

// GET USER PROFILE
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});

// UPDATE PROFILE
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const updates = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    githubURL: req.body.githubURL,
    instagramURL: req.body.instagramURL,
    portfolioURL: req.body.portfolioURL,
    facebookURL: req.body.facebookURL,
    twitterURL: req.body.twitterURL,
    linkedInURL: req.body.linkedInURL,
  };

  const user = await User.findById(req.user.id);

  // Update avatar if provided
  if (req.files?.avatar) {
    await cloudinary.uploader.destroy(user.avatar.public_id);
    const newAvatar = await cloudinary.uploader.upload(req.files.avatar.tempFilePath, {
      folder: "PORTFOLIO AVATAR",
    });
    updates.avatar = {
      public_id: newAvatar.public_id,
      url: newAvatar.secure_url,
    };
  }

  // Update resume if provided
  if (req.files?.resume) {
    if (user.resume.public_id) {
      await cloudinary.uploader.destroy(user.resume.public_id);
    }
    const newResume = await cloudinary.uploader.upload(req.files.resume.tempFilePath, {
      folder: "PORTFOLIO RESUME",
    });
    updates.resume = {
      public_id: newResume.public_id,
      url: newResume.secure_url,
    };
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Profile Updated!",
    user: updatedUser,
  });
});

// UPDATE PASSWORD
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const user = await User.findById(req.user.id).select("+password");
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) return next(new ErrorHandler("Incorrect current password", 401));

  if (newPassword !== confirmNewPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Updated!",
  });
});

// GET PUBLIC PORTFOLIO USER
export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  const id = "67f7ab6aca0963fd8cafb043"; // Ideally, dynamic or in env
  const user = await User.findById(id);
  res.status(200).json({ success: true, user });
});

// FORGOT PASSWORD
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler("User not found", 404));

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;
  const message = `Your password reset token:\n\n${resetPasswordUrl}\n\nIf you did not request this, please ignore.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Personal Portfolio Password Recovery",
      message,
    });

    res.status(201).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler("Email could not be sent", 500));
  }
});

// RESET PASSWORD
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset token is invalid or has expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  generateToken(user, "Password Reset Successful!", 200, res);
});
