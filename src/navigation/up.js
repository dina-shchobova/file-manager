import path from 'path';

export const up = (currentPath) => {
  return path.join(currentPath, '..');
}
