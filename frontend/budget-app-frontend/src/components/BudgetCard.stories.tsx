import type { Meta, StoryObj } from '@storybook/react';
import BudgetCard from './BudgetCard';
// Musimy zaimportować Router, bo Twój komponent używa <Link>
import { BrowserRouter } from 'react-router-dom';

// --- KONFIGURACJA ---
const meta: Meta<typeof BudgetCard> = {
  title: 'Components/BudgetCard', // Gdzie to się pojawi w menu Storybooka
  component: BudgetCard,
  tags: ['autodocs'], // Automatyczna dokumentacja

  // DEKORATORY: To są "wrappery" dla Twojego komponentu
  decorators: [
    (Story) => (
      <BrowserRouter>
        {/* Dodajemy szare tło i ograniczamy szerokość, żeby symulować wygląd na stronie */}
        <div className='p-8 bg-gray-50 flex justify-center'>
          <div className='w-full max-w-sm'>
            <Story />
          </div>
        </div>
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BudgetCard>;

// --- STORY 1: Standardowy Budżet ---
export const Default: Story = {
  args: {
    data: {
      id: 1,
      title: 'Zakupy spożywcze',
      // Te pola są wymagane przez Twój typ Budget,
      // nawet jeśli komponent ich (jeszcze) nie wyświetla:
      amount: 2000,
      date: '2023-10-28',
    },
  },
};

// --- STORY 2: Długi Tytuł (Test RWD) ---
// Sprawdzamy, czy karta się nie rozjedzie przy długim tekście
export const LongTitle: Story = {
  args: {
    data: {
      id: 2,
      title: 'Budżet na remont łazienki i kuchni w 2024 roku',
      amount: 15000,
      date: '2023-11-01',
    },
  },
};

// --- STORY 3: Inne Dane ---
export const Vacation: Story = {
  args: {
    data: {
      id: 3,
      title: 'Wakacje w Chorwacji',
      amount: 5000,
      date: '2024-07-15',
    },
  },
};

export const ShortData: Story = {
  args: {
    data: {
      id: 4,
      title: 'A',
      amount: 1,
      date: '2',
    },
  },
};
