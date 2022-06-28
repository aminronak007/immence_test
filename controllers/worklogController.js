const WorklogModel = require("../models/worklogs");
const ResponseHandler = require("../handlers/responseHandlers");
const MsgConstants = require("../constants/messageConstants");

class WorklogController {
  constructor() {}

  async addWorklogs(req, res) {
    try {
      let { userId, date, hour, notes } = req.body;

      const addWorklogs = await WorklogModel.create({
        userId,
        date,
        hour,
        notes,
      });

      addWorklogs.save((err, data) => {
        if (err) {
          console.log(err);
        } else {
          ResponseHandler.successResponse(res, 200, MsgConstants.SUCCESS, data);
        }
      });
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MsgConstants.SOMETHING_WRONG, []);
    }
  }

  async worklogsList(req, res) {
    try {
      const worklogsList = await WorklogModel.find({})
        .populate("userId")
        .exec((err, data) => {
          if (err) {
            console.log(e);
          }
          ResponseHandler.successResponse(res, 200, MsgConstants.SUCCESS, data);
        });
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MsgConstants.SOMETHING_WRONG, []);
    }
  }

  async editWorklogs(req, res) {
    try {
      const { userId, hour, date, notes } = req.body;

      const checkUser = await WorklogModel.findOne({ userId });

      if (checkUser.length === 0) {
        ResponseHandler.errorResponse(
          res,
          200,
          MsgConstants.SOMETHING_WRONG,
          []
        );
      }
      const editWorklogs = await WorklogModel.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: {
            hour,
            date,
            notes,
          },
        }
      ).exec((err, data) => {
        if (err) {
          console.log(err);
        }
        ResponseHandler.successResponse(res, 200, MsgConstants.SUCCESS, data);
      });
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MsgConstants.SOMETHING_WRONG, []);
    }
  }

  async deleteWorklog(req, res) {
    try {
      const deleteWorklog = await WorklogModel.findOneAndDelete({
        _id: req.params.id,
      }).exec((err, data) => {
        if (err) {
          console.log(e);
        }
        ResponseHandler.successResponse(res, 200, MsgConstants.SUCCESS, data);
      });
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MsgConstants.SOMETHING_WRONG, []);
    }
  }
}

module.exports = new WorklogController();
