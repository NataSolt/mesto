export class Api {
    constructor({url, headers}){
        this._url = url;
        this._headers = headers;
    }
    //функция ошибки
    _errorHadler = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка');
    }
    // получение карточек 
    getCards() {
        return fetch(`${this._url}/cards`, {
            method:'GET',
            headers: this._headers
        }).then(this._errorHadler)
    }
// отправка карточки
postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name:data['place'], link:data['link']})
    })
      .then(this._errorHadler)
  }
//удаление карточки
deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method:'DELITE',
        headers: this._headers
    }).then(this._errorHadler)
}
//поставить лайк
putLikes(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
        method:'PUT',
        headers: this._headers
    }).then(this._errorHadler)
}
//удалить лайк
deleteLikes(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method:'DELITE',
        headers: this._headers
    }).then(this._errorHadler)
}
//отправка данных пользователя
getUsers() {
    return fetch(`${this._url}/users/me`, {
        method:'GET',
        headers: this._headers
    }).then(this._errorHadler)
}
//замена данных профайла
patchUsers(data) {
    return fetch(`${this._url}/users/me`, {
        method:'PATCH',
        headers: this._headers,
        body: JSON.stringify({name:data['user'], about:data['about']}
    )
}).then(this._errorHadler)
}
// замена данных аватара
patchAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
        method:'PATCH',
        headers: this._headers,
        body: JSON.stringify({avatar:avatar['avatar']
    })
}).then(this._errorHadler)
}
getAllPromise() {
    return Promise.all([this.getCards(), this.getUsers()]);
  }

}