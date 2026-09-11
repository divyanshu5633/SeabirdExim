const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function buildAssets() {
  const dir = path.join(__dirname, '..', 'public', 'images', 'cinematic');
  const baseImg = path.join(dir, 'test_spreader_container.jpg');
  
  const width = 1920;
  const height = 1018;

  // 1. Create Branded Hero Seabird Container with 100% solid industrial paint & photorealistic corrugation
  const containerOverlay = Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="deepNavy" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#081c33"/>
      <stop offset="12%" stop-color="#0c2a4c"/>
      <stop offset="50%" stop-color="#0e325a"/>
      <stop offset="85%" stop-color="#0a2542"/>
      <stop offset="100%" stop-color="#061626"/>
    </linearGradient>

    <!-- Corrugated Steel Rib Gradient -->
    <linearGradient id="ribGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="35%" stop-color="#ffffff" stop-opacity="0.04"/>
      <stop offset="65%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.45"/>
    </linearGradient>

    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Solid Marine Steel Container Side Wall (Opaque) -->
  <rect x="130" y="415" width="1660" height="395" fill="url(#deepNavy)" />
  
  <!-- Marine grade weathering & top/bottom structural rails -->
  <rect x="130" y="415" width="1660" height="12" fill="#143e6d" />
  <line x1="130" y1="427" x2="1790" y2="427" stroke="#ffffff" stroke-width="1.5" opacity="0.3" />
  
  <rect x="130" y="796" width="1660" height="14" fill="#05101a" />
  <line x1="130" y1="796" x2="1790" y2="796" stroke="#000000" stroke-width="2" />

  <!-- Photorealistic Corrugated Ribs (40-foot standard High-Cube 300mm pitch) -->
  <g>
    ${Array.from({length: 45}).map((_, i) => {
      const x = 148 + i * 36;
      return `<rect x="${x}" y="427" width="22" height="369" fill="url(#ribGrad)" />`;
    }).join('')}
  </g>

  <!-- Industrial Steel Corner Castings on Container -->
  <rect x="130" y="415" width="30" height="40" fill="#203445" stroke="#05101a" stroke-width="2"/>
  <circle cx="145" cy="435" r="8" fill="#0a1218" />
  
  <rect x="1630" y="415" width="30" height="40" fill="#203445" stroke="#05101a" stroke-width="2"/>
  <circle cx="1645" cy="435" r="8" fill="#0a1218" />

  <!-- Seabird EXIM Emblem and Gold Logo -->
  <g transform="translate(240, 560)" filter="url(#shadow)">
    <!-- Seabird stylized flight wing -->
    <path d="M 0,-15 C 30,-45 80,-30 110,-10 C 80,-5 60,15 50,45 C 40,20 25,5 0,-15 Z" fill="#f5b041" />
    <path d="M -20,-10 C 10,-35 55,-22 80,-5 C 55,0 40,15 32,38 C 24,18 10,5 -20,-10 Z" fill="#ffffff" />
    
    <!-- Text: SEABIRD EXIM -->
    <text x="135" y="15" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="76" font-weight="900" fill="#ffffff" letter-spacing="6">SEABIRD EXIM</text>
    <!-- Subtitle -->
    <text x="140" y="58" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="700" fill="#f5b041" letter-spacing="7">QUALITY FROM INDIA • BUILT FOR GLOBAL BUYERS</text>
  </g>

  <!-- Container ISO Codes on Right -->
  <g transform="translate(1360, 475)" font-family="'Consolas', 'Courier New', monospace" fill="#ffffff" opacity="0.95" filter="url(#shadow)">
    <text x="0" y="0" font-size="30" font-weight="bold" letter-spacing="3">SBEU 492081 4</text>
    <text x="0" y="32" font-size="24" font-weight="bold" letter-spacing="2">45G1  HIGH CUBE</text>
    <line x1="0" y1="44" x2="240" y2="44" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
    <text x="0" y="74" font-size="16" opacity="0.85">MAX WT. 32,500 KG</text>
    <text x="0" y="96" font-size="16" opacity="0.85">TARE WT.  3,980 KG</text>
    <text x="0" y="118" font-size="16" opacity="0.85">PAYLOAD  28,520 KG</text>
  </g>

  <!-- Customs Sealed International Placard -->
  <g transform="translate(180, 460)" filter="url(#shadow)">
    <rect x="0" y="0" width="52" height="52" fill="#c0392b" rx="4" />
    <text x="26" y="24" font-family="sans-serif" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">CUSTOMS</text>
    <text x="26" y="40" font-family="sans-serif" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">SEALED</text>
  </g>
</svg>
`);

  await sharp(baseImg)
    .composite([{ input: containerOverlay, blend: 'over' }])
    .toFile(path.join(dir, 'hero_seabird_container_lift.jpg'));
  
  console.log('Updated hero_seabird_container_lift.jpg with opaque panel');

  // 2. Extract isolated container-only sprite (without spreader) for truck loading & unloading
  await sharp(path.join(dir, 'hero_seabird_container_lift.jpg'))
    .extract({ left: 120, top: 410, width: 1670, height: 405 })
    .toFile(path.join(dir, 'hero_seabird_container_box.jpg'));
  
  console.log('Updated hero_seabird_container_box.jpg');

  // 3. Extract the real spreader only with transparency
  // The spreader is in test_spreader_container.jpg from y: 0 to y: 415
  // We can make anything below the spreader transparent
  const spreaderBase = await sharp(baseImg)
    .extract({ left: 0, top: 0, width: 1920, height: 420 })
    .toBuffer();

  await sharp(spreaderBase)
    .toFile(path.join(dir, 'hero_crane_spreader.png'));
  
  console.log('Created hero_crane_spreader.png');

  // 4. Create Ocean Ship Plate with Seabird Container on forward stack
  const shipBox = await sharp(path.join(dir, 'hero_seabird_container_box.jpg'))
    .resize(115, 30)
    .toBuffer();

  await sharp(path.join(dir, 'test_apl.jpg'))
    .composite([
      { input: shipBox, left: 205, top: 345, blend: 'over' }
    ])
    .toFile(path.join(dir, 'ocean_ship_seabird_deck.jpg'));
  console.log('Created ocean_ship_seabird_deck.jpg');

  // 5. Create Final Truck Delivery Plate with Seabird container
  const truckSvg = Buffer.from(`
<svg width="2592" height="1936" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="truckShadow">
      <feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#000000" flood-opacity="0.85"/>
    </filter>
    <linearGradient id="truckNavy" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#071a2e"/>
      <stop offset="15%" stop-color="#0b2848"/>
      <stop offset="60%" stop-color="#0e325a"/>
      <stop offset="100%" stop-color="#09223c"/>
    </linearGradient>
  </defs>
  
  <!-- Solid Marine Steel Container Side Wall covering star and front panel -->
  <rect x="2160" y="110" width="432" height="740" fill="url(#truckNavy)" rx="8"/>
  <rect x="2160" y="110" width="432" height="14" fill="#143e6d" />

  <!-- Vertical Corrugations -->
  <g opacity="0.12">
    ${Array.from({length: 12}).map((_, i) => `<rect x="${2180 + i * 34}" y="125" width="16" height="715" fill="#ffffff"/>`).join('')}
  </g>
  
  <g transform="translate(2190, 360)" filter="url(#truckShadow)">
    <path d="M 0,-15 C 30,-45 80,-30 110,-10 C 80,-5 60,15 50,45 C 40,20 25,5 0,-15 Z" fill="#f5b041" />
    <path d="M -20,-10 C 10,-35 55,-22 80,-5 C 55,0 40,15 32,38 C 24,18 10,5 -20,-10 Z" fill="#ffffff" />
    
    <text x="130" y="12" font-family="system-ui, sans-serif" font-size="44" font-weight="900" fill="#ffffff" letter-spacing="4">SEABIRD</text>
    <text x="130" y="55" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#f5b041" letter-spacing="3">EXIM</text>
    
    <text x="10" y="135" font-family="'Consolas', monospace" font-size="28" font-weight="bold" fill="#ffffff" opacity="0.95">SBEU 492081 4</text>
    <text x="10" y="170" font-family="'Consolas', monospace" font-size="22" fill="#ffffff" opacity="0.85">45G1 HIGH CUBE</text>
  </g>
</svg>
  `);

  await sharp(path.join(dir, 'scene7_final_movement.jpg'))
    .composite([{ input: truckSvg, blend: 'over' }])
    .toFile(path.join(dir, 'final_truck_delivery_seabird.jpg'));
  console.log('Created final_truck_delivery_seabird.jpg');

  // 6. Create Destination Port Unloading Plate with Seabird container on the STS crane hoist
  // scene6_destination_port is 4334 x 2364
  // In scene6_destination_port, there are massive STS cranes on the right (x: 2300 to 3800)
  // Let's place the Seabird container in the crane hoist spreader over the vessel
  const destContainerLift = await sharp(path.join(dir, 'hero_seabird_container_box.jpg'))
    .resize(220, 56)
    .toBuffer();

  const destOverlay = Buffer.from(`
<svg width="4334" height="2364" xmlns="http://www.w3.org/2000/svg">
  <!-- Hoist Cables from destination STS crane trolley down to container -->
  <line x1="2850" y1="840" x2="2850" y2="1080" stroke="#222" stroke-width="4" opacity="0.9"/>
  <line x1="3050" y1="840" x2="3050" y2="1080" stroke="#222" stroke-width="4" opacity="0.9"/>
  <!-- Spreader bar -->
  <rect x="2840" y="1070" width="225" height="15" fill="#f1c40f" stroke="#000" stroke-width="2"/>
</svg>
  `);

  await sharp(path.join(dir, 'scene6_destination_port.jpg'))
    .composite([
      { input: destOverlay, blend: 'over' },
      { input: destContainerLift, left: 2843, top: 1085, blend: 'over' }
    ])
    .toFile(path.join(dir, 'destination_crane_discharge.jpg'));
  console.log('Created destination_crane_discharge.jpg');
}

buildAssets().catch(err => {
  console.error(err);
  process.exit(1);
});

