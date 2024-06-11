import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ response: false, message: "Token not found" }, { status: 401 });
  }

  const result = verifyToken(token);

  if (!result.verified) {
    return NextResponse.json({ response: false, message: result.error }, { status: 403 });
  }

  // Optionally, you can add verified data to headers or cookies to pass it to the next handler
  const response = NextResponse.next();
  response.headers.set("x-user-id", result.data.id); // assuming result.data contains user info and id
  return response;
}


function verifyToken(token) {
  try {
    let decoded = jwt.verify(token, config.get("jwtSettings").privateKey, {
      ignoreExpiration: true,
    });
    if (decoded.expAt < moment().unix()) {
      return {
        verified: false,
      };
    }
    return {
      verified: true,
      data: decoded,
    };
  } catch (error) {
    console.log(error);
    return {
      verified: false,
    };
  }
}