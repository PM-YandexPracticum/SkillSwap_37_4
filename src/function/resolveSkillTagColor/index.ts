/**
 * Функция для определения CSS-классов тега навыка на основе цвета и состояния
 * @param color - цвет тега (строка)
 * @param selected - выбран ли тег
 * @returns строка с CSS-классами
 */
export function resolveSkillTagColor(color: string, selected: boolean): string {
  const base = selected ? 'text-white shadow-sm' : 'text-slate-700';

  // Определяем цвет по содержимому строки
  if (color.toLowerCase().includes('teach') || color.toLowerCase().includes('учить')) {
    return `${base} ${selected ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'}`;
  }

  if (color.toLowerCase().includes('learn') || color.toLowerCase().includes('изучать')) {
    return `${base} ${selected ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-50 hover:bg-indigo-100 border border-indigo-200'}`;
  }

  // По умолчанию используем серый цвет
  return `${base} ${selected ? 'bg-slate-800 hover:bg-slate-900' : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'}`;
}
