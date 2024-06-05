import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Simple Auth',
    version: '1.0.0',
    description: 'This is a simple auth using JWT',
  },
  components: {
    securitySchemes:{
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  paths: {
    "/users": {
      get: {
        security: [{
          bearerAuth: []
        }],
        description: "List data of the user",
        responses: {
          200: {
            description: "",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer"
                    },
                    createdAt: {
                      type: "string"
                    },
                    email: {
                      type: "string",
                    },
                    username: {
                      type: "string"
                    }
                  }
                }
              }
            }
          },
          400: {
            description: "Bad Request"
          },
          500: {
            description: "Internal Server Error"
          }
        },

      },
      post: {
        description: "Create an user",
        responses: {
          201: {
            description: "",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer"
                    },
                    createdAt: {
                      type: "date"
                    },
                    email: {
                      type: "string",
                    },
                    username: {
                      type: "string"
                    }
                  }
                }
              }
            }
          },
          400: {
            description: "Bad Request"
          },
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string"
                  },
                  email: {
                    type: "string"
                  },
                  password: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/authenticate": {
      post: {
        description: "Authenticate an user",
        responses: {
          200: {
            description: "",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          usename: { type: "string" },
                          email: { type: "string" }
                        }
                      }
                    },
                    token: {
                      type: "string"
                    },
                  }
                }
              }
            }
          },
          400: {
            description: "Bad Request"
          },
          500: {
            description: "Internal Server Error"
          }
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string"
                  },
                  password: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

const options = {
swaggerDefinition,
  apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
