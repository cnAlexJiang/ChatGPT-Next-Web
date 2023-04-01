import { NextRequest } from "next/server";

async function login(req: NextRequest) {
  const requestBody = await req.json();
  console.log("1111-requestBody", requestBody);

  let formdata = new FormData();
  for (const key in requestBody) {
    formdata.append(key, requestBody[key]);
  }

  const requestOptions: any = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  return fetch(
    "http://chat.buzhizhe.cn/index.php/api/user/login",
    requestOptions,
  );
}

export async function POST(req: NextRequest) {
  try {
    return await login(req);
  } catch (error) {
    console.error("[login]", error);
  }
}

export const config = {
  runtime: "edge",
};
