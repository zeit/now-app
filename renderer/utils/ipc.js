import { timeout } from 'promise-timeout';

const openURL = url => {
  return window.ipc.send('url-request', url);
};

const hideWindow = () => {
  return window.ipc.send('hide-window-request');
};

const openMainMenu = bounds => {
  return window.ipc.send('open-main-menu-request', bounds);
};

const openEventMenu = (bounds, spec) => {
  return window.ipc.send('open-event-menu-request', bounds, spec);
};

const onDarkModeStatusChange = invoke => {
  window.ipc.on('dark-mode-status-changed', invoke);
};

const clearDarkModeStatusChange = invoke => {
  window.ipc.removeListener('dark-mode-status-changed', invoke);
};

const onLoggedOut = invoke => {
  window.ipc.on('logged-out', invoke);
};

const clearLoggedOut = invoke => {
  window.ipc.removeListener('logged-out', invoke);
};

const onAboutScreen = invoke => {
  window.ipc.on('open-about-screen', invoke);
};

const clearAboutScreen = invoke => {
  window.ipc.removeListener('open-about-screen', invoke);
};

const onWindowOpening = invoke => {
  window.ipc.on('window-opening', invoke);
};

const clearWindowOpening = invoke => {
  window.ipc.removeListener('window-opening', invoke);
};

const onTrayDrag = invoke => {
  window.ipc.on('open-dropzone', invoke);
};

const clearTrayDrag = invoke => {
  window.ipc.removeListener('open-dropzone', invoke);
};

const getConfig = () => {
  return timeout(
    new Promise((resolve, reject) => {
      window.ipc.once(
        'config-get-response',
        (event, arg) => (arg instanceof Error ? reject(arg) : resolve(arg))
      );

      window.ipc.send('config-get-request');
    }),
    1000
  );
};

const saveConfig = (data, type, firstSave) => {
  return timeout(
    new Promise((resolve, reject) => {
      window.ipc.once(
        'config-save-response',
        (event, arg) => (arg instanceof Error ? reject(arg) : resolve(arg))
      );

      window.ipc.send('config-save-request', data, type, firstSave);
    }),
    1000
  );
};

const getDarkModeStatus = () => {
  return timeout(
    new Promise((resolve, reject) => {
      window.ipc.once(
        'dark-mode-response',
        (event, arg) => (arg instanceof Error ? reject(arg) : resolve(arg))
      );

      window.ipc.send('dark-mode-request');
    }),
    1000
  );
};

export default {
  openURL,
  hideWindow,
  openMainMenu,
  openEventMenu,
  onDarkModeStatusChange,
  onLoggedOut,
  clearLoggedOut,
  onAboutScreen,
  clearAboutScreen,
  clearDarkModeStatusChange,
  onWindowOpening,
  clearWindowOpening,
  onTrayDrag,
  clearTrayDrag,
  getConfig,
  saveConfig,
  getDarkModeStatus
};
