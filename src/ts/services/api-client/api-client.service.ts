export interface IHeaderMap { [x: string]: string; }

export class ApiClient {
  static async get<T>(uri: string, headers: IHeaderMap = {}): Promise<T> {
    return fetch(uri, {
      method: 'GET',
      headers: {
        ...ApiClient.defaultHeaders,
        ...headers,
      },
    })
      .then(res => res.json())
      .then(resJson => resJson)
      .catch(e => {
        console.log('Error '.concat(e));
      });
  }

  static async post<T>(uri: string, body: any, headers: IHeaderMap = {}): Promise<T> {
    return fetch(uri, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        ...ApiClient.defaultPostHeaders,
        ...headers,
      },
    })
      .then(res => res.json())
      .then(resJson => resJson)
      .catch(e => {
        console.log('Error '.concat(e));
      });
  }

  private static readonly defaultHeaders: IHeaderMap = {
    Accept: 'application/json',
  };

  private static readonly defaultPostHeaders: IHeaderMap = {
    ...ApiClient.defaultHeaders,
    'Content-Type': 'application/json',
  };
}