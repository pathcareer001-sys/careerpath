import { addDoc, collection } from "firebase/firestore";

import { db } from "@/firebase/firestore";

import { COLLECTIONS } from "@/constants/collections";

export async function seedInternships() {
  const internships = [
    {
      title: "Frontend Developer Intern",
      companyId: "4TLZDZPmntN50CXRmZm6",
      companyName: "Google Indonesia",
      location: "Jakarta",
      type: "Remote",
      description: "Frontend internship opportunity",

      requirements: ["React", "TypeScript", "TailwindCSS"],

      deadline: "2026-12-31",
    },

    {
      title: "Backend Developer Intern",
      companyId: "4TLZDZPmntN50CXRmZm6",
      companyName: "Google Indonesia",
      location: "Bandung",
      type: "Hybrid",
      description: "Backend internship opportunity",

      requirements: ["NodeJS", "Express", "Firebase"],

      deadline: "2026-12-31",
    },

    {
      title: "UI UX Designer Intern",
      companyId: "4TLZDZPmntN50CXRmZm6",
      companyName: "Google Indonesia",
      location: "Remote",
      type: "Remote",
      description: "Design internship opportunity",

      requirements: ["Figma", "Wireframing"],

      deadline: "2026-12-31",
    },
  ];

  for (const internship of internships) {
    await addDoc(collection(db, COLLECTIONS.INTERNSHIPS), internship);
  }

  alert("Seeder selesai");
}
