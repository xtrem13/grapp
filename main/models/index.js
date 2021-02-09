'use strict';
const sequelize = require('./dbconnection');
const Transport = require('./transport');

const ClientCommon = require('./clientCommon');
const ClientFiz = require('./clientFiz');
const ClientJur = require('./ClientJur');

const ClientCommonArchive = require('./clientCommonArchive.js');
const ClientFizArchive = require('./clientFizArchive');
const ClientJurArchive = require('./clientJurArchive');


const Anketa = require('./anketa');
const Transch = require('./transch');
const Contract = require('./contract');
const Premiya = require('./premiya');
const Payment = require('./payment');



ClientCommon.hasOne(ClientJur,{
    onDelete:'CASCADE',
    hooks:true
});

ClientCommon.hasOne(ClientFiz,{
    onDelete:'CASCADE',
    hooks:true
});

ClientFiz.belongsTo(ClientCommon);
ClientJur.belongsTo(ClientCommon);


ClientCommonArchive.hasOne(ClientJurArchive);

ClientCommonArchive.hasOne(ClientFizArchive);

ClientJurArchive.belongsTo(ClientCommonArchive);
ClientFizArchive.belongsTo(ClientCommonArchive);



ClientCommon.hasOne(Transport,{
    onDelete:'CASCADE',
    hooks:true,
    foreignKey: 'ZALOGADATEL_ID'
});

Transport.belongsTo(ClientCommon);

Anketa.hasMany(Transch, {
    as: 'transch',
    foreignKey: 'ANKETA_ID'
})

Anketa.hasMany(Payment, {
    as: 'payment',
    foreignKey: 'ANKETA_ID'
})

Transch.belongsTo(Anketa)



Anketa.hasMany(Transport, {
    as: 'transport',
    foreignKey: 'ANKETA_ID'
});

Transport.belongsTo(Anketa);


Transport.hasOne(Contract);

Contract.belongsTo(Transport);

Premiya.belongsTo(Transport, {foreignKey: 'OBJECT_ID'});



sequelize.sync({force: true}).then(function () {
    console.log("Database Configured");
});

module.exports = {
    ClientCommon ,
    ClientFiz,
    ClientJur,
    ClientCommonArchive ,
    ClientFizArchive ,
    ClientJurArchive ,
    Anketa ,
    Transch,
    Contract ,
    Premiya,
    Payment,
    Transport
}   