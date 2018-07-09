require("config");
const ProgramModel = require("./program");

ProgramModel.create({
    title: "Новостной сайт Opennews",
    description: `Opennews - это открытая и свободная площадка, где пользователи могут разещать свои новости

    #nodejs #express #mongodb #bootstrap`,
    attachments: ["photo-168410376_456239032", "photo-168410376_456239031", "photo-168410376_456239033"],
    exampleLink: "https://opennews.herokuapp.com",
}).then(console.log);