export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TODO API",
            version: "1.0.0",
            description: "A simple express Rest API for create tasks"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: ["./src/routes/*.ts"]
}