/**
 * @fileoverview Authentication Middleware
 * @description Middleware for user authentication.
 */

const jwtUtils = require('../utils/jwtUtils');

const PUBLIC_ROUTES = [
  {
    path: '/api/auth/login',
    method: 'POST',
  },
  {
    path: '/api/auth/oauth',
    method: 'POST',
  },
  {
    path: '/api/auth/refresh-token',
    method: 'POST',
  },
  {
    path: '/api/about/wag',
    method: 'GET',
  },
  {
    path: '/api/about/wag/cv',
    method: 'GET',
  },
  {
    path: '/api/about/wag/photo',
    method: 'GET',
  },
  {
    path: '/api/about/msc',
    method: 'GET',
  },
  {
    path: '/api/members',
    method: 'GET',
  },
  {
    path: '/api/collaborators',
    method: 'GET',
  },
  {
    path: '/api/collaborators/about',
    method: 'GET',
  },
  {
    path: '/api/research',
    method: 'PATCH',
  },
  {
    path: '/api/research/about',
    method: 'GET',
  },
  {
    path: '/api/publications',
    method: 'GET',
  },
  {
    path: '/api/events/group-photos',
    method: 'GET',
  },
];

const PUBLIC_ROOT_ROUTES = [
  {
    path: '/api/research',
    method: 'GET',
  },
];

/**
 * @function authMiddleware - Authenticate the user's JWT.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Function} - The next middleware function.
 */
const authMiddleware = (req, res, next) => {
  for (const route of PUBLIC_ROUTES) {
    if (req.path === route.path && req.method === route.method) {
      return next();
    }
  }

  for (const route of PUBLIC_ROOT_ROUTES) {
    if (req.path.startsWith(route.path) && req.method === route.method) {
      return next();
    }
  }

  let token = req.headers['authorization'];

  if (!token) {
    return res.unauthorized('No token provided.', 'NO_TOKEN');
  }

  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  try {
    const payload = jwtUtils.verifyToken(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.unauthorized('Token expired.', 'TOKEN_EXPIRED');
    }
    if (error.name === 'JsonWebTokenError') {
      return res.unauthorized('Invalid token.', 'INVALID_TOKEN');
    } else {
      return res.internalServerError(
        'Error verifying token.',
        'VERIFY_TOKEN_ERROR',
      );
    }
  }
};

module.exports = authMiddleware;
