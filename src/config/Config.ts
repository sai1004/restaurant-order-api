import "reflect-metadata";

export let dbConfig: any = {
    name: "default",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "food_order_db",
    logging: true,
    synchronize: false,
    entities: [__dirname + "/../entities/**/*{.ts,.js}"],
};

export let baseAuth: any = {
    user: "RestAdmin",
    password: "Adm1n0wn",
};

export let token = "UmVzdEFkbWluOkFkbTFuMHdu";
