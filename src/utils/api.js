class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._token = options.headers.authorization;
    this._content_type = 'application/json';
    this._fetch = (link, method = 'GET', body = undefined) => fetch(`${this._baseUrl}/${link}`, {
      method: method,
      headers: {
        authorization: this._token,
        'content-type': this._content_type
      },
      body: JSON.stringify(body)
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

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '6dcd6a5f-9295-4e62-a1cd-62fe426f6415',
    'Content-Type': 'application/json',
  },
});
