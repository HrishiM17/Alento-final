// src/services/userService.ts (or wherever you call publish)

export async function publishWithImages(personName: string, text: string, files: File[]) {
  const fd = new FormData();
  fd.append("person_name", personName);
  fd.append("text", text);
  files.forEach((f) => fd.append("files", f)); // backend expects 'files' field

  const res = await fetch("http://localhost:8000/create_linkedin_post", {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Publish failed");
  }
  return res.json();
}
