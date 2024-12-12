const tenderValidator = require("../../validators/tenderValidator/tendervalidator");
const tenderService = require("../../services/tenderService/tenderService");
const cloudinary = require("../../config/cloudinaryConfig");
const createTenderController = (req, res, next) => {
  try {
    const { error, value } = tenderValidator.validate(req.body);
    if (error) {
      return res.status.json({
        error: {
          message: error.details[0].message,
        },
      });
    }
    let fileUploadUrl;
    const file = req.file;
    cloudinary.uploader.upload(file.path, async (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "unable to upload file",
        });
      }
      fileUploadUrl = result.secure_url;
      value.fileUpload = fileUploadUrl;
      value.tenderUploadedBy = req.user._id;
      const tender = await tenderService.createTender(value);
      if (!tender) {
        return res.status(400).json({
          status: "error",
          data: { message: "Tender Not Created Successfully" },
        });
      }
      return res.status(200).json({
        status: "success",
        data: tender,
      });
    });
  } catch (error) {
    next(error.message);
  }
};

module.exports = createTenderController;
