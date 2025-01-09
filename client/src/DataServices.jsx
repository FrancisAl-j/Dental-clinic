export const data_set = [
  {
    name: "Dental Consultation", // pasta
  },
  {
    name: "Dental Crowns", // sinasalpakan  ng false teeth para mas maging straight and white tignan ang teeth//
  },
  {
    name: "Bridgework", //nilalayan ng false teeth  yung missing teeth pero dapat may kakapitan pang original teeth (permanent)
  },
  {
    name: "Cosmetic Fillings",
  },
  {
    name: "Diastema Closure", //clear alighners//
  },
  {
    name: "Dental Veneers", //tinatapalan yung harapan ng ngpin//
  },
  {
    name: "Teeth Cleanings",
  },
  {
    name: "Dentures", //pustiso// removable
  },
  {
    name: "Root Canal Therapy", //papatayin yung ugat  para mastop ang pag kasira//
  },
  {
    name: "Dental Implant",
  },
  {
    name: "Teeth Whitening",
  },
  {
    name: "Tooth Extractions", //bunot//
  },
  {
    name: "Tooth Pasta", // pag gamit ng dental imaging para mas makita yung condition sa loob ng ngipin//
  },
  {
    name: "x ray", // pag gamit ng dental imaging para mas makita yung condition sa loob ng ngipin//
  },
  {
    name: "Clear Aligners", // pag gamit ng dental imaging para mas makita yung condition sa loob ng ngipin//
  },
  {
    name: "Metallic Braces", // pag gamit ng dental imaging para mas makita yung condition sa loob ng ngipin//
  },
  {
    name: "Self-Ligating Braces", // pag gamit ng dental imaging para mas makita yung condition sa loob ng ngipin//
  },
  {
    name: "Dental Retainers", // pag gamit ng dental imaging para mas makita yung condition sa loob ng ngipin//
  },
];

export const specialized_set = {
  Prosthodontics: ["Dental Crowns", "Bridgework", "Dental Implant", "Dentures"],
  Orthodontics: [
    "Clear Aligners",
    "Metallic Braces",
    "Self-Ligating Braces",
    "Dental Retainers",
  ],
  "General Dentistry": [
    "Dental Consultation",
    "Tooth Pasta",
    "Teeth Cleanings",
    "Tooth Extractions",
    "Dental Fillings",
  ],

  "Dental Cosmetics": ["Dental Veneers", "Diastema Closure", "Teeth Whitening"],

  "Oral Surgery": ["Root Canal Therapy"],

  Periodontics: [
    "Scaling and Root Planing",
    "Gum Grafting",
    "Periodontal Surgery",
  ],

  Endodontics: ["Root Canal Therapy", "Apicoectomy"],

  // ? For children
  "Pediatric Dentistry": [
    "Stainless Steel Crowns",
    "Space Maintaner",
    "Habitt-breaking Appliances",
  ],
};
