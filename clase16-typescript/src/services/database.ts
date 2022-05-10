import knex from "knex";

const dbConfig = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    port: 3306,
    password: "",
    database: "nestordb",
  },
};

class RelationalDatabase {
  connection: any;
  tableName: string;

  constructor(config: any, tableName: string) {
    this.connection = knex(config);
    this.tableName = tableName;
  }

  get(id?: number) {
    if (id) return this.connection(this.tableName).where("id", id);

    return this.connection(this.tableName);
  }

  create(data: any) {
    return this.connection(this.tableName).insert(data);
  }

  update(id: number, data: any) {
    return this.connection(this.tableName).where("id", id).update(data);
  }

  delete(id: number) {
    return this.connection(this.tableName).where("id", id).del();
  }
}

const productsTableName = "products";
const messagesTableName = "messages";

export const ProductsModel = new RelationalDatabase(
  dbConfig,
  productsTableName
);

export const MessagesModel = new RelationalDatabase(
  dbConfig,
  messagesTableName
);

// export const MessagesModel = new RelationalDatabase(sqliteConfig, "messages");

const db = knex(dbConfig);

const initProductsTable = async () => {
  await db.schema.createTable(productsTableName, async (productsTable) => {
    productsTable.increments();
    productsTable.string("name").notNullable();
    productsTable.integer("stock").notNullable();
    productsTable.decimal("price", 4, 2);
    productsTable.timestamps(true, true);

    const initProducts = [
      {
        name: "cartuchera",
        stock: 20,
        price: "10.5",
      },
      {
        name: "pendrive",
        stock: 20,
        price: "99.4",
      },
    ];
    const createProducts = initProducts.map((aProduct) =>
      db(productsTableName).insert(aProduct)
    );
    await Promise.all(createProducts);
  });
};

const initMessagesTable = async () => {
  await db.schema.createTable(messagesTableName, async (messagesTable) => {
    messagesTable.increments();
    messagesTable.string("author").notNullable();
    messagesTable.string("text").notNullable();
    messagesTable.timestamps(true, true);

    const initMessages = [
      {
        author: "bot1",
        text: "el bot saluda ",
      },
      {
        author: "bot2",
        text: "el bot saluda again",
      },
    ];
    const createMessages = initMessages.map((aMessage) =>
      db(messagesTableName).insert(aMessage)
    );
    await Promise.all(createMessages);
  });
};

export const addMessageTotable = async (message: {}) => {
  await db(messagesTableName).insert(message);
};

export const initDb = async () => {
  const productsTableExists = await db.schema.hasTable(productsTableName);
  const messagesTableExists = await db.schema.hasTable(messagesTableName);

  if (!productsTableExists) {
    console.log("Products Table not exists, creating it");
    await initProductsTable();
  }
  if (!messagesTableExists) {
    console.log("Messages Table not exists, creating it");
    await initMessagesTable();
  }
};
