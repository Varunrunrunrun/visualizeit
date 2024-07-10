import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Search, Send } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export interface HeaderType {
  searchFn: (value: string) => void; // Updated type definition
}

const Header = ({ searchFn }: HeaderType) => {
  const { user }: any = useKindeBrowserClient();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    searchFn(event.target.value); // Pass input value to parent function
  };

  return (
    <div className='flex flex-col sm:flex-row justify-end w-full gap-2 items-center'>
      <div className='flex gap-2 items-center border rounded-md p-1 w-full sm:w-auto'>
        <Search className='h-4 w-4' />
        <input type='text' placeholder='Search' onChange={handleChange} className='border-none outline-none' />
      </div>
      <div className='flex gap-2 items-center w-full sm:w-auto justify-end'>
        <div>
          {user && user.picture && 
          <Image
          src={user?.picture}
          alt='user'
          width={30}
          height={30}
          className='rounded-full'
        />}
        </div>
        <Button className='gap-2 flex text-sm h-8 hover:bg-blue-700 bg-blue-400'>
          <Send className='h-4 w-4' /> Invite
        </Button>
      </div>
    </div>
  );
};

export default Header;
