export default class UserInfo {
  constructor(personInfo) {
    this._name = document.querySelector(personInfo.name);
    this._about = document.querySelector(personInfo.about);
    this._avatar = document.querySelector(personInfo.avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name,
      this._about.textContent = data.about;
      this._avatar.src = data.avatar;
      this.id = data._id;
  }
  setAvatarInfo(data) {
    this._avatar.src = data.avatar;
  }
}
