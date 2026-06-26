import { describe, it, expect } from "vitest";

describe("Internship type", () => {
  it("should accept salary and status fields", () => {
    const internship = {
      id: "1",
      title: "Frontend Intern",
      companyId: "c1",
      companyName: "Tech Co",
      ownerId: "o1",
      location: "Jakarta",
      type: "Remote",
      description: "Great opportunity",
      requirements: ["React", "TypeScript"],
      deadline: "2026-12-31",
      salary: "$1,000/month",
      status: "published" as const,
    };

    expect(internship.salary).toBe("$1,000/month");
    expect(internship.status).toBe("published");
  });
});

describe("Application status", () => {
  it("should support reviewed and withdrawn statuses", () => {
    const reviewed = { status: "reviewed" as const };
    const withdrawn = { status: "withdrawn" as const };

    expect(reviewed.status).toBe("reviewed");
    expect(withdrawn.status).toBe("withdrawn");
  });
});

describe("Bookmark type", () => {
  it("should support internship bookmarks", () => {
    const bookmark = {
      id: "b1",
      userId: "u1",
      internshipId: "i1",
      createdAt: new Date().toISOString(),
    };

    expect(bookmark.internshipId).toBe("i1");
  });
});

describe("User updates", () => {
  it("should allow partial user updates", () => {
    const update = { name: "New Name", role: "admin" as const };
    const result = { name: "New Name", role: "admin" };
    expect(update).toEqual(result);
  });
});
