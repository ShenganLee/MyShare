const { app, Menu } = require("electron");

const darwinTemplate = [
  {
    label: app.getName(),
    submenu: [{ role: "about" }, { role: "quit" }],
  },
];

const defaultTemplate = [];

const setupDevelopmentEnvironment = (mainWindow) => {
  mainWindow.webContents.on('context-menu', (_, props) => {
    const { x, y } = props;

    Menu.buildFromTemplate([
      {
        label: 'Inspect element',
        click: () => {
          mainWindow.webContents.inspectElement(x, y);
        },
      },
    ]).popup({ window: mainWindow });
  });
}

const buildMenu = (mainWindow) => {
  const template =
    process.platform === "darwin" ? darwinTemplate : defaultTemplate;

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  if (process.env.electronEnv = 'development') setupDevelopmentEnvironment(mainWindow)
};

module.exports = buildMenu;
