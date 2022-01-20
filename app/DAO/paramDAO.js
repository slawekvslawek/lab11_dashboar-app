import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import mongoConverter from '../service/mongoConverter';
import * as _ from "lodash";

const paramSchema = new mongoose.Schema({
    temp: {type: String},
    humidity: {type: String},
    pressure: {type: String},
    extraParam: {type: Number, required: false, default: 0},
    date: {type: String}
}, {
    collection: 'params'
});
paramSchema.plugin(uniqueValidator);

const ParamModel = mongoose.model('params', paramSchema);

async function query() {
    const result = await ParamModel.find({});
    {
        if (result) {
            return mongoConverter(result);
        }
    }
}

async function get(id) {
  const result = await ParamModel.findById(id);
  {
      if (result) {
          return mongoConverter(result);
      }
  }

}

async function getLast() {
  const result = await ParamModel.findOne().sort({'_id':-1}).limit(1);
  {
      if (result) {
          return mongoConverter(result);
      }
  }

}

async function getDataInDate(content) {

    const result = await ParamModel.find({date: {$regex: content}});
    {
        if (result) {
           return mongoConverter(result);
        }
    }
}


export default {
    query: query,
    get: get,
    getLast: getLast,
    getDataInDate: getDataInDate,

    model: ParamModel
};
