import { create } from 'zustand';
import NetflixLogo from '../assets/icons/netflix-logo.svg';
import SpotifyLogo from '../assets/icons/spotify-logo.svg';
import SalaryLogo from '../assets/icons/salary-logo.svg';

export interface Transaction {
    id: string;
    title: string;
    value: string;
    type: string;
    date: string;
    icon: string;
}

interface TransactionStore {
    transactions: Transaction[];
}

export const useTransactionsStore = create<TransactionStore>(() => ({
    transactions: [
        {
            id: '1',
            title: 'Netflix',
            value: '12.99',
            type: 'expense',
            date: 'Jan 30, 2025',
            icon: NetflixLogo,
        },
        {
            id: '2',
            title: 'Spotify',
            value: '4.00',
            type: 'expense',
            date: 'Jan 30, 2025',
            icon: SpotifyLogo,
        },
        {
            id: '3',
            title: 'Salary',
            value: '2149.43',
            type: 'income',
            date: 'March 28, 2025',
            icon: SalaryLogo,
        },
    ]
}));