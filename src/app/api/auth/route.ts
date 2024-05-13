export async function POST(request: Request) {
  const res = await request.json();
  if (!res.token) {
    return Response.json(
      { message: "khong nhan duoc token" },
      {
        status: 400,
      }
    );
  }
  interface newType{
    status: number,
    statusText: string,
    headers: {
        'Set-Cookie':string[]
    }
  }

  return (Response as any).json(res, {
    status: 200,
    statusText: "OK",
    headers:  {
      "Set-Cookie": [
        `token=${res.token}; Path=/; HttpOnly`,
        `refreshToken=${res.refreshToken}; Path=/; HttpOnly`,
      ],
    },
  });
}
