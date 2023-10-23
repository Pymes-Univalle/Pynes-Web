import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useAppDispatch, useAppSelector } from "./app/redux/hooks";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  
  // if (request.nextUrl.pathname.startsWith('/Productores')) {
  //   return NextResponse.rewrite(new URL('/Login', request.url))
  // }
}
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/Productores/Mostrar','/Productores/Crear']
// }