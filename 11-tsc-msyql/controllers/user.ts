import { Request, Response } from "express";
import Op from "sequelize/lib/operators";
import User from "../models/user";


export const getUsers = async (req: Request, res: Response) => {

  const users = await User.findAll()

  res.status(200).json({ users });
};


export const getUser = async (req: Request, res: Response) => {

  const { id } = req.params

  const user = await User.findByPk(id)

  if (!user) {
    res.status(400).json({
      msg: `User ID not exist: ${id} `
    })
  }
  res.status(200).json({ user });
};


export const postUser = async (req: Request, res: Response) => {

  const { body } = req

  try {

    const emailExists = await User.findOne({
      where: {
        email: body.email
      }
    })

    if (emailExists) {
      return res.status(400).json({
        msg: 'Email already Exists on the DB',
      });
    }

    const user = await User.create(body)
    res.status(201).json({
      user
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Internal server error',
    });
  }



};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { user_name, email } = req.body

  try {

    const userExists = await User.findByPk(id)

    if (!userExists) {
      res.status(400).json({
        msg: `User ID not exist: ${id} `
      })
    }


    const emailExists = await User.findOne({
      where: {
        email: email,
        id: {
          [Op.not]: id
        }
      }
    })

    if (emailExists) {
      return res.status(400).json({
        msg: 'Email already Exists on the DB',
      });
    }

    const user = await User.update({ user_name, email }, {
      where: {
        id: id
      }
    })
    res.status(201).json({
      user: userExists
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Internal server error',
    });
  }

};


export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params

  const user = await User.findByPk(id)

  if (!user) {
    res.status(400).json({
      msg: `User ID not exist: ${id} `
    })
  }

  await User.update({ state: false }, {
    where: {
      id: id
    }
  })

  res.json({
    mgs: 'success'
  });
};





