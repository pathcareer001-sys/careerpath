import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firestore";

const companies = [
  {
    name: "Google Indonesia",
    logo: "",
    description: "Perusahaan teknologi global",
    location: "Jakarta",
    verified: true,
    avgRating: 4.8,
    reviewCount: 120,
  },
  {
    name: "Tokopedia",
    logo: "",
    description: "Perusahaan e-commerce",
    location: "Jakarta",
    verified: true,
    avgRating: 4.6,
    reviewCount: 89,
  },
  {
    name: "Telkom Indonesia",
    logo: "",
    description: "Perusahaan telekomunikasi",
    location: "Bandung",
    verified: true,
    avgRating: 4.4,
    reviewCount: 65,
  },
];

export async function seedCompanies() {
  for (const company of companies) {
    await addDoc(
      collection(db, "companies"),
      company
    );
  }

  console.log("Seeder selesai");
}