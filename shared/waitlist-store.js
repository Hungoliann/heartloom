import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(rootDir, ".data");
const waitlistFile = path.join(dataDir, "waitlist.json");

function normalizeEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

function normalizeName(name) {
  const trimmed = String(name ?? "").trim();
  return trimmed === "" ? null : trimmed.replace(/\s+/g, " ");
}

function normalizeSource(source) {
  const trimmed = String(source ?? "website").trim();
  return trimmed === "" ? "website" : trimmed;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function readEntries() {
  try {
    const raw = await fs.readFile(waitlistFile, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error?.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeEntries(entries) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(waitlistFile, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
}

export async function addWaitlistEntry(input) {
  const email = normalizeEmail(input?.email);

  if (!isValidEmail(email)) {
    const error = new Error("A valid email address is required.");
    error.statusCode = 400;
    error.code = "INVALID_EMAIL";
    throw error;
  }

  const name = normalizeName(input?.name);
  const source = normalizeSource(input?.source);
  const entries = await readEntries();
  const existingEntry = entries.find((entry) => entry.email === email);

  if (existingEntry) {
    return {
      created: false,
      entry: existingEntry,
      total: entries.length,
    };
  }

  const entry = {
    id: `wl_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`,
    email,
    name,
    source,
    createdAt: new Date().toISOString(),
  };

  entries.unshift(entry);
  await writeEntries(entries);

  return {
    created: true,
    entry,
    total: entries.length,
  };
}
