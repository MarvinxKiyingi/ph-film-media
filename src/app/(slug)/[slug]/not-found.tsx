import Link from 'next/link';

export default function Custom404() {
  return (
    <div className='flex flex-col max-lg:h-svh justify-center items-center lg:flex-1'>
      <div className='flex flex-col items-center justify-center gap-12 lg:gap-16'>
        <h2 className='text-[213px] lg:text-[378px] leading-[1]'>404</h2>

        <Link
          href='/'
          className='text-b-16e font-bold px-8 py-4 rounded-[8px] text-black bg-white '
        >
          Gå till hem
        </Link>
      </div>
    </div>
  );
}
