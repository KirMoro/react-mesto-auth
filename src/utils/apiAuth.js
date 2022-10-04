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

  getTokenValid(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'content-type': this._content_type,
        'Authorization': `Bearer ${token}`
      },
      body: undefined
    }).then(res => {
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
}

export const apiAuth = new ApiAuth({
  baseUrl: 'https://auth.nomoreparties.co',
});
