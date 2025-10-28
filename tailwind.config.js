/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: 'var(--color-brand)',
        bg: 'var(--color-bg)',
        fg: 'var(--color-fg)',
        card: 'var(--color-card)',
        border: 'var(--color-border)',
        'priority-urgent': 'var(--color-priority-urgent)',
        'priority-urgent-text': 'var(--color-priority-urgent-text)',
        'priority-high': 'var(--color-priority-high)',
        'priority-high-text': 'var(--color-priority-high-text)',
        'priority-med': 'var(--color-priority-med)',
        'priority-med-text': 'var(--color-priority-med-text)',
        'priority-low': 'var(--color-priority-low)',
        'priority-low-text': 'var(--color-priority-low-text)',
        'state-todo': 'var(--color-state-todo)',
        'state-progress': 'var(--color-state-progress)',
        'state-blocked': 'var(--color-state-blocked)',
        'state-completed': 'var(--color-state-completed)',
        'state-overdue': 'var(--color-state-overdue)',
        'state-duesoon': 'var(--color-state-duesoon)',
        'fill-muted': 'var(--color-fill-muted)',
      },
    },
  },
  plugins: [],
};
