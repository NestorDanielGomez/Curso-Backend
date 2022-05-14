import knex from "knex";
import { dbMaria } from "../services/mariadb";
import { dbSqlite } from "../services/sqlite";

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

export const ProductsModel = new RelationalDatabase(dbMaria, productsTableName);

export const MessagesModel = new RelationalDatabase(
  dbSqlite,
  messagesTableName
);

const dbProducts = knex(dbMaria);
const dbMessages = knex(dbSqlite);

const initProductsTable = async () => {
  await dbProducts.schema.createTable(
    productsTableName,
    async (productsTable) => {
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
        dbProducts(productsTableName).insert(aProduct)
      );
      await Promise.all(createProducts);
    }
  );
};

const initMessagesTable = async () => {
  await dbMessages.schema.createTable(
    messagesTableName,
    async (messagesTable) => {
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
        dbMessages(messagesTableName).insert(aMessage)
      );
      await Promise.all(createMessages);
    }
  );
};

export const addMessageTotable = async (message: {}) => {
  await dbMessages(messagesTableName).insert(message);
};

export const initDb = async () => {
  const productsTableExists = await dbProducts.schema.hasTable(
    productsTableName
  );
  const messagesTableExists = await dbMessages.schema.hasTable(
    messagesTableName
  );

  if (!productsTableExists) {
    console.log("Products Table not exists, creating it");
    await initProductsTable();
  }
  if (!messagesTableExists) {
    console.log("Messages Table not exists, creating it");
    await initMessagesTable();
  }
};
