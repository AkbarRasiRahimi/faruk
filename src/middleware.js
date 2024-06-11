import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import moment from "moment";


const serverRuntimeConfig = {
  jwtSettings: {
    privateKey: "(G+KbPeShVmYp3s6v9y$B&E)H@McQfTjY",
  },
};

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/api/score")) {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Token not found" }, { status: 401 });
    }
    const result = verifyToken(token);
    console.log(serverRuntimeConfig.jwtSettings.privateKey);
    if (!result.verified) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
    }
    request.user = result.data;
    request.authenticated = true;
    return NextResponse.next();
  }
  return NextResponse.next();
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, serverRuntimeConfig.jwtSettings.privateKey, {
      ignoreExpiration: false, // Set to false to check token expiration
    });
    // Check if token has expired
    if (decoded.exp < moment().unix()) {
      return {
        verified: false,
      };
    }
    return {
      verified: true,
      data: decoded,
    };
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return {
      verified: false,
    };
  }
}
