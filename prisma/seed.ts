import { prisma } from "../src/app/lib/prisma";

const divisionsData = [
  {
    name: 'Barishal',
    districts: [
      { name: 'Barishal', area: 2784, estimatedTrees: 3500000, treesPerKm2: 1257 },
      { name: 'Barguna', area: 1831, estimatedTrees: 2100000, treesPerKm2: 1147 },
      { name: 'Bhola', area: 3403, estimatedTrees: 4200000, treesPerKm2: 1234 },
      { name: 'Jhalokati', area: 749, estimatedTrees: 900000, treesPerKm2: 1201 },
      { name: 'Patuakhali', area: 3221, estimatedTrees: 3800000, treesPerKm2: 1179 },
      { name: 'Pirojpur', area: 1308, estimatedTrees: 1600000, treesPerKm2: 1223 },
    ],
  },
  {
    name: 'Chattogram',
    districts: [
      { name: 'Chattogram', area: 5283, estimatedTrees: 8500000, treesPerKm2: 1608 },
      { name: 'Bandarban', area: 4479, estimatedTrees: 12000000, treesPerKm2: 2679 },
      { name: 'Brahmanbaria', area: 1927, estimatedTrees: 2200000, treesPerKm2: 1141 },
      { name: 'Chandpur', area: 1704, estimatedTrees: 1900000, treesPerKm2: 1115 },
      { name: 'Cumilla', area: 3087, estimatedTrees: 3500000, treesPerKm2: 1133 },
      { name: 'Cox\'s Bazar', area: 2492, estimatedTrees: 5500000, treesPerKm2: 2207 },
      { name: 'Feni', area: 928, estimatedTrees: 1100000, treesPerKm2: 1185 },
      { name: 'Khagrachhari', area: 2699, estimatedTrees: 7000000, treesPerKm2: 2593 },
      { name: 'Lakshmipur', area: 1440, estimatedTrees: 1600000, treesPerKm2: 1111 },
      { name: 'Noakhali', area: 3685, estimatedTrees: 4100000, treesPerKm2: 1112 },
      { name: 'Rangamati', area: 6116, estimatedTrees: 15000000, treesPerKm2: 2452 },
    ],
  },
  {
    name: 'Dhaka',
    districts: [
      { name: 'Dhaka', area: 1463, estimatedTrees: 1200000, treesPerKm2: 820 },
      { name: 'Gazipur', area: 1741, estimatedTrees: 2100000, treesPerKm2: 1206 },
      { name: 'Kishoreganj', area: 2688, estimatedTrees: 2800000, treesPerKm2: 1041 },
      { name: 'Manikganj', area: 1383, estimatedTrees: 1500000, treesPerKm2: 1084 },
      { name: 'Munshiganj', area: 954, estimatedTrees: 1000000, treesPerKm2: 1048 },
      { name: 'Narayanganj', area: 684, estimatedTrees: 600000, treesPerKm2: 877 },
      { name: 'Narsingdi', area: 1145, estimatedTrees: 1300000, treesPerKm2: 1135 },
      { name: 'Tangail', area: 3414, estimatedTrees: 4200000, treesPerKm2: 1230 },
      { name: 'Faridpur', area: 2072, estimatedTrees: 2300000, treesPerKm2: 1110 },
      { name: 'Gopalganj', area: 1490, estimatedTrees: 1700000, treesPerKm2: 1140 },
      { name: 'Madaripur', area: 1144, estimatedTrees: 1300000, treesPerKm2: 1136 },
      { name: 'Rajbari', area: 1118, estimatedTrees: 1200000, treesPerKm2: 1073 },
      { name: 'Shariatpur', area: 1181, estimatedTrees: 1300000, treesPerKm2: 1100 },
    ],
  },
  {
    name: 'Khulna',
    districts: [
      { name: 'Khulna', area: 4394, estimatedTrees: 6500000, treesPerKm2: 1479 },
      { name: 'Bagerhat', area: 3959, estimatedTrees: 8000000, treesPerKm2: 2020 },
      { name: 'Chuadanga', area: 1177, estimatedTrees: 1300000, treesPerKm2: 1104 },
      { name: 'Jessore', area: 2567, estimatedTrees: 3000000, treesPerKm2: 1168 },
      { name: 'Jhenaidah', area: 1961, estimatedTrees: 2200000, treesPerKm2: 1121 },
      { name: 'Kushtia', area: 1608, estimatedTrees: 1800000, treesPerKm2: 1119 },
      { name: 'Magura', area: 1048, estimatedTrees: 1200000, treesPerKm2: 1145 },
      { name: 'Meherpur', area: 716, estimatedTrees: 800000, treesPerKm2: 1117 },
      { name: 'Narail', area: 990, estimatedTrees: 1100000, treesPerKm2: 1111 },
      { name: 'Satkhira', area: 3858, estimatedTrees: 5500000, treesPerKm2: 1425 },
    ],
  },
  {
    name: 'Mymensingh',
    districts: [
      { name: 'Mymensingh', area: 4363, estimatedTrees: 5200000, treesPerKm2: 1191 },
      { name: 'Jamalpur', area: 2031, estimatedTrees: 2400000, treesPerKm2: 1181 },
      { name: 'Netrokona', area: 2810, estimatedTrees: 3300000, treesPerKm2: 1174 },
      { name: 'Sherpur', area: 1363, estimatedTrees: 1600000, treesPerKm2: 1173 },
    ],
  },
  {
    name: 'Rajshahi',
    districts: [
      { name: 'Rajshahi', area: 2407, estimatedTrees: 2800000, treesPerKm2: 1163 },
      { name: 'Bogra', area: 2919, estimatedTrees: 3500000, treesPerKm2: 1199 },
      { name: 'Joypurhat', area: 965, estimatedTrees: 1100000, treesPerKm2: 1139 },
      { name: 'Naogaon', area: 3436, estimatedTrees: 4100000, treesPerKm2: 1193 },
      { name: 'Natore', area: 1900, estimatedTrees: 2200000, treesPerKm2: 1157 },
      { name: 'Chapai Nawabganj', area: 1702, estimatedTrees: 2000000, treesPerKm2: 1175 },
      { name: 'Pabna', area: 2371, estimatedTrees: 2800000, treesPerKm2: 1180 },
      { name: 'Sirajganj', area: 2497, estimatedTrees: 3000000, treesPerKm2: 1201 },
    ],
  },
  {
    name: 'Rangpur',
    districts: [
      { name: 'Rangpur', area: 2367, estimatedTrees: 2800000, treesPerKm2: 1182 },
      { name: 'Dinajpur', area: 3437, estimatedTrees: 4200000, treesPerKm2: 1221 },
      { name: 'Gaibandha', area: 2179, estimatedTrees: 2500000, treesPerKm2: 1147 },
      { name: 'Kurigram', area: 2296, estimatedTrees: 2700000, treesPerKm2: 1175 },
      { name: 'Lalmonirhat', area: 1241, estimatedTrees: 1500000, treesPerKm2: 1208 },
      { name: 'Nilphamari', area: 1580, estimatedTrees: 1900000, treesPerKm2: 1202 },
      { name: 'Panchagarh', area: 1404, estimatedTrees: 1700000, treesPerKm2: 1210 },
      { name: 'Thakurgaon', area: 1809, estimatedTrees: 2200000, treesPerKm2: 1216 },
    ],
  },
  {
    name: 'Sylhet',
    districts: [
      { name: 'Sylhet', area: 3490, estimatedTrees: 10000000, treesPerKm2: 2865 },
      { name: 'Habiganj', area: 2636, estimatedTrees: 7500000, treesPerKm2: 2845 },
      { name: 'Moulvibazar', area: 2799, estimatedTrees: 12500000, treesPerKm2: 4465 },
      { name: 'Sunamganj', area: 3669, estimatedTrees: 8000000, treesPerKm2: 2180 },
    ],
  },
];

async function main() {
  console.log('Start seeding...');

  for (const division of divisionsData) {
    const upsertedDivision = await prisma.division.upsert({
      where: { name: division.name },
      update: {},
      create: { name: division.name },
    });

    console.log(`Upserted division: ${division.name}`);

    for (const district of division.districts) {
      await prisma.district.upsert({
        where: { name: district.name },
        update: {
          area: district.area,
          estimatedTrees: district.estimatedTrees,
          treesPerKm2: district.treesPerKm2,
        },
        create: {
          name: district.name,
          area: district.area,
          estimatedTrees: district.estimatedTrees,
          treesPerKm2: district.treesPerKm2,
          divisionId: upsertedDivision.id,
        },
      });
    }
    console.log(`Upserted ${division.districts.length} districts for ${division.name}`);
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
