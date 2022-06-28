const UserModel = require("../models/user");
const ResponseHandler = require("../handlers/responseHandlers");
const MsgConstants = require("../constants/messageConstants");

class UserController {
  constructor() {}

  async addUser(req, res) {
    try {
      let { name, preferred_working_hour_per_day } = req.body;

      const addUser = await UserModel.create({
        name,
        preferred_working_hour_per_day,
      });

      addUser.save((err, data) => {
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

  async userList(req, res) {
    try {
      const userList = await UserModel.find({})
        .select("name preferred_working_hour_per_day")
        .exec((err, data) => {
          if (err) {
            console.log(e);
          }
          ResponseHandler.successResponse(
            res,
            200,
            MsgConstants.successResponse,
            data
          );
        });
    } catch (e) {
      console.log(e);
      ResponseHandler.errorResponse(res, 400, MsgConstants.SOMETHING_WRONG, []);
    }
  }
}

module.exports = new UserController();
