const BASE_URL = "http://localhost:8000";

export async function getDrafts() {
  const res = await fetch(`${BASE_URL}/drafts`);
  return res.json();
}

export async function getDraft(id: number) {
  const res = await fetch(`${BASE_URL}/drafts/${id}`);
  return res.json();
}

export async function createDraft(title: string, content: string, files: File[]) {
  const fd = new FormData();
  fd.append("title", title);
  fd.append("content", content);
  files.forEach(f => fd.append("files", f));

  const res = await fetch(`${BASE_URL}/drafts`, {
    method: "POST",
    body: fd,
  });
  return res.json();
}

export async function updateDraft(id: number, title: string, content: string, files: File[]) {
  const fd = new FormData();
  fd.append("title", title);
  fd.append("content", content);
  files.forEach(f => fd.append("files", f));

  const res = await fetch(`${BASE_URL}/drafts/${id}`, {
    method: "PUT",
    body: fd,
  });
  return res.json();
}

export async function deleteDraft(id: number) {
  const res = await fetch(`${BASE_URL}/drafts/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
