import { NextRequest } from "next/server";

async function sendCaptcha(req: NextRequest) {
  const requestBody = await req.json();
  console.log("1111-requestBody", requestBody);

  let formdata = new FormData();
  for (const key in requestBody) {
    formdata.append(key, requestBody[key]);
  }

  let requestOptions: any = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  return fetch(
    "http://chat.buzhizhe.cn/index.php/api/user/captcha",
    requestOptions,
  );
}

export async function POST(req: NextRequest) {
  try {
    return await sendCaptcha(req);
  } catch (error) {
    console.error("[sendCode]", error);
  }
}

export const config = {
  runtime: "edge",
};
