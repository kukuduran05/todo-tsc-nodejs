export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TODO Tasks",
            version: '1.0.0',
            description: 'A Simple express library API for create new Tasks with Categories'
        },
        servers: [
            {
                url: 'http://localhost:5000'
            }
        ]
    },
    apis: ["./src/routes/*.ts"]
}