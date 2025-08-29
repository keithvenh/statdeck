"use client";

import Link from 'next/link';
import { usePathname } from "next/navigation"
import styles from "./navbar.module.css"
import {House, Grid3x2, Flag, ListOrdered, Shapes} from 'lucide-react'

const stroke: number = 1;
const iconSize: number = 24;
const tabs = [
  {href: "/", label: "Home", icon: <House strokeWidth={stroke} size={iconSize} />},
  {href: "/scores", label: "Scores", icon: <Grid3x2 strokeWidth={stroke} size={iconSize} />},
  {href: "/standings", label: "Standings", icon: <Flag strokeWidth={stroke} size={iconSize} />},
  {href: "/leaders", label: "Leaders", icon: <ListOrdered strokeWidth={stroke} size={iconSize} />},
  {href: "/utilities", label: "Utils", icon: <Shapes strokeWidth={stroke} size={iconSize} />}
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className={styles.nav}>
      {tabs.map(t => {
        const active = pathname === t.href || pathname.startsWith(t.href + "/")
        return (
          <Link key={t.href} href={t.href} className={styles.tab}>
            <div className={styles.iconContainer}>
              {t.icon}
            </div>
            <p className={styles.label}>{t.label}</p>
          </Link>
        );
      })}
    </nav>
  )
}