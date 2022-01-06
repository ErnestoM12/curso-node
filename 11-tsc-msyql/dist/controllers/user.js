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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const operators_1 = __importDefault(require("sequelize/lib/operators"));
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    res.status(200).json({ users });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        res.status(400).json({
            msg: `User ID not exist: ${id} `
        });
    }
    res.status(200).json({ user });
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const emailExists = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (emailExists) {
            return res.status(400).json({
                msg: 'Email already Exists on the DB',
            });
        }
        const user = yield user_1.default.create(body);
        res.status(201).json({
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error',
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user_name, email } = req.body;
    try {
        const userExists = yield user_1.default.findByPk(id);
        if (!userExists) {
            res.status(400).json({
                msg: `User ID not exist: ${id} `
            });
        }
        const emailExists = yield user_1.default.findOne({
            where: {
                email: email,
                id: {
                    [operators_1.default.not]: id
                }
            }
        });
        if (emailExists) {
            return res.status(400).json({
                msg: 'Email already Exists on the DB',
            });
        }
        const user = yield user_1.default.update({ user_name, email }, {
            where: {
                id: id
            }
        });
        res.status(201).json({
            user: userExists
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error',
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        res.status(400).json({
            msg: `User ID not exist: ${id} `
        });
    }
    yield user_1.default.update({ state: false }, {
        where: {
            id: id
        }
    });
    res.json({
        mgs: 'success'
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map