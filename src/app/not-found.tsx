import Header from '@/components/Header/Header';
import Link from 'next/link';

export default function Custom404() {
  return (
    <section className='flex flex-col'>
      <Header />

      <div className='flex flex-col max-lg:h-svh justify-center items-center lg:min-h-screen'>
        <div className='flex flex-col items-center justify-center gap-12 lg:gap-16'>
          <h2 className='text-[213px] lg:text-[378px] leading-[1]'>404</h2>

          <Link
            href='/'
            className='text-b-16 font-bold px-8 py-4 rounded-[8px] text-black bg-white '
          >
            Navigera Hem
          </Link>
        </div>
      </div>
    </section>
  );
}
