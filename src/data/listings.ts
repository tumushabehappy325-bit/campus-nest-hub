import type { Listing } from "@/types/listing";

type SourceHostel = {
  name: string;
  proprietor: string;
  contact: string;
  gender: "Males" | "Females" | "Both M&F";
};

type SourceArea = {
  area: string;
  hostels: SourceHostel[];
};

type SourceCampus = {
  campus: "Town Campus" | "Kihumuro Campus";
  areas: SourceArea[];
};

const officialHostels: SourceCampus[] = [
  {
    campus: "Town Campus",
    areas: [
      {
        area: "Kashanyarazi",
        hostels: [
          { name: "Corpus Christi", proprietor: "Catholic Chaplaincy", contact: "0778563086", gender: "Females" },
          { name: "Good Place", proprietor: "Flugensio Mujuzi", contact: "0772690562", gender: "Both M&F" },
          { name: "Divine Hostel", proprietor: "Sam Kasowore", contact: "0779234526", gender: "Both M&F" },
          { name: "Kazeeyi", proprietor: "Kazeeyi", contact: "0701665487", gender: "Both M&F" },
          { name: "Rwomushana", proprietor: "Rwomushana", contact: "0776815593", gender: "Both M&F" },
          { name: "Byobona", proprietor: "Byobona", contact: "0755903057", gender: "Both M&F" },
          { name: "Kananura", proprietor: "Kananura", contact: "0776551040", gender: "Both M&F" },
          { name: "Namazzi Mary", proprietor: "Namazzi Mary", contact: "0782990010", gender: "Both M&F" },
          { name: "Katushabe M", proprietor: "Katushabe M", contact: "0788122692", gender: "Both M&F" },
          { name: "Nuwagaba Innocent", proprietor: "Nuwagaba Innocent", contact: "0757563048", gender: "Both M&F" },
          { name: "Unique Hostel", proprietor: "Bashir Kwezi", contact: "0778211833", gender: "Both M&F" },
          { name: "Grace Hostel", proprietor: "Grace Tumusiime", contact: "0772949874", gender: "Both M&F" },
          { name: "B.K Hostel", proprietor: "Bernard Kasyata", contact: "0701412228", gender: "Both M&F" },
          { name: "Apollo Hostel", proprietor: "Apollo Muhairwe", contact: "0783108231", gender: "Both M&F" },
          { name: "Livingstone K", proprietor: "Livingstone Kiwanuka", contact: "0778542727", gender: "Both M&F" },
          { name: "Moses Ssengendo", proprietor: "Moses Ssengendo", contact: "0704383259", gender: "Both M&F" },
          { name: "Alice Kobusingye", proprietor: "Alice Kobusingye", contact: "0776179480", gender: "Both M&F" },
          { name: "Moses and Sons Hostels", proprietor: "Moses", contact: "0704418790", gender: "Both M&F" },
          { name: "Jackie Matovu", proprietor: "Jackie Matovu", contact: "0752479075", gender: "Both M&F" },
        ],
      },
      {
        area: "Kakyeeka & Boma",
        hostels: [
          { name: "Queen of Peace", proprietor: "Father Julius", contact: "0789909156", gender: "Both M&F" },
          { name: "Sweet Memories", proprietor: "Phillip Mpora", contact: "0751269011", gender: "Females" },
          { name: "Bat Layer", proprietor: "Tibihika", contact: "0782564538", gender: "Both M&F" },
          { name: "Tankhill Hostel", proprietor: "Eng. Tumwesigye John", contact: "0780148651", gender: "Both M&F" },
          { name: "Makuni Margaret", proprietor: "Makuni Margaret", contact: "0704139045", gender: "Both M&F" },
          { name: "Swagg Hostel", proprietor: "Richard", contact: "0703642429", gender: "Both M&F" },
          { name: "Golf Course Hostel", proprietor: "Tinyinondi family", contact: "0705310357/0782530384", gender: "Both M&F" },
          { name: "Mugurusi Hostel", proprietor: "Mugurusi Kananura H", contact: "0782349046", gender: "Both M&F" },
          { name: "Red Cross Hostel", proprietor: "URCS Mbarara", contact: "0778812231", gender: "Both M&F" },
          { name: "Willisa Hostel", proprietor: "Dr & Mrs Gasasira", contact: "0701/0772662384", gender: "Both M&F" },
        ],
      },
      {
        area: "Taso Village",
        hostels: [
          { name: "Maama Hostel", proprietor: "Christine Mukasa", contact: "0701392300", gender: "Both M&F" },
          { name: "Nanyakira Lucky", proprietor: "Nanyakira Lucky", contact: "0785009903", gender: "Both M&F" },
          { name: "St James", proprietor: "Kyomugisha", contact: "0772658733", gender: "Both M&F" },
          { name: "Twins Hostel", proprietor: "Job Baguma", contact: "0772697333", gender: "Both M&F" },
          { name: "Tripple B", proprietor: "Brian", contact: "0772491693", gender: "Both M&F" },
          { name: "Hasten A Hostel", proprietor: "E Kyomugisha", contact: "0772314995", gender: "Both M&F" },
          { name: "Hasten B Hostel", proprietor: "E Kyomugisha", contact: "0772314995", gender: "Both M&F" },
          { name: "White Hostel", proprietor: "Namagembe", contact: "0709306931", gender: "Both M&F" },
          { name: "Ebenezer Hostel", proprietor: "Jeremiah Kashoborozi", contact: "0705866421", gender: "Both M&F" },
          { name: "Cogent Hostel", proprietor: "Frederick Byarugaba", contact: "0782366652", gender: "Both M&F" },
          { name: "Suura", proprietor: "Suura", contact: "0752105124", gender: "Both M&F" },
          { name: "Grace", proprietor: "Grace", contact: "0776115796", gender: "Both M&F" },
        ],
      },
      {
        area: "kashanyarazi_2",
        hostels: [
          { name: "St James", proprietor: "James", contact: "0772658733", gender: "Both M&F" },
          { name: "M&M Hostels", proprietor: "Christine", contact: "0773413862", gender: "Both M&F" },
          { name: "Big Brother", proprietor: "Muzamil Emmy", contact: "0704471410/0775862287", gender: "Males" },
          { name: "Valley Dam", proprietor: "Gasasira", contact: "0772190631", gender: "Both M&F" },
          { name: "Alpha & Omega", proprietor: "Nahamya Mercy", contact: "0788802913", gender: "Both M&F" },
          { name: "Museko", proprietor: "Museko", contact: "0772470188", gender: "Both M&F" },
          { name: "Imanirampa", proprietor: "Imanirampa", contact: "0782679368", gender: "Males" },
          { name: "Boney", proprietor: "Boney", contact: "0771194053", gender: "Both M&F" },
          { name: "Tom Hostels", proprietor: "Musinguzi Tom", contact: "0704802726/0755141444", gender: "Both M&F" },
          { name: "Caroline Kobusingye", proprietor: "Caroline", contact: "0754889588", gender: "Both M&F" },
          { name: "Mebble", proprietor: "Mebble", contact: "0785009903", gender: "Both M&F" },
          { name: "St Mark", proprietor: "Mark", contact: "0774489629", gender: "Both M&F" },
          { name: "Victor Hostels", proprietor: "Kataha Victor", contact: "0757415346", gender: "Both M&F" },
          { name: "Mukama Hostel", proprietor: "Mukama Moses", contact: "0704267090", gender: "Both M&F" },
          { name: "Mark Hostel", proprietor: "Evas T Kazire", contact: "0702939566", gender: "Females" },
          { name: "Maama Blair", proprietor: "Maama Blair", contact: "0706680117", gender: "Both M&F" },
          { name: "Sozalio Tumuhirwe", proprietor: "Sozalio Tumuhirwe", contact: "0772658733", gender: "Both M&F" },
          { name: "Makies", proprietor: "Mabel Kyomuhendo", contact: "0775386222/0752656586", gender: "Both M&F" },
          { name: "Bonny", proprietor: "", contact: "0783869909", gender: "Both M&F" },
          { name: "Kamunyu", proprietor: "Kamunyu", contact: "0772190631", gender: "Both M&F" },
          { name: "Jjukira Hostels", proprietor: "Jjukira", contact: "0776578071", gender: "Both M&F" },
          { name: "Desire Hostel", proprietor: "Atwebembire", contact: "0777140405", gender: "Both M&F" },
          { name: "Fair Hostel", proprietor: "K. Atuhaire", contact: "0777287703", gender: "Both M&F" },
          { name: "JBN Hostels", proprietor: "John Bosco N", contact: "0778841375", gender: "Both M&F" },
          { name: "Rose Hostel", proprietor: "Rose", contact: "0782301940", gender: "Both M&F" },
          { name: "Elite Hostels", proprietor: "W. Misanvu", contact: "0751813131", gender: "Both M&F" },
          { name: "Vans Hostel", proprietor: "Wilber", contact: "0701316328", gender: "Both M&F" },
        ],
      },
      {
        area: "Kitebero - Katete - Nyamitanga",
        hostels: [
          { name: "Los Angeles", proprietor: "M. Tumwine", contact: "0784629391", gender: "Both M&F" },
          { name: "Harriet Nakato", proprietor: "Harriet Nakato", contact: "0777819335", gender: "Both M&F" },
          { name: "Saidi Sowedi", proprietor: "Saidi Sowedi", contact: "0774067235", gender: "Both M&F" },
          { name: "Nusura Rentals", proprietor: "Nusura Nakisozi", contact: "0774154686", gender: "Males" },
          { name: "Washington Flat", proprietor: "E. Komakech", contact: "0772735505", gender: "Both M&F" },
          { name: "Turyomurugyendo", proprietor: "Salvan Turyomurugyendo", contact: "0774322377", gender: "Males" },
          { name: "Twinomugisha", proprietor: "Dodoviko Twinomugisha", contact: "0779149060", gender: "Both M&F" },
          { name: "Rukundo Henry", proprietor: "Rukundo", contact: "0780101962", gender: "Both M&F" },
          { name: "NGK Hostel", proprietor: "Gerald Nkukiyimana", contact: "0784143046/0705472266", gender: "Males" },
          { name: "Tushabe", proprietor: "Innocent", contact: "0773413862", gender: "Males" },
          { name: "Zoreeka Sirasi", proprietor: "Zoreeka Sirasi", contact: "0772357574", gender: "Both M&F" },
          { name: "Edwin", proprietor: "Edwin", contact: "0702859191", gender: "Both M&F" },
          { name: "Lost City", proprietor: "Dr. Herbert", contact: "0752405584", gender: "Both M&F" },
          { name: "Margret K", proprietor: "Margret Kyomuhangi", contact: "0782611018", gender: "Both M&F" },
          { name: "Mackline", proprietor: "Mackline", contact: "0774681843", gender: "Males" },
          { name: "Mariam Nalubega", proprietor: "Mariam", contact: "0781406960", gender: "Both M&F" },
          { name: "Zahara Asiimwe", proprietor: "Zahara", contact: "0783596323", gender: "Both M&F" },
          { name: "Polline Rentals", proprietor: "Nalukwata Pollin", contact: "0703898042", gender: "Both M&F" },
          { name: "Innocent Hostel", proprietor: "Innocent", contact: "0773413862", gender: "Males" },
          { name: "Byarugaba", proprietor: "Byarugaba David", contact: "0704718317", gender: "Males" },
          { name: "Aron", proprietor: "Aron Bahana", contact: "0782076523", gender: "Both M&F" },
          { name: "Abudu Tumwebaze", proprietor: "Abudu", contact: "0786504712", gender: "Males" },
          { name: "Vincent", proprietor: "Vincent Sempebwa", contact: "0776143507", gender: "Both M&F" },
          { name: "Fred Mugisha", proprietor: "Fred", contact: "0752827627", gender: "Both M&F" },
          { name: "Mwiine", proprietor: "Mwiine Dickens", contact: "0784041384", gender: "Males" },
          { name: "Tamale", proprietor: "", contact: "0781913711", gender: "Males" },
          { name: "Tamale", proprietor: "Tamale Zakia", contact: "0777819551", gender: "Both M&F" },
          { name: "Akanduro", proprietor: "Akanduro", contact: "0759735278", gender: "Both M&F" },
          { name: "Tushabe Apollo", proprietor: "Tushabe Apollo", contact: "0782614261", gender: "Both M&F" },
        ],
      },
    ],
  },
  {
    campus: "Kihumuro Campus",
    areas: [
      {
        area: "Mile 3 / Mile 4 - Kihumuro Area",
        hostels: [
          { name: "Medard Kacururu", proprietor: "Medard Kacururu", contact: "0772841421", gender: "Both M&F" },
          { name: "Ampaire Loyce", proprietor: "Ampaire Loyce", contact: "0779549306", gender: "Males" },
          { name: "Tugume Lawrence", proprietor: "Tugume Lawrence", contact: "0774038140", gender: "Males" },
          { name: "Nalukwago", proprietor: "Nalukwago", contact: "0780558835/0772540847", gender: "Males" },
          { name: "Racheal Mutabazi", proprietor: "Racheal Mutabazi", contact: "0779144638", gender: "Males" },
          { name: "Geoffrey Mugisha", proprietor: "Geoffrey Mugisha", contact: "0772322506/0754132608", gender: "Both M&F" },
          { name: "Tuwangye Mech Gakyaro", proprietor: "Tuwangye Mech Gakyaro", contact: "0772376380", gender: "Males" },
          { name: "Katto Deogratias", proprietor: "Katto Deogratias", contact: "0787532667", gender: "Both M&F" },
          { name: "Nahwera Sylivia", proprietor: "Nahwera Sylivia", contact: "0700314145", gender: "Males" },
          { name: "Bitwiire Robert", proprietor: "Bitwiire Robert", contact: "0772304360", gender: "Both M&F" },
          { name: "Turyahabwe Jackline", proprietor: "Turyahabwe Jackline", contact: "0703121605", gender: "Both M&F" },
          { name: "Kiwewa Sifa", proprietor: "Kiwewa Sifa", contact: "0772672320", gender: "Both M&F" },
          { name: "Kizito Kudura", proprietor: "Kizito Kudura", contact: "0772650504", gender: "Both M&F" },
          { name: "Kiwewa Bashiru", proprietor: "Kiwewa Bashiru", contact: "0702035156", gender: "Both M&F" },
          { name: "Muhumuza Wiberforce", proprietor: "Muhumuza Wiberforce", contact: "0701093747", gender: "Both M&F" },
          { name: "Tumwine Asaph", proprietor: "Tumwine Asaph", contact: "0752882228", gender: "Both M&F" },
          { name: "Turyahikayo Guard", proprietor: "Turyahikayo Guard", contact: "0702540496", gender: "Both M&F" },
          { name: "Mulondo Ismail", proprietor: "Mulondo Ismail", contact: "0702230309", gender: "Males" },
          { name: "Barigye John Lewis", proprietor: "Barigye John Lewis", contact: "0771992891", gender: "Both M&F" },
        ],
      },
    ],
  },
];

function normalizePhone(raw: string): string {
  const candidates = raw
    .split(/[\/;,]/)
    .map((value) => value.replace(/\D/g, ""))
    .filter(Boolean);

  for (const candidate of candidates) {
    if (candidate.length === 10 && candidate.startsWith("0")) return candidate;
    if (candidate.length === 9 && candidate.startsWith("7")) return `0${candidate}`;
    if (candidate.length === 12 && candidate.startsWith("256")) {
      const local = `0${candidate.slice(3)}`;
      if (local.length === 10) return local;
    }
  }

  const fallback = candidates[0] ?? "";
  if (fallback.length >= 10) {
    const trailing = fallback.slice(-10);
    if (trailing.startsWith("0")) return trailing;
  }
  if (fallback.length === 9 && fallback.startsWith("7")) return `0${fallback}`;
  return fallback;
}

function normalizeArea(area: string): string {
  return area.toLowerCase().includes("kashanyarazi_2") ? "Town Campus Area" : area;
}

const mappedListings: Listing[] = officialHostels.flatMap((campusEntry, campusIndex) =>
  campusEntry.areas.flatMap((areaEntry, areaIndex) =>
    areaEntry.hostels.map((hostel, hostelIndex) => {
      const id = `${campusIndex + 1}-${areaIndex + 1}-${hostelIndex + 1}`;
      const areaLabel = normalizeArea(areaEntry.area);
      const proprietor = hostel.proprietor.trim() || "Proprietor not listed";

      return {
        id,
        title: hostel.name,
        priceOnRequest: true,
        location: `${areaLabel}, ${campusEntry.campus}`,
        type: "OFF_CAMPUS",
        verified: true,
        genderPolicy: hostel.gender,
        description: `DOS-approved student hostel near ${campusEntry.campus}. Area: ${areaLabel}. Gender policy: ${hostel.gender}.`,
        contact: {
          name: proprietor,
          phone: normalizePhone(hostel.contact),
        },
      } satisfies Listing;
    })
  )
);

export const mockListings: Listing[] = mappedListings;

// Alias kept for backward compat with existing pages
export const listings = mockListings;
