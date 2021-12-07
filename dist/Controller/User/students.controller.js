"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupExpr = exports.aggregateAppend = exports.aggregateAge = exports.getAggregate = exports.updateStudent = void 0;
const students_model_1 = require("../../Models/User/students.model");
const updateStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("update");
    try {
        // console.log(req.user._id);
        // if(req.user.type == "superadmin")
        // {
        let reqData = {
            name: req.body.name,
            age: req.body.age,
            created_by: req.body.name,
            created_on: new Date()
        };
        const studentDocument = new students_model_1.StudentModel(reqData);
        const saveData = yield studentDocument.save();
        if (saveData) {
            return res.send(saveData);
        }
        // }
        // else
        // {
        //     return res.send({Msg : "superadmin only allow to insert data"})
        // }
    }
    catch (err) {
        return res.send(err);
    }
});
exports.updateStudent = updateStudent;
const getAggregate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getData = yield students_model_1.StudentModel.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "created_by",
                foreignField: "name",
                as: "users"
            }
        }
    ]);
    let arrayList = [
        {
            "name": "inba",
            "age": "23"
        },
        {
            "name": "raja",
            "age": "23"
        },
        {
            "name": "seran",
            "age": "23"
        }
    ];
    // if(getData)
    // {
    //     return res.send(getData);
    // }
});
exports.getAggregate = getAggregate;
const aggregateAge = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let getData = yield students_model_1.StudentModel.aggregate([
        {
            $facet: {
                output1: [
                    {
                        $match: { age: { $gt: 11 } }
                    }
                ],
                output2: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "created_by",
                            foreignField: "name",
                            as: "usersList"
                        }
                    }
                ]
            }
        }
    ]);
    if (getData) {
        return res.send(getData);
    }
    // for(let data of getData)
    // {
    //     console.log(data.name);
    //     return res.send({Name : data.name});
    // }  
});
exports.aggregateAge = aggregateAge;
const aggregateAppend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age, created_by } = req.body;
    const created_on = new Date();
    const bulkWrite = yield students_model_1.StudentModel.bulkWrite([
        {
            insertOne: {
                document: { name, age, created_by, created_on }
            }
        },
        {
            updateOne: {
                filter: { name: req.body.filterName },
                update: {
                    $set: {
                        age: req.body.updateAge
                    }
                }
            }
        },
        {
            deleteOne: {
                filter: { name: req.body.delName }
            }
        }
    ]);
    return res.send(bulkWrite);
});
exports.aggregateAppend = aggregateAppend;
const lookupExpr = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const lookupAggr = await StudentModel.aggregate([
    //     {
    //         $lookup : {
    //             from : "users",
    //             let :{the_name : "$name", the_type : "$type"},
    //             pipeline : [
    //                 {
    //                     $match :{
    //                         $expr : {
    //                             $and : [
    //                                 {$age : [""]}
    //                             ]
    //                         }
    //                     }
    //                 }
    //             ]
    //         }
    //     }
    // ]);
    let pipeline = [];
    pipeline.push({
        $match: {
            age: 23
        }
    });
    pipeline.push({
        $project: {
            name: 1, age: 1
        }
    });
    const lookupAggr = yield students_model_1.StudentModel.aggregate(pipeline);
    return res.send(lookupAggr);
});
exports.lookupExpr = lookupExpr;
//# sourceMappingURL=students.controller.js.map