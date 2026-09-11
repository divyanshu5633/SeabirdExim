const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function optimizePlates() {
  const dir = path.join(__dirname, '..', 'public', 'images', 'cinematic');
  
  // 1. Origin Mundra Port (1920x1080)
  const truckOverlay = Buffer.from(`
<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mNavy" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0b2440"/>
      <stop offset="100%" stop-color="#07182a"/>
    </linearGradient>
    <filter id="cSh">
      <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="#000" flood-opacity="0.8"/>
    </filter>
  </defs>
  <!-- Precisely cover the green container on the truck with Seabird Navy Container -->
  <g transform="translate(1376, 803)">
    <rect x="0" y="0" width="170" height="56" fill="url(#mNavy)" rx="2"/>
    <rect x="0" y="0" width="170" height="4" fill="#143e6d"/>
    <!-- Seabird Emblem and Branding -->
    <g transform="translate(12, 34)" filter="url(#cSh)">
      <path d="M0,-4 C 6,-12 16,-8 22,-2 C 16,-1 12,3 10,9 C 8,4 5,1 0,-4 Z" fill="#f5b041" />
      <text x="26" y="2" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="900" fill="#ffffff" letter-spacing="0.8">SEABIRD EXIM</text>
    </g>
    <text x="100" y="14" font-family="'Consolas', monospace" font-size="8" font-weight="bold" fill="#ffffff" opacity="0.9">SBEU 492081 4</text>
  </g>
</svg>
  `);

  const baseOrigin = await sharp(path.join(__dirname, '..', 'public', 'images', 'home_ocean_shipping.jpg'))
    .resize(1920, 1080, { fit: 'cover', position: 'center' })
    .toBuffer();

  await sharp(baseOrigin)
    .composite([{ input: truckOverlay, blend: 'over' }])
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'plate1_origin_mundra.webp'));
  console.log('Created plate1_origin_mundra.webp with precision-placed Seabird container');

  // 2. Crane Lift (1920x1080)
  await sharp(path.join(dir, 'hero_seabird_container_lift.jpg'))
    .resize(1920, 1080, { fit: 'cover', position: 'center' })
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'plate2_crane_lift.webp'));
  console.log('Created plate2_crane_lift.webp');

  // 3. Vessel Departure & Wake (1920x1080)
  await sharp(path.join(dir, 'ship_leaving_port.jpg'))
    .resize(1920, 1080, { fit: 'cover', position: 'center' })
    .webp({ quality: 88 })
    .toFile(path.join(dir, 'plate3_ship_departure.webp'));
  console.log('Created plate3_ship_departure.webp');

  // 4. Seabird Flight (1920x1080)
  await sharp(path.join(dir, 'scene5_seabird_flight.jpg'))
    .resize(1920, 1080, { fit: 'cover', position: 'center' })
    .webp({ quality: 88 })
    .toFile(path.join(dir, 'plate3b_seabird_glide.webp'));
  console.log('Created plate3b_seabird_glide.webp');

  // 5. Ocean Transit with Seabird Container on deck (1920x1080)
  await sharp(path.join(dir, 'ocean_ship_seabird_deck.jpg'))
    .resize(1920, 1080, { fit: 'cover', position: 'center' })
    .webp({ quality: 88 })
    .toFile(path.join(dir, 'plate4_ocean_transit.webp'));
  console.log('Created plate4_ocean_transit.webp');

  // 6. Destination Port Discharge (1920x1080)
  await sharp(path.join(dir, 'destination_crane_discharge.jpg'))
    .resize(1920, 1080, { fit: 'cover', position: 'center' })
    .webp({ quality: 88 })
    .toFile(path.join(dir, 'plate5_destination_port.webp'));
  console.log('Created plate5_destination_port.webp');

  // 7. Final Delivery Truck with Seabird Container (1920x1080)
  await sharp(path.join(dir, 'final_truck_delivery_seabird.jpg'))
    .resize(1920, 1080, { fit: 'cover', position: 'center' })
    .webp({ quality: 88 })
    .toFile(path.join(dir, 'plate6_final_delivery.webp'));
  console.log('Created plate6_final_delivery.webp');

  // 8. Isolated Seabird Container box sprite (webp)
  await sharp(path.join(dir, 'hero_seabird_container_box.jpg'))
    .resize(800, 200, { fit: 'fill' })
    .webp({ quality: 92 })
    .toFile(path.join(dir, 'sprite_seabird_container.webp'));
  console.log('Created sprite_seabird_container.webp');

  // Print sizes of generated plates
  const plates = [
    'plate1_origin_mundra.webp',
    'plate2_crane_lift.webp',
    'plate3_ship_departure.webp',
    'plate3b_seabird_glide.webp',
    'plate4_ocean_transit.webp',
    'plate5_destination_port.webp',
    'plate6_final_delivery.webp',
    'sprite_seabird_container.webp'
  ];
  let totalSize = 0;
  for (const p of plates) {
    const stat = fs.statSync(path.join(dir, p));
    totalSize += stat.size;
    console.log(p, ':', (stat.size / 1024).toFixed(1), 'KB');
  }
  console.log('Total bundle size:', (totalSize / 1024).toFixed(1), 'KB');
}

optimizePlates().catch(err => {
  console.error(err);
  process.exit(1);
});
