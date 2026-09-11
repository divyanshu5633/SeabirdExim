const sharp = require('sharp');
const path = require('path');

async function maskGull() {
  const input = path.join(__dirname, '..', 'public', 'images', 'cinematic', 'gull_crop.jpg');
  const output = path.join(__dirname, '..', 'public', 'images', 'cinematic', 'gull_alpha.png');

  const { data, info } = await sharp(input)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  // Sample water color from edges
  // The water in gull_crop.jpg has roughly: R: 100-135, G: 120-155, B: 140-180
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const outIdx = (y * width + x) * 4;

      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Bird feathers are either:
      // 1) Bright white (r > 190, g > 190, b > 190)
      // 2) Dark wing tips (r < 75, g < 75, b < 75)
      // 3) Grey body (r: 140-185, g: 140-185, b: 150-190 with low saturation)
      // Water has higher blue/green bias and characteristic values around 100-140
      
      // Calculate distance from water color
      // In this crop, water is mostly around r: 105-135, g: 125-155, b: 145-180
      const isWater = (r > 90 && r < 145 && g > 110 && g < 165 && b > 130 && b < 190 && Math.abs(b - r) > 20 && Math.abs(b - r) < 55);

      // Distance from gull center
      const dx = (x - width * 0.52) / (width * 0.45);
      const dy = (y - height * 0.45) / (height * 0.45);
      const dist = Math.sqrt(dx * dx + dy * dy);

      let alpha = 255;
      if (dist > 1.05 || isWater) {
        alpha = 0;
      } else if (dist > 0.85 && isWater) {
        alpha = 0;
      }

      out[outIdx] = r;
      out[outIdx + 1] = g;
      out[outIdx + 2] = b;
      out[outIdx + 3] = alpha;
    }
  }

  // Smooth & blur the alpha mask slightly for soft feathered feather edges
  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(output);

  console.log('gull_alpha.png created!');
}

maskGull().catch(console.error);
