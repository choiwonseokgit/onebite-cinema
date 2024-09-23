import Link from "next/link";
import S from "./global-layout.module.css";

interface GloabalLayoutProps extends React.PropsWithChildren {}

export default function GloabalLayout({ children }: GloabalLayoutProps) {
  return (
    <div className={S.container}>
      <header className={S.header}>
        <Link href={"/"}>ONEBITE CINEMA</Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
