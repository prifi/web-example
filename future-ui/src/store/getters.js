const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.name,
  username: state => state.user.username,
  menus: state => state.system.menus,
  permisaction: state => state.system.permisaction
}
export default getters
