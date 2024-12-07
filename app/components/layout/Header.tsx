'use client';

import Image from 'next/image';
import Link from 'next/link';

// 헤더에 들어갈 로고 이미지를 처리하는 컴포넌트
// 화면 크기에 따라 다른 로고가 보이도록 했음
// sm(768px) 기준으로 작은 화면/큰 화면 구분함
export default function Header() {
  return (
    <header className="w-full border-b border-slate-200">
      <div className="h-[60px] flex items-center">
        <Link 
          href="/" 
          className="pl-4 sm:pl-6 lg:pl-[10%] xl:pl-[15%] transition-all duration-300"
        >
          {/* 큰 화면용 로고 */}
          <Image
            src="/images/logo.svg"
            alt="Do it Logo"
            width={100}
            height={40}
            className="hidden sm:block"  // 768px 이상에서만 보임
            priority
          />
          {/* 모바일용 작은 로고 */}
          <Image
            src="../images/logo-small.svg"
            alt="Do it Logo"
            width={40}
            height={40}
            className="block sm:hidden"  // 768px 미만에서만 보임
            priority
          />
        </Link>
      </div>
    </header>
  );
} 