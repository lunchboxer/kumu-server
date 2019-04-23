"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "Student",
    embedded: false
  },
  {
    name: "Gender",
    embedded: false
  },
  {
    name: "Group",
    embedded: false
  },
  {
    name: "ClassSession",
    embedded: false
  },
  {
    name: "Semester",
    embedded: false
  },
  {
    name: "Point",
    embedded: false
  },
  {
    name: "Stage",
    embedded: false
  },
  {
    name: "Attendance",
    embedded: false
  },
  {
    name: "AttendanceStatus",
    embedded: false
  },
  {
    name: "Message",
    embedded: false
  },
  {
    name: "Viewer",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();
