import { Zodios } from '@zodios/core';
import { z } from 'zod';
import { environment } from './environments/environment';
import { userSchema } from './schemas/user.schema';

export const apiClient = new Zodios(
  environment.api,
  // API definition
  [
    {
      method: 'get',
      path: '/users/:id', // auto detect :id and ask for it in apiClient get params
      alias: 'getOneUser', // optionnal alias to call this endpoint with it
      description: 'Get a user',
      response: userSchema,
    },
    {
      method: 'get',
      path: '/users/',
      alias: 'getAllUsers',
      description: 'Get all users',
      response: z.array(userSchema),
    },
    {
      method: 'post',
      path: '/users/',
      alias: 'addUser',
      description: 'Add one user',
      parameters: [
        {
          name: 'body',
          type: 'Body',
          schema: userSchema,
        },
      ],
      response: userSchema,
    },
  ] as const
);
