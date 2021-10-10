const bcrypt = require('bcrypt')
const httpError = require('http-errors')

const User = require('../../../models/user')

module.exports = function () {
  let operations = {
    POST
  }

  async function POST(req, res, next) {
    const { email, password } = req.body

    try {
      await User.fromJson({ email, password })
    } catch (err) {
      return next(httpError(400, 'Email is not valid.'));
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#=\]]).{10,}$/.test(password)) {
      return next(httpError(400, 'Password must have at least 10 characters, 1 must be lowercase letter, 1 must be uppercase letter and 1 must be the one following characters: !, @, # or ?.'))
    }

    const user = await User.findByEmail(email)

    if (!user) {
      return next(httpError(404, 'User not found.'))
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return next(httpError(400, 'Password doesn\'t match'))
    }

    const token = await User.createToken(user);

    if (!token) {
      return next(httpError(400, 'Error creating authentication token'))
    }

    res.status(200).send(token)
  }

  POST.apiDoc = {
    summary: 'User login.',
    operationId: 'login',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/User',
          },
        }
      },
    },
    responses: {
      200: {
        description: 'Bearer token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              items: {
                $ref: '#/components/schemas/Token',
              },
            },
          },
        },
      },
      400: {
        description: 'Wrong password',
      },
      404: {
        description: 'Email not found',
      },
    }
  }

  return operations
}
