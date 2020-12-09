export const http = <T>(req: RequestInfo): Promise<T> =>
  fetch(req).then((res) => res.json())
