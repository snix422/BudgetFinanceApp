// src/components/admin/users/UserDetailsHeader.tsx

type Props = {
  userId: string | undefined;
  navigate: any;
};

export const UserDetailsHeader = ({ userId, navigate }: Props) => {
  return (
    <div className='flex items-center gap-4 mb-8'>
      <button
        onClick={() => navigate(-1)}
        className='p-2 hover:bg-gray-100 rounded-full transition-colors'
        title='Wróć'
      >
        ⬅️
      </button>
      <div>
        <h1 className='text-2xl font-bold text-gray-800'>Szczegóły użytkownika</h1>
        <p className='text-gray-500 text-sm'>ID: {userId}</p>
      </div>
    </div>
  );
};
