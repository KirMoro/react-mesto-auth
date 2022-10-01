class ApiAuth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._content_type = 'application/json';
    this._fetch = (link, method = 'GET', body = undefined) => fetch(`${this._baseUrl}/${link}`, {
      method: method,
      headers: {
        'content-type': this._content_type
      },
      body: JSON.stringify({password: body.password, email: body.email})
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


  register(body) {
    return this._fetch('signup', 'POST', body)
  }

  login(body) {
    return this._fetch('signin', 'POST', body)
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
  baseUrl: 'https://auth.nomoreparties.co',
});
