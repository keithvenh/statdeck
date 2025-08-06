import { PrismaClient } from '@/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  await prisma.player.createMany({
    data: [
      {  
        altid: "sosasam01", 
        nameFirst: "Sammy",
        nameLast: "Sosa",
        nameFirstLast:"Sammy Sosa",
        nameLastFirst: "Sosa, Sammy",
        nameDisplay: "Sammy Sosa",
        nameLineup: "Sosa, S",
        bats: "R",
        throws: "R"
      },
      {   
        altid: "gracemar01",
        nameFirst: "Mark",
        nameLast: "Grace",
        nameFirstLast:"Mark Grace",
        nameLastFirst: "Grace, Mark",
        nameDisplay: "Mark Grace",
        nameLineup: "Grace, M",
        bats: "L",
        throws: "L"
      },
      {   
        altid: "sandbergryn01",
        nameFirst: "Ryne",
        nameLast: "Sandberg",
        nameFirstLast:"Ryne Sandberg",
        nameLastFirst: "Sandberg, Ryne",
        nameDisplay: "Ryne Sandberg",
        nameLineup: "Sandberg, R",
        bats: "R",
        throws: "R"
      },
      {   
        altid: "crow-armstrongpet01",
        nameFirst: "Pete",
        nameLast: "Crow-Armstrong",
        nameFirstLast:"Pete Crow-Armstrong",
        nameLastFirst: "Crow-Armstrong, Pete",
        nameDisplay: "Pete Crow-Armstrong",
        nameLineup: "Crow-Armstrong, P",
        bats: "L",
        throws: "L"
      },
      {   
        altid: "rizzoant01",
        nameFirst: "Anthony",
        nameLast: "Rizzo",
        nameFirstLast:"Anthony Rizzo",
        nameLastFirst: "Rizzo, Anthony",
        nameDisplay: "Anthony Rizzo",
        nameLineup: "Rizzo, A",
        bats: "L",
        throws: "L"
      }
    ],
  });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
});
