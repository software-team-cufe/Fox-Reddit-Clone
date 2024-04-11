/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
/**
 * Retrieves the value of the specified environment variable.
 *
 * @param key - The name of the environment variable.
 * @returns The value of the environment variable.
 * @throws Error if the environment variable is not set or has an empty value.
 */
export function getEnvVariable(key: string): string {
  const value = process.env[key];

  if (!value || value.length === 0) {
    console.error(`The environment variable ${key} is not set.`);
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
}
