
export async function POST(request: Request) {
    const res = await request.json();
    console.log(res)
    const sessionToken = res.payload?.data?.token;
    if(!sessionToken){
        return Response.json({message: 'khong nhan duoc token'},{
            status: 400
        })
    }

    return Response.json(res.payload, {
        status: 200,
        statusText: 'OK',
        headers: {
            'set-cookie': `sessionToken=${sessionToken};  Path=/; HttpOnly`
        }
    })
}