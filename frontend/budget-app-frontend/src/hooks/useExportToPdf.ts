import { exportBudgetToPdf } from '@/api/budgets/budgets';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const useExportToPdf = () => {
  const { mutate: exportToPdf, isPending } = useMutation({
    // Używamy mutationFn zamiast queryFn!
    mutationFn: (budgetId: number) => exportBudgetToPdf(budgetId),
    onSuccess: (data) => {
      // Magia przeglądarki, żeby wymusić pobranie pliku z Bloba
      const url = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Budzet_Raport.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Budżet został wyeksportowany do PDF pomyślnie!');
    },
    onError: (error) => {
      console.error('Błąd eksportu PDF:', error);
      toast.error('Wystąpił błąd podczas eksportowania budżetu do PDF!');
    },
  });

  return {
    exportToPdf,
    isPending, // Przyda nam się do zablokowania przycisku podczas ładowania!
  };
};

export default useExportToPdf;
