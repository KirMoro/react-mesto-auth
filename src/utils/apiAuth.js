class ApiAuth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._body = options.body;
    this._content_type = 'application/json';
    this._fetch = (link, method = 'GET', body = undefined) => fetch(`${this._baseUrl}/${link}`, {
      method: method,
      headers: {
        'content-type': this._content_type
      },
      body: JSON.stringify(this._body)
    })
      .then(res => {
          if (res.ok) {
            return res.json();

          }
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      )
      .then((result) => {
        return result;
      });
  }

  getInitialCards() {
    return this._fetch('cards');
  }

  getProfileInfo() {
    return this._fetch('users/me');
  }

  setProfileInfo(body) {
    return this._fetch('users/me', 'PATCH', body);
  }

  setProfileAvatar({ avatar }) {
    return this._fetch('users/me/avatar', 'PATCH', { avatar });
  }

  setNewCard(body) {
    return this._fetch('cards', 'POST', body);
  }

  deleteCard(id) {
    return this._fetch(`cards/${id}`, 'DELETE');
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this._fetch(`cards/likes/${id}`, 'PUT')
    } else {
      return this._fetch(`cards/likes/${id}`, 'DELETE');
    }
  }
}

export const apiAuth = new ApiAuth({
  baseUrl: 'https://auth.nomoreparties.co/',
  body: {
    "password": "somepassword",
    "email": "email@yandex.ru"
  }
});
