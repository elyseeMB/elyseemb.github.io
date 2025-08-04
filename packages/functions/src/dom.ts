/**
 * Génère une class à partir sous conditions et par variables
 * @returns {string}
 */
export function classNames(...classnames: (string | boolean)[]): string {
  return classnames
    .filter((classname) => classname !== null && classname !== false)
    .join(" ");
}
