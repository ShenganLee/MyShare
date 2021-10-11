const {
    app,
    Menu,
    shell,
} = require('electron');

const darwinTemplate = [{
    label: app.getName(),
    submenu: [
        { role: 'about' },
        { role: 'quit' }
    ]
}]

const defaultTemplate = [{
    label: app.getName(),
    submenu: [
        { role: 'about' },
        { role: 'quit' }
    ]
}]

const buildMenu = () => {
    const template =
            process.platform === 'darwin'
            ? darwinTemplate
            : defaultTemplate;

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

module.exports = buildMenu