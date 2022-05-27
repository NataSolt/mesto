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

deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._errorHadler);
  }



toggleLike(id, status) {
    return fetch(`${this._url}/cards/${id}/likes`, {
        method: status ? 'DELETE' : 'PUT',
        headers: this._headers,
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
patchAvatar(data) {
    console.log(JSON.stringify({avatar:data['avatar']}));
    return fetch(`${this._url}/users/me/avatar`, {
        method:'PATCH',
        headers: this._headers,
        body: JSON.stringify({avatar:data['avatar']}
    )
}).then(this._errorHadler)
}
getAllPromise() {
    return Promise.all([this.getCards(), this.getUsers()]);
  }

}