export function govukClasses(base: string, classes?: string) {
  return classes ? `${base} ${classes}` : base;
}