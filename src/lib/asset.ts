/**
 * Prefixes a /public path with the deployment base path (for example
 * "/acousticbakery" on GitHub Pages). next/image does not add it for string sources.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE_PATH}${path}`;
