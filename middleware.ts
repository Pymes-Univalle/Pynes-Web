import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === '/Login';
  let cookie = request.cookies.get('userToken')
  //console.log(cookie)
  
 

  if (request.nextUrl.pathname.startsWith('/Productor') && cookie == null) {
    return NextResponse.rewrite(new URL('/', request.url))
  }
 
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/Productores/Mostrar','/Productores/Crear']
// }
