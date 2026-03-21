import arcjet, { tokenBucket } from "@arcjet/next";

let aj = null;

if (process.env.ARCJET_KEY) {
  aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["userId"],
    rules: [
      tokenBucket({
        mode: "LIVE",
        refillRate: 10,
        interval: 3600,
        capacity: 10,
      }),
    ],
  });
} else {
  console.warn("ARCJET_KEY not found - rate limiting disabled");
}

export default aj;
