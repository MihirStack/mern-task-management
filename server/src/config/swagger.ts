import swaggerJsdoc from "swagger-jsdoc";
import type { Options } from "swagger-jsdoc";

import env from "./env.js";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "TaskFlow API",
      version: "1.0.0",
      description:
        "REST API documentation for TaskFlow — a MERN task management application.",
      contact: {
        name: "Mihir Borsaniya",
      },
    },

    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: "Local development server",
      },
    ],

    tags: [
      {
        name: "Health",
        description: "API health and service status",
      },
      {
        name: "Authentication",
        description: "User registration and authentication",
      },
      {
        name: "Tasks",
        description: "Task management operations",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Something went wrong",
            },
          },
        },

        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "68cc1234567890abcdef1234",
            },
            name: {
              type: "string",
              example: "Mihir Borsaniya",
            },
            email: {
              type: "string",
              format: "email",
              example: "mihir@example.com",
            },
            role: {
              type: "string",
              enum: ["USER", "ADMIN"],
              example: "USER",
            },
            isActive: {
              type: "boolean",
              example: true,
            },
          },
        },

        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],

          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              example: "Mihir Borsaniya",
            },

            email: {
              type: "string",
              format: "email",
              example: "mihir@example.com",
            },

            password: {
              type: "string",
              format: "password",
              minLength: 8,
              example: "TaskFlow@123",
            },
          },
        },
      },
    },
  },

  apis: [
    "./src/docs/swagger/*.swagger.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;