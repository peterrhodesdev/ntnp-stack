import { ClassConstructor, plainToInstance } from "class-transformer";
import HttpException from "../exceptions/http.exception";

const APPLICATION_JSON = "application/json";
const UNABLE_TO_PROCESS_RESPONSE =
  "Unable to process the response from the server";

function urlWithId(url: string, id: string): string {
  return `${url}/${id}`;
}

async function performRequest(
  url: string,
  initialData: RequestInit,
): Promise<Response> {
  try {
    return await fetch(url, initialData);
  } catch (err) {
    throw new HttpException("Network error: request couldn't be completed");
  }
}

async function checkResponse(response: Response): Promise<Response> {
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful
  if (!response.ok) {
    throw new HttpException(response.statusText, response.status);
  }
  return response;
}

async function parseResponse(response: Response): Promise<any> {
  try {
    return await response.json();
  } catch (err) {
    throw new HttpException(UNABLE_TO_PROCESS_RESPONSE);
  }
}

// DELETE

export async function del(url: string, id: string): Promise<void> {
  const method = "DELETE";

  const response = await performRequest(urlWithId(url, id), { method });
  await checkResponse(response);
}

// GET / READ

export async function getMany<T>(
  url: string,
  cls: ClassConstructor<T> | undefined = undefined,
): Promise<T[]> {
  const method = "GET";
  const headers = { Accept: APPLICATION_JSON };

  const response = await performRequest(url, { method, headers });
  const checkedResponse = await checkResponse(response);
  const plainArray = await parseResponse(checkedResponse);

  if (!Array.isArray(plainArray))
    throw new HttpException(UNABLE_TO_PROCESS_RESPONSE);
  if (cls) return plainArray.map((plain) => plainToInstance(cls, plain));
  return plainArray;
}

export async function getOne<T>(
  url: string,
  id: string,
  cls: ClassConstructor<T> | undefined = undefined,
): Promise<T> {
  const method = "GET";
  const headers = { Accept: APPLICATION_JSON };

  const response = await performRequest(`${url}/${id}`, { method, headers });
  const checkedResponse = await checkResponse(response);
  const plain = await parseResponse(checkedResponse);

  if (cls) return plainToInstance(cls, plain);
  return plain;
}

// POST / CREATE

export async function post<T, U>(
  url: string,
  t: T,
  cls: ClassConstructor<U> | undefined = undefined,
): Promise<U> {
  const method = "POST";
  const headers = {
    Accept: APPLICATION_JSON,
    "Content-Type": APPLICATION_JSON,
  };
  const body = JSON.stringify(t);

  const response = await performRequest(url, { method, headers, body });
  const checkedResponse = await checkResponse(response);
  const plain = await parseResponse(checkedResponse);

  if (cls) return plainToInstance(cls, plain);
  return plain;
}

// PATCH / PUT / UPDATE

async function update<T>(
  url: string,
  id: string,
  t: T,
  method: string,
): Promise<void> {
  const headers = {
    "Content-Type": APPLICATION_JSON,
  };
  const body = JSON.stringify(t);

  const response = await performRequest(urlWithId(url, id), {
    method,
    headers,
    body,
  });
  await checkResponse(response);
}

export async function patch<T>(url: string, id: string, t: T): Promise<void> {
  return update(url, id, t, "PATCH");
}

export async function put<T>(url: string, id: string, t: T): Promise<void> {
  return update(url, id, t, "PUT");
}
