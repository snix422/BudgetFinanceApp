import type { Meta, StoryObj } from '@storybook/react';

// Musimy zaimportować Router, bo Twój komponent używa <Link>
import { BrowserRouter } from 'react-router-dom';
import BudgetCard from './BudgetCard';

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
      // awet jeśli komponent ich (jeszcze) nie wyświetla:

      startDate: '2023-10-01',
      endDate: '2023-10-31',
      totalEarned: 0,
      totalSpent: 0,
      remainingAmount: 0,
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
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      totalEarned: 10320230,
      totalSpent: 5020230,
      remainingAmount: 5300000,
    },
  },
};

// --- STORY 3: Inne Dane ---
export const Vacation: Story = {
  args: {
    data: {
      id: 3,
      title: 'Wakacje w Chorwacji',
      startDate: '2023-06-15',
      endDate: '2023-06-30',
      totalEarned: 40000,
      totalSpent: 17320,
      remainingAmount: 22680,
    },
  },
};

export const ShortData: Story = {
  args: {
    data: {
      id: 4,
      title: 'A',
      startDate: '2023-01-01',
      endDate: '2023-01-02',
      totalEarned: 2,
      totalSpent: 5,
      remainingAmount: 10,
    },
  },
};
