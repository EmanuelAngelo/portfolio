const STORAGE_KEY = 'ea-passport';
export function readPassport(storage, validIds) {
  try {
    const value = JSON.parse(storage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? [...new Set(value.filter((id) => validIds.includes(id)))] : [];
  } catch {
    return [];
  }
}
export function writePassport(storage, ids) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(ids));
    return true;
  } catch {
    return false;
  }
}
