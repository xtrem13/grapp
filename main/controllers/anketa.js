const { ipcMain } = require('electron')
const window = require('electron').BrowserWindow;
const {Anketa} = require('../models');

const anketa_controller = () => {

    const create = async (event, args) => {
        try {
            const anketa = args.id ? await Anketa.upsert(args, { returning: true })
                : await Anketa.create(args)
            event.reply('anketa_saved', args.id ? anketa[0].dataValues : anketa.dataValues);
        }
        catch (e) {
            console.log(e)
            event.reply('error_occured', e.errors);
        }
    }
    const list = async (event, win) => {
        const anketas = await Anketa.findAll({
            limit: 2,
            offset: 1
        });
        win.webContents.send('anketa_list_resp', anketas);
    }
    const get = async (event)=>{
        var anketas = await Anketa.findAll();
        anketas=anketas.map(item=>item.dataValues);
        event.reply("get-anketas", anketas);
    }
    return {
        anketa: {
            create: create,
            list: list,
            get:get
        }
    }

}

module.exports = anketa_controller();