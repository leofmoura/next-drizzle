"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var postgres_js_1 = require("drizzle-orm/postgres-js");
var migrator_1 = require("drizzle-orm/postgres-js/migrator");
var postgres_1 = require("postgres");
var sql = (0, postgres_1.default)("...", { max: 1 });
var db = (0, postgres_js_1.drizzle)(sql);
await (0, migrator_1.migrate)(db, { migrationsFolder: "drizzle" });
await sql.end();
