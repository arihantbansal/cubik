import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <div className="flex items-center justify-between">
      <Link className="flex items-center justify-center gap-1" href={'/'}>
        <Image src={'/logo.svg'} alt="alt-logo" width={30} height={30} />
        <span className="text-[16px] font-bold uppercase leading-[22px] text-[var(--white)]">
          cubik
        </span>
      </Link>
    </div>
  );
};

export default Logo;
