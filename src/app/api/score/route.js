import mongoose from "mongoose";
import scoreSchema from "../../model/score.js";
import { NextResponse } from "next/server";

const mongoDbUrl = process.env.MONGODB_URI;

if (!mongoDbUrl) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

if (!mongoose.connection.readyState) {
  mongoose
    .connect(mongoDbUrl, {
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    });
}

const Score = mongoose.models.Score || mongoose.model("Score", scoreSchema);

export async function POST(req) {
  try {
    const { advert, message, rating, intern } = await req.json();

    if (!advert || !message || !rating || !intern) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newScore = new Score({ advert: advert, message, rating, intern: intern });
    await newScore.save();
    return NextResponse.json(newScore, { status: 201 });
  } catch (error) {
    console.error("Error saving new score:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export function onNoMatch(req) {
  return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405 });
}
