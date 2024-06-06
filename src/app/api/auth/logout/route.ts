import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const cookieStore = cookies();
    const token =  cookieStore.get('token')
    console.log('zooo');
    if (!token) {
      return Response.json(
        { message: "khong nhan duoc token" },
        {
          status: 401,
        }
      );
    }
  
   
    return (Response as any).json(request.json(), {
      status: 200,
      statusText: "OK",
      headers:  {
        "Set-Cookie": [
          `token=; Path=/; HttpOnly Max-Age=0`,
          `refreshToken=; Path=/; HttpOnly Max-Age=0`,
        ],
      },
    });
  }
  