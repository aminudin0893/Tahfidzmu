import React, { useState, useCallback } from 'react';
import { BookOpen, Search, CheckCircle, Book, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BATAS_SURAT_JUZ } from './quranData';

export default function App() {
  const [kategori, setKategori] = useState('1 Juz');
  const [juzList, setJuzList] = useState(['30']);
  const [halaman, setHalaman] = useState(1);
  const [baris, setBaris] = useState(2);
  const [result, setResult] = useState<any>(null);

  const kategoriOptions = Array.from({ length: 30 }, (_, i) => `${i + 1} Juz`);
  const juzOptions = Array.from({ length: 30 }, (_, i) => `${i + 1}`);

  // 1. DATABASE SPESIFIK POSISI AYAT (Baris ke Ayat)
  // Data ini bisa dikembangkan lebih lanjut untuk mapping ayat yang sangat presisi
  const posisiAyatData: Record<string, Record<number, { surah: string; ayat: string }>> = {
    "1": {
      1: { surah: "Al-Fatihah", ayat: "Basmalah" }, 2: { surah: "Al-Fatihah", ayat: "1-2" }, 3: { surah: "Al-Fatihah", ayat: "3-4" },
      4: { surah: "Al-Fatihah", ayat: "5" }, 5: { surah: "Al-Fatihah", ayat: "6" }, 6: { surah: "Al-Fatihah", ayat: "7" },
      7: { surah: "Al-Baqarah", ayat: "Basmalah" }, 8: { surah: "Al-Baqarah", ayat: "1-2" }, 9: { surah: "Al-Baqarah", ayat: "3" },
      10: { surah: "Al-Baqarah", ayat: "4" }, 11: { surah: "Al-Baqarah", ayat: "5" }, 16: { surah: "Al-Baqarah", ayat: "6" },
      31: { surah: "Al-Baqarah", ayat: "17" }, 46: { surah: "Al-Baqarah", ayat: "25" }, 61: { surah: "Al-Baqarah", ayat: "30" },
      76: { surah: "Al-Baqarah", ayat: "38" }, 91: { surah: "Al-Baqarah", ayat: "49" }, 106: { surah: "Al-Baqarah", ayat: "58" },
      121: { surah: "Al-Baqarah", ayat: "70" }, 136: { surah: "Al-Baqarah", ayat: "77" }, 151: { surah: "Al-Baqarah", ayat: "84" },
      166: { surah: "Al-Baqarah", ayat: "89" }, 181: { surah: "Al-Baqarah", ayat: "94" }, 196: { surah: "Al-Baqarah", ayat: "102" },
      211: { surah: "Al-Baqarah", ayat: "106" }, 226: { surah: "Al-Baqarah", ayat: "113" }, 241: { surah: "Al-Baqarah", ayat: "120" },
      256: { surah: "Al-Baqarah", ayat: "127" }, 271: { surah: "Al-Baqarah", ayat: "135" }, 286: { surah: "Al-Baqarah", ayat: "141" },
    },
    "2": {
      1: { surah: "Al-Baqarah", ayat: "142" }, 16: { surah: "Al-Baqarah", ayat: "146" }, 31: { surah: "Al-Baqarah", ayat: "154" },
      46: { surah: "Al-Baqarah", ayat: "164" }, 61: { surah: "Al-Baqarah", ayat: "170" }, 76: { surah: "Al-Baqarah", ayat: "177" },
      91: { surah: "Al-Baqarah", ayat: "182" }, 106: { surah: "Al-Baqarah", ayat: "187" }, 121: { surah: "Al-Baqarah", ayat: "191" },
      136: { surah: "Al-Baqarah", ayat: "197" }, 151: { surah: "Al-Baqarah", ayat: "203" }, 166: { surah: "Al-Baqarah", ayat: "211" },
      181: { surah: "Al-Baqarah", ayat: "216" }, 196: { surah: "Al-Baqarah", ayat: "220" }, 211: { surah: "Al-Baqarah", ayat: "225" },
      226: { surah: "Al-Baqarah", ayat: "231" }, 241: { surah: "Al-Baqarah", ayat: "234" }, 256: { surah: "Al-Baqarah", ayat: "238" },
      271: { surah: "Al-Baqarah", ayat: "246" }, 286: { surah: "Al-Baqarah", ayat: "249" },
    },
    "3": {
      1: { surah: "Al-Baqarah", ayat: "253" }, 16: { surah: "Al-Baqarah", ayat: "257" }, 31: { surah: "Al-Baqarah", ayat: "260" },
      46: { surah: "Al-Baqarah", ayat: "265" }, 61: { surah: "Al-Baqarah", ayat: "270" }, 76: { surah: "Al-Baqarah", ayat: "275" },
      91: { surah: "Al-Baqarah", ayat: "282" }, 106: { surah: "Al-Baqarah", ayat: "283" }, 121: { surah: "Al-Baqarah", ayat: "286" },
      136: { surah: "Ali 'Imran", ayat: "Basmalah" }, 151: { surah: "Ali 'Imran", ayat: "10" }, 166: { surah: "Ali 'Imran", ayat: "16" },
      181: { surah: "Ali 'Imran", ayat: "23" }, 196: { surah: "Ali 'Imran", ayat: "30" }, 211: { surah: "Ali 'Imran", ayat: "38" },
      226: { surah: "Ali 'Imran", ayat: "46" }, 241: { surah: "Ali 'Imran", ayat: "53" }, 256: { surah: "Ali 'Imran", ayat: "62" },
      271: { surah: "Ali 'Imran", ayat: "71" }, 286: { surah: "Ali 'Imran", ayat: "84" },
    },
    "4": {
      1: { surah: "Ali 'Imran", ayat: "92" }, 16: { surah: "Ali 'Imran", ayat: "101" }, 31: { surah: "Ali 'Imran", ayat: "116" },
      46: { surah: "Ali 'Imran", ayat: "122" }, 61: { surah: "Ali 'Imran", ayat: "133" }, 76: { surah: "Ali 'Imran", ayat: "149" },
      91: { surah: "Ali 'Imran", ayat: "158" }, 106: { surah: "Ali 'Imran", ayat: "166" }, 121: { surah: "Ali 'Imran", ayat: "174" },
      136: { surah: "Ali 'Imran", ayat: "187" }, 151: { surah: "Ali 'Imran", ayat: "195" }, 166: { surah: "Ali 'Imran", ayat: "200" },
      181: { surah: "An-Nisa'", ayat: "Basmalah" }, 196: { surah: "An-Nisa'", ayat: "7" }, 211: { surah: "An-Nisa'", ayat: "12" },
      226: { surah: "An-Nisa'", ayat: "15" }, 241: { surah: "An-Nisa'", ayat: "23" },
    },
    "5": {
      1: { surah: "An-Nisa'", ayat: "24" }, 16: { surah: "An-Nisa'", ayat: "34" }, 31: { surah: "An-Nisa'", ayat: "45" },
      46: { surah: "An-Nisa'", ayat: "52" }, 61: { surah: "An-Nisa'", ayat: "66" }, 76: { surah: "An-Nisa'", ayat: "75" },
      91: { surah: "An-Nisa'", ayat: "87" }, 106: { surah: "An-Nisa'", ayat: "95" }, 121: { surah: "An-Nisa'", ayat: "106" },
      136: { surah: "An-Nisa'", ayat: "114" }, 151: { surah: "An-Nisa'", ayat: "128" }, 166: { surah: "An-Nisa'", ayat: "141" },
      181: { surah: "An-Nisa'", ayat: "147" }, 196: { surah: "An-Nisa'", ayat: "155" }, 211: { surah: "An-Nisa'", ayat: "163" },
      226: { surah: "An-Nisa'", ayat: "171" }, 241: { surah: "An-Nisa'", ayat: "176" },
    },
    "6": {
      1: { surah: "An-Nisa'", ayat: "148" }, 16: { surah: "An-Nisa'", ayat: "155" }, 31: { surah: "An-Nisa'", ayat: "163" },
      46: { surah: "An-Nisa'", ayat: "171" }, 61: { surah: "An-Nisa'", ayat: "176" }, 76: { surah: "Al-Ma'idah", ayat: "Basmalah" },
      91: { surah: "Al-Ma'idah", ayat: "3" }, 106: { surah: "Al-Ma'idah", ayat: "6" }, 121: { surah: "Al-Ma'idah", ayat: "14" },
      136: { surah: "Al-Ma'idah", ayat: "24" }, 151: { surah: "Al-Ma'idah", ayat: "32" }, 166: { surah: "Al-Ma'idah", ayat: "42" },
      181: { surah: "Al-Ma'idah", ayat: "51" }, 196: { surah: "Al-Ma'idah", ayat: "60" }, 211: { surah: "Al-Ma'idah", ayat: "71" },
      226: { surah: "Al-Ma'idah", ayat: "82" },
    },
    "7": {
      1: { surah: "Al-Ma'idah", ayat: "82" }, 16: { surah: "Al-Ma'idah", ayat: "90" }, 31: { surah: "Al-Ma'idah", ayat: "101" },
      46: { surah: "Al-Ma'idah", ayat: "109" }, 61: { surah: "Al-Ma'idah", ayat: "114" }, 76: { surah: "Al-Ma'idah", ayat: "120" },
      91: { surah: "Al-An'am", ayat: "Basmalah" }, 106: { surah: "Al-An'am", ayat: "9" }, 121: { surah: "Al-An'am", ayat: "19" },
      136: { surah: "Al-An'am", ayat: "28" }, 151: { surah: "Al-An'am", ayat: "36" },
      166: { surah: "Al-An'am", ayat: "45" }, 181: { surah: "Al-An'am", ayat: "53" }, 196: { surah: "Al-An'am", ayat: "60" },
      211: { surah: "Al-An'am", ayat: "74" }, 226: { surah: "Al-An'am", ayat: "82" }, 241: { surah: "Al-An'am", ayat: "95" },
      256: { surah: "Al-An'am", ayat: "102" }, 271: { surah: "Al-An'am", ayat: "111" },
    },
    "8": {
      1: { surah: "Al-An'am", ayat: "111" }, 16: { surah: "Al-An'am", ayat: "119" }, 31: { surah: "Al-An'am", ayat: "125" },
      46: { surah: "Al-An'am", ayat: "132" }, 61: { surah: "Al-An'am", ayat: "143" }, 76: { surah: "Al-An'am", ayat: "152" },
      91: { surah: "Al-An'am", ayat: "158" }, 106: { surah: "Al-An'am", ayat: "165" }, 121: { surah: "Al-A'raf", ayat: "Basmalah" },
      136: { surah: "Al-A'raf", ayat: "12" }, 151: { surah: "Al-A'raf", ayat: "23" }, 166: { surah: "Al-A'raf", ayat: "31" },
      181: { surah: "Al-A'raf", ayat: "38" }, 196: { surah: "Al-A'raf", ayat: "44" }, 211: { surah: "Al-A'raf", ayat: "52" },
      226: { surah: "Al-A'raf", ayat: "60" }, 241: { surah: "Al-A'raf", ayat: "68" }, 256: { surah: "Al-A'raf", ayat: "74" },
      271: { surah: "Al-A'raf", ayat: "82" }, 286: { surah: "Al-A'raf", ayat: "88" },
    },
    "9": {
      1: { surah: "Al-A'raf", ayat: "88" }, 16: { surah: "Al-A'raf", ayat: "96" }, 31: { surah: "Al-A'raf", ayat: "105" },
      46: { surah: "Al-A'raf", ayat: "121" }, 61: { surah: "Al-A'raf", ayat: "138" }, 76: { surah: "Al-A'raf", ayat: "144" },
      91: { surah: "Al-A'raf", ayat: "156" }, 106: { surah: "Al-A'raf", ayat: "164" }, 121: { surah: "Al-A'raf", ayat: "171" },
      136: { surah: "Al-A'raf", ayat: "188" }, 151: { surah: "Al-A'raf", ayat: "196" }, 166: { surah: "Al-A'raf", ayat: "206" },
      181: { surah: "Al-Anfal", ayat: "Basmalah" }, 196: { surah: "Al-Anfal", ayat: "9" }, 211: { surah: "Al-Anfal", ayat: "17" },
      226: { surah: "Al-Anfal", ayat: "26" }, 241: { surah: "Al-Anfal", ayat: "34" }, 256: { surah: "Al-Anfal", ayat: "41" },
    },
    "10": {
      1: { surah: "Al-Anfal", ayat: "1" }, 16: { surah: "Al-Anfal", ayat: "9" }, 31: { surah: "Al-Anfal", ayat: "17" },
      46: { surah: "Al-Anfal", ayat: "26" }, 61: { surah: "Al-Anfal", ayat: "34" }, 76: { surah: "Al-Anfal", ayat: "41" },
      91: { surah: "Al-Anfal", ayat: "53" }, 106: { surah: "Al-Anfal", ayat: "62" }, 121: { surah: "Al-Anfal", ayat: "70" },
      136: { surah: "Al-Anfal", ayat: "75" }, 151: { surah: "At-Taubah", ayat: "Basmalah" },
      166: { surah: "At-Taubah", ayat: "6" }, 181: { surah: "At-Taubah", ayat: "14" }, 196: { surah: "At-Taubah", ayat: "21" },
      211: { surah: "At-Taubah", ayat: "27" }, 226: { surah: "At-Taubah", ayat: "32" }, 241: { surah: "At-Taubah", ayat: "37" },
      256: { surah: "At-Taubah", ayat: "41" }, 271: { surah: "At-Taubah", ayat: "48" }, 286: { surah: "At-Taubah", ayat: "55" },
    },
    "11": {
      1: { surah: "At-Taubah", ayat: "93" }, 16: { surah: "At-Taubah", ayat: "100" }, 31: { surah: "At-Taubah", ayat: "107" },
      46: { surah: "At-Taubah", ayat: "112" }, 61: { surah: "At-Taubah", ayat: "118" }, 76: { surah: "At-Taubah", ayat: "123" },
      91: { surah: "At-Taubah", ayat: "128" }, 106: { surah: "Yunus", ayat: "Basmalah" }, 121: { surah: "Yunus", ayat: "7" },
      136: { surah: "Yunus", ayat: "15" }, 151: { surah: "Yunus", ayat: "21" }, 166: { surah: "Yunus", ayat: "26" },
      181: { surah: "Yunus", ayat: "34" }, 196: { surah: "Yunus", ayat: "43" }, 211: { surah: "Yunus", ayat: "54" },
      226: { surah: "Yunus", ayat: "62" },
    },
    "12": {
      1: { surah: "Yunus", ayat: "71" }, 16: { surah: "Yunus", ayat: "79" }, 31: { surah: "Yunus", ayat: "89" },
      46: { surah: "Yunus", ayat: "98" }, 61: { surah: "Yunus", ayat: "107" }, 76: { surah: "Hud", ayat: "Basmalah" },
      91: { surah: "Hud", ayat: "6" }, 106: { surah: "Hud", ayat: "13" }, 121: { surah: "Hud", ayat: "20" },
      136: { surah: "Hud", ayat: "29" }, 151: { surah: "Hud", ayat: "38" }, 166: { surah: "Hud", ayat: "46" },
      181: { surah: "Hud", ayat: "54" }, 196: { surah: "Hud", ayat: "63" }, 211: { surah: "Hud", ayat: "72" },
      226: { surah: "Hud", ayat: "82" }, 241: { surah: "Hud", ayat: "89" }, 256: { surah: "Hud", ayat: "98" },
      271: { surah: "Hud", ayat: "109" },
    },
    "13": {
      1: { surah: "Hud", ayat: "109" }, 16: { surah: "Hud", ayat: "118" }, 31: { surah: "Yusuf", ayat: "Basmalah" },
      46: { surah: "Yusuf", ayat: "7" }, 61: { surah: "Yusuf", ayat: "15" }, 76: { surah: "Yusuf", ayat: "23" },
      91: { surah: "Yusuf", ayat: "31" }, 106: { surah: "Yusuf", ayat: "38" }, 121: { surah: "Yusuf", ayat: "44" },
      136: { surah: "Yusuf", ayat: "53" }, 151: { surah: "Yusuf", ayat: "64" }, 166: { surah: "Yusuf", ayat: "70" },
      181: { surah: "Yusuf", ayat: "79" }, 196: { surah: "Yusuf", ayat: "87" }, 211: { surah: "Yusuf", ayat: "96" },
      226: { surah: "Yusuf", ayat: "104" }, 241: { surah: "Ar-Ra'd", ayat: "Basmalah" }, 256: { surah: "Ar-Ra'd", ayat: "6" },
      271: { surah: "Ar-Ra'd", ayat: "14" }, 286: { surah: "Ar-Ra'd", ayat: "19" },
    },
    "14": {
      1: { surah: "Ar-Ra'd", ayat: "35" }, 16: { surah: "Ibrahim", ayat: "Basmalah" }, 31: { surah: "Ibrahim", ayat: "6" },
      46: { surah: "Ibrahim", ayat: "11" }, 61: { surah: "Ibrahim", ayat: "19" }, 76: { surah: "Ibrahim", ayat: "25" },
      91: { surah: "Ibrahim", ayat: "34" }, 106: { surah: "Ibrahim", ayat: "43" }, 121: { surah: "Al-Hijr", ayat: "Basmalah" },
      136: { surah: "Al-Hijr", ayat: "16" }, 151: { surah: "Al-Hijr", ayat: "32" }, 166: { surah: "Al-Hijr", ayat: "52" },
      181: { surah: "Al-Hijr", ayat: "71" }, 196: { surah: "Al-Hijr", ayat: "91" }, 211: { surah: "An-Nahl", ayat: "Basmalah" },
      226: { surah: "An-Nahl", ayat: "7" }, 241: { surah: "An-Nahl", ayat: "15" }, 256: { surah: "An-Nahl", ayat: "27" },
      271: { surah: "An-Nahl", ayat: "35" }, 286: { surah: "An-Nahl", ayat: "43" },
    },
    "15": {
      1: { surah: "An-Nahl", ayat: "55" }, 16: { surah: "An-Nahl", ayat: "65" }, 31: { surah: "An-Nahl", ayat: "73" },
      46: { surah: "An-Nahl", ayat: "80" }, 61: { surah: "An-Nahl", ayat: "88" }, 76: { surah: "An-Nahl", ayat: "94" },
      91: { surah: "An-Nahl", ayat: "103" }, 106: { surah: "An-Nahl", ayat: "111" }, 121: { surah: "An-Nahl", ayat: "119" },
      136: { surah: "Al-Isra'", ayat: "Basmalah" }, 151: { surah: "Al-Isra'", ayat: "8" }, 166: { surah: "Al-Isra'", ayat: "18" },
      181: { surah: "Al-Isra'", ayat: "28" }, 196: { surah: "Al-Isra'", ayat: "39" }, 211: { surah: "Al-Isra'", ayat: "50" },
      226: { surah: "Al-Isra'", ayat: "59" }, 241: { surah: "Al-Isra'", ayat: "70" }, 256: { surah: "Al-Isra'", ayat: "87" },
      271: { surah: "Al-Isra'", ayat: "97" }, 286: { surah: "Al-Kahf", ayat: "Basmalah" },
    },
    "16": {
      1: { surah: "Al-Kahf", ayat: "75" }, 16: { surah: "Al-Kahf", ayat: "84" }, 31: { surah: "Al-Kahf", ayat: "98" },
      46: { surah: "Al-Kahf", ayat: "107" }, 61: { surah: "Maryam", ayat: "Basmalah" }, 76: { surah: "Maryam", ayat: "12" },
      91: { surah: "Maryam", ayat: "26" }, 106: { surah: "Maryam", ayat: "39" }, 121: { surah: "Maryam", ayat: "52" },
      136: { surah: "Maryam", ayat: "65" }, 151: { surah: "Maryam", ayat: "77" }, 166: { surah: "Maryam", ayat: "96" },
      181: { surah: "Thaha", ayat: "Basmalah" }, 196: { surah: "Thaha", ayat: "13" }, 211: { surah: "Thaha", ayat: "38" },
      226: { surah: "Thaha", ayat: "52" }, 241: { surah: "Thaha", ayat: "65" }, 256: { surah: "Thaha", ayat: "77" },
      271: { surah: "Thaha", ayat: "88" }, 286: { surah: "Thaha", ayat: "105" },
    },
    "17": {
      1: { surah: "Thaha", ayat: "114" }, 16: { surah: "Al-Anbiya'", ayat: "Basmalah" }, 31: { surah: "Al-Anbiya'", ayat: "11" },
      46: { surah: "Al-Anbiya'", ayat: "25" }, 61: { surah: "Al-Anbiya'", ayat: "36" }, 76: { surah: "Al-Anbiya'", ayat: "45" },
      91: { surah: "Al-Anbiya'", ayat: "58" }, 106: { surah: "Al-Anbiya'", ayat: "73" }, 121: { surah: "Al-Anbiya'", ayat: "82" },
      136: { surah: "Al-Anbiya'", ayat: "91" }, 151: { surah: "Al-Anbiya'", ayat: "102" }, 166: { surah: "Al-Hajj", ayat: "Basmalah" },
      181: { surah: "Al-Hajj", ayat: "6" }, 196: { surah: "Al-Hajj", ayat: "16" }, 211: { surah: "Al-Hajj", ayat: "26" },
      226: { surah: "Al-Hajj", ayat: "31" },
    },
    "18": {
      1: { surah: "Al-Hajj", ayat: "38" }, 16: { surah: "Al-Hajj", ayat: "47" }, 31: { surah: "Al-Hajj", ayat: "56" },
      46: { surah: "Al-Hajj", ayat: "65" }, 61: { surah: "Al-Hajj", ayat: "73" }, 76: { surah: "Al-Mu'minun", ayat: "Basmalah" },
      91: { surah: "Al-Mu'minun", ayat: "18" }, 106: { surah: "Al-Mu'minun", ayat: "28" }, 121: { surah: "Al-Mu'minun", ayat: "43" },
      136: { surah: "Al-Mu'minun", ayat: "60" }, 151: { surah: "An-Nur", ayat: "Basmalah" }, 166: { surah: "An-Nur", ayat: "11" },
      181: { surah: "An-Nur", ayat: "21" }, 196: { surah: "An-Nur", ayat: "28" }, 211: { surah: "An-Nur", ayat: "32" },
      226: { surah: "An-Nur", ayat: "37" }, 241: { surah: "An-Nur", ayat: "44" }, 256: { surah: "An-Nur", ayat: "54" },
      271: { surah: "An-Nur", ayat: "59" }, 286: { surah: "Al-Furqan", ayat: "Basmalah" },
    },
    "19": {
      1: { surah: "Al-Furqan", ayat: "21" }, 16: { surah: "Al-Furqan", ayat: "33" }, 31: { surah: "Al-Furqan", ayat: "44" },
      46: { surah: "Al-Furqan", ayat: "56" }, 61: { surah: "Al-Furqan", ayat: "68" }, 76: { surah: "Asy-Syu'ara'", ayat: "Basmalah" },
      91: { surah: "Asy-Syu'ara'", ayat: "20" }, 106: { surah: "Asy-Syu'ara'", ayat: "40" }, 121: { surah: "Asy-Syu'ara'", ayat: "61" },
      136: { surah: "Asy-Syu'ara'", ayat: "84" }, 151: { surah: "Asy-Syu'ara'", ayat: "112" }, 166: { surah: "Asy-Syu'ara'", ayat: "141" },
      181: { surah: "Asy-Syu'ara'", ayat: "160" }, 196: { surah: "Asy-Syu'ara'", ayat: "184" }, 211: { surah: "An-Naml", ayat: "Basmalah" },
      226: { surah: "An-Naml", ayat: "14" }, 241: { surah: "An-Naml", ayat: "23" }, 256: { surah: "An-Naml", ayat: "36" },
      271: { surah: "An-Naml", ayat: "45" },
    },
    "20": {
      1: { surah: "An-Naml", ayat: "56" }, 16: { surah: "An-Naml", ayat: "64" }, 31: { surah: "An-Naml", ayat: "77" },
      46: { surah: "An-Naml", ayat: "89" }, 61: { surah: "Al-Qashash", ayat: "Basmalah" }, 76: { surah: "Al-Qashash", ayat: "6" },
      91: { surah: "Al-Qashash", ayat: "14" }, 106: { surah: "Al-Qashash", ayat: "22" }, 121: { surah: "Al-Qashash", ayat: "29" },
      136: { surah: "Al-Qashash", ayat: "36" }, 151: { surah: "Al-Qashash", ayat: "44" }, 166: { surah: "Al-Qashash", ayat: "51" },
      181: { surah: "Al-Qashash", ayat: "60" }, 196: { surah: "Al-Qashash", ayat: "71" }, 211: { surah: "Al-Qashash", ayat: "78" },
      226: { surah: "Al-Qashash", ayat: "85" }, 241: { surah: "Al-'Ankabut", ayat: "Basmalah" }, 256: { surah: "Al-'Ankabut", ayat: "7" },
      271: { surah: "Al-'Ankabut", ayat: "15" }, 286: { surah: "Al-'Ankabut", ayat: "26" },
    },
    "21": {
      1: { surah: "Al-'Ankabut", ayat: "46" }, 16: { surah: "Al-'Ankabut", ayat: "53" }, 31: { surah: "Al-'Ankabut", ayat: "64" },
      46: { surah: "Ar-Rum", ayat: "Basmalah" }, 61: { surah: "Ar-Rum", ayat: "11" }, 76: { surah: "Ar-Rum", ayat: "20" },
      91: { surah: "Ar-Rum", ayat: "33" }, 106: { surah: "Ar-Rum", ayat: "42" }, 121: { surah: "Ar-Rum", ayat: "51" },
      136: { surah: "Luqman", ayat: "Basmalah" }, 151: { surah: "Luqman", ayat: "12" }, 166: { surah: "Luqman", ayat: "21" },
      181: { surah: "Luqman", ayat: "31" }, 196: { surah: "As-Sajdah", ayat: "Basmalah" }, 211: { surah: "As-Sajdah", ayat: "12" },
      226: { surah: "As-Sajdah", ayat: "21" }, 241: { surah: "Al-Ahzab", ayat: "Basmalah" }, 256: { surah: "Al-Ahzab", ayat: "7" },
      271: { surah: "Al-Ahzab", ayat: "16" }, 286: { surah: "Al-Ahzab", ayat: "23" },
    },
    "22": {
      1: { surah: "Al-Ahzab", ayat: "31" }, 16: { surah: "Al-Ahzab", ayat: "36" }, 31: { surah: "Al-Ahzab", ayat: "44" },
      46: { surah: "Al-Ahzab", ayat: "51" }, 61: { surah: "Al-Ahzab", ayat: "55" }, 76: { surah: "Al-Ahzab", ayat: "63" },
      91: { surah: "Saba'", ayat: "Basmalah" }, 106: { surah: "Saba'", ayat: "8" }, 121: { surah: "Saba'", ayat: "15" },
      136: { surah: "Saba'", ayat: "23" }, 151: { surah: "Saba'", ayat: "32" }, 166: { surah: "Saba'", ayat: "40" },
      181: { surah: "Saba'", ayat: "49" }, 196: { surah: "Fathir", ayat: "Basmalah" }, 211: { surah: "Fathir", ayat: "4" },
      226: { surah: "Fathir", ayat: "12" }, 241: { surah: "Fathir", ayat: "19" }, 256: { surah: "Fathir", ayat: "31" },
      271: { surah: "Fathir", ayat: "39" }, 286: { surah: "Yasin", ayat: "Basmalah" },
    },
    "23": {
      1: { surah: "Yasin", ayat: "28" }, 16: { surah: "Yasin", ayat: "41" }, 31: { surah: "Yasin", ayat: "55" },
      46: { surah: "Yasin", ayat: "71" }, 61: { surah: "Ash-Shaffat", ayat: "Basmalah" }, 76: { surah: "Ash-Shaffat", ayat: "25" },
      91: { surah: "Ash-Shaffat", ayat: "52" }, 106: { surah: "Ash-Shaffat", ayat: "77" }, 121: { surah: "Ash-Shaffat", ayat: "103" },
      136: { surah: "Ash-Shaffat", ayat: "127" }, 151: { surah: "Ash-Shaffat", ayat: "154" }, 166: { surah: "Shad", ayat: "Basmalah" },
      181: { surah: "Shad", ayat: "17" }, 196: { surah: "Shad", ayat: "27" }, 211: { surah: "Shad", ayat: "43" },
      226: { surah: "Shad", ayat: "62" }, 241: { surah: "Shad", ayat: "84" }, 256: { surah: "Az-Zumar", ayat: "Basmalah" },
      271: { surah: "Az-Zumar", ayat: "6" }, 286: { surah: "Az-Zumar", ayat: "11" },
    },
    "24": {
      1: { surah: "Az-Zumar", ayat: "32" }, 16: { surah: "Az-Zumar", ayat: "41" }, 31: { surah: "Az-Zumar", ayat: "48" },
      46: { surah: "Az-Zumar", ayat: "57" }, 61: { surah: "Az-Zumar", ayat: "68" }, 76: { surah: "Az-Zumar", ayat: "75" },
      91: { surah: "Ghafir", ayat: "Basmalah" }, 106: { surah: "Ghafir", ayat: "8" }, 121: { surah: "Ghafir", ayat: "17" },
      136: { surah: "Ghafir", ayat: "26" }, 151: { surah: "Ghafir", ayat: "34" }, 166: { surah: "Ghafir", ayat: "41" },
      181: { surah: "Ghafir", ayat: "50" }, 196: { surah: "Ghafir", ayat: "59" }, 211: { surah: "Ghafir", ayat: "67" },
      226: { surah: "Ghafir", ayat: "78" }, 241: { surah: "Fushshilat", ayat: "Basmalah" }, 256: { surah: "Fushshilat", ayat: "12" },
      271: { surah: "Fushshilat", ayat: "21" }, 286: { surah: "Fushshilat", ayat: "30" },
    },
    "25": {
      1: { surah: "Fushshilat", ayat: "47" }, 16: { surah: "Asy-Syura", ayat: "Basmalah" }, 31: { surah: "Asy-Syura", ayat: "11" },
      46: { surah: "Asy-Syura", ayat: "16" }, 61: { surah: "Asy-Syura", ayat: "23" }, 76: { surah: "Asy-Syura", ayat: "32" },
      91: { surah: "Asy-Syura", ayat: "45" }, 106: { surah: "Az-Zukhruf", ayat: "Basmalah" }, 121: { surah: "Az-Zukhruf", ayat: "11" },
      136: { surah: "Az-Zukhruf", ayat: "23" }, 151: { surah: "Az-Zukhruf", ayat: "34" }, 166: { surah: "Az-Zukhruf", ayat: "48" },
      181: { surah: "Az-Zukhruf", ayat: "61" }, 196: { surah: "Az-Zukhruf", ayat: "74" }, 211: { surah: "Ad-Dukhan", ayat: "Basmalah" },
      226: { surah: "Ad-Dukhan", ayat: "19" }, 241: { surah: "Ad-Dukhan", ayat: "40" }, 256: { surah: "Al-Jatsiyah", ayat: "Basmalah" },
      271: { surah: "Al-Jatsiyah", ayat: "14" }, 286: { surah: "Al-Jatsiyah", ayat: "23" },
    },
    "26": {
      1: { surah: "Al-Ahqaf", ayat: "1" }, 16: { surah: "Al-Ahqaf", ayat: "6" }, 31: { surah: "Al-Ahqaf", ayat: "15" },
      46: { surah: "Al-Ahqaf", ayat: "21" }, 61: { surah: "Al-Ahqaf", ayat: "29" }, 76: { surah: "Muhammad", ayat: "Basmalah" },
      91: { surah: "Muhammad", ayat: "12" }, 106: { surah: "Muhammad", ayat: "20" }, 121: { surah: "Muhammad", ayat: "30" },
      136: { surah: "Al-Fath", ayat: "Basmalah" }, 151: { surah: "Al-Fath", ayat: "10" }, 166: { surah: "Al-Fath", ayat: "16" },
      181: { surah: "Al-Fath", ayat: "24" }, 196: { surah: "Al-Hujurat", ayat: "Basmalah" }, 211: { surah: "Al-Hujurat", ayat: "5" },
      226: { surah: "Al-Hujurat", ayat: "12" }, 241: { surah: "Qaf", ayat: "Basmalah" }, 256: { surah: "Qaf", ayat: "16" },
      271: { surah: "Qaf", ayat: "36" }, 286: { surah: "Adz-Dzariyat", ayat: "Basmalah" },
    },
    "27": {
      1: { surah: "Adz-Dzariyat", ayat: "31" }, 16: { surah: "Ath-Thur", ayat: "Basmalah" }, 31: { surah: "Ath-Thur", ayat: "15" },
      46: { surah: "An-Najm", ayat: "Basmalah" }, 61: { surah: "An-Najm", ayat: "26" }, 76: { surah: "An-Najm", ayat: "45" },
      91: { surah: "Al-Qamar", ayat: "Basmalah" }, 106: { surah: "Al-Qamar", ayat: "23" }, 121: { surah: "Al-Qamar", ayat: "49" },
      136: { surah: "Ar-Rahman", ayat: "Basmalah" }, 151: { surah: "Ar-Rahman", ayat: "41" }, 166: { surah: "Ar-Rahman", ayat: "68" },
      181: { surah: "Al-Waqi'ah", ayat: "Basmalah" }, 196: { surah: "Al-Waqi'ah", ayat: "51" }, 211: { surah: "Al-Waqi'ah", ayat: "77" },
      226: { surah: "Al-Hadid", ayat: "Basmalah" }, 241: { surah: "Al-Hadid", ayat: "12" }, 256: { surah: "Al-Hadid", ayat: "19" },
      271: { surah: "Al-Hadid", ayat: "25" },
    },
    "28": {
      1: { surah: "Al-Mujadilah", ayat: "Basmalah" }, 16: { surah: "Al-Mujadilah", ayat: "7" }, 31: { surah: "Al-Mujadilah", ayat: "12" },
      46: { surah: "Al-Hasyr", ayat: "Basmalah" }, 61: { surah: "Al-Hasyr", ayat: "10" }, 76: { surah: "Al-Hasyr", ayat: "18" },
      91: { surah: "Al-Mumtahanah", ayat: "Basmalah" }, 106: { surah: "Al-Mumtahanah", ayat: "6" }, 121: { surah: "Al-Mumtahanah", ayat: "12" },
      136: { surah: "Ash-Shaff", ayat: "Basmalah" }, 151: { surah: "Al-Jumu'ah", ayat: "Basmalah" }, 166: { surah: "Al-Munafiqun", ayat: "Basmalah" },
      181: { surah: "At-Taghabun", ayat: "Basmalah" }, 196: { surah: "At-Taghabun", ayat: "10" }, 211: { surah: "Ath-Thalaq", ayat: "Basmalah" },
      226: { surah: "Ath-Thalaq", ayat: "6" }, 241: { surah: "At-Tahrim", ayat: "Basmalah" }, 256: { surah: "At-Tahrim", ayat: "8" },
    },
    "29": {
      1: { surah: "Al-Mulk", ayat: "Basmalah" }, 16: { surah: "Al-Mulk", ayat: "13" }, 31: { surah: "Al-Mulk", ayat: "27" },
      46: { surah: "Al-Qalam", ayat: "Basmalah" }, 61: { surah: "Al-Qalam", ayat: "17" }, 76: { surah: "Al-Qalam", ayat: "43" },
      91: { surah: "Al-Haqqah", ayat: "Basmalah" }, 106: { surah: "Al-Haqqah", ayat: "9" }, 121: { surah: "Al-Haqqah", ayat: "35" },
      136: { surah: "Al-Ma'arij", ayat: "Basmalah" }, 151: { surah: "Al-Ma'arij", ayat: "11" }, 166: { surah: "Nuh", ayat: "Basmalah" },
      181: { surah: "Nuh", ayat: "11" }, 196: { surah: "Al-Jinn", ayat: "Basmalah" }, 211: { surah: "Al-Jinn", ayat: "14" },
      226: { surah: "Al-Muzzammil", ayat: "Basmalah" }, 241: { surah: "Al-Muzzammil", ayat: "20" }, 256: { surah: "Al-Muddatstsir", ayat: "Basmalah" },
      271: { surah: "Al-Muddatstsir", ayat: "32" }, 286: { surah: "Al-Qiyamah", ayat: "Basmalah" }, 301: { surah: "Al-Insan", ayat: "Basmalah" },
      316: { surah: "Al-Insan", ayat: "15" }, 331: { surah: "Al-Mursalat", ayat: "Basmalah" },
    },
    "30": {
      1: { surah: "An-Naba'", ayat: "1" }, 16: { surah: "An-Naba'", ayat: "31" }, 31: { surah: "An-Nazi'at", ayat: "16" },
      46: { surah: "'Abasa", ayat: "Basmalah" }, 61: { surah: "At-Takwir", ayat: "Basmalah" }, 76: { surah: "At-Takwir", ayat: "15" },
      91: { surah: "Al-Infitar", ayat: "Basmalah" }, 106: { surah: "Al-Muthaffifin", ayat: "7" }, 121: { surah: "Al-Insyiqaq", ayat: "Basmalah" },
      136: { surah: "Al-Buruj", ayat: "Basmalah" }, 151: { surah: "Ath-Thariq", ayat: "Basmalah" }, 166: { surah: "Al-A'la", ayat: "16" },
      181: { surah: "Al-Fajr", ayat: "Basmalah" }, 196: { surah: "Al-Balad", ayat: "Basmalah" }, 211: { surah: "Asy-Syams", ayat: "Basmalah" },
      226: { surah: "Al-Lail", ayat: "Basmalah" }, 241: { surah: "Ad-Duha", ayat: "Basmalah" }, 256: { surah: "Al-Insyirah", ayat: "Basmalah" },
      271: { surah: "Al-'Alaq", ayat: "9" }, 286: { surah: "Az-Zalzalah", ayat: "Basmalah" }, 301: { surah: "At-Takatsur", ayat: "Basmalah" },
      316: { surah: "Quraisy", ayat: "Basmalah" }, 331: { surah: "Al-Kafirun", ayat: "Basmalah" },
    }
  };

  const deteksiSurat = (juzAngka: number, totalBaris: number) => {
    const batas = BATAS_SURAT_JUZ[juzAngka];
    if (batas) {
      let suratAktif = batas[0].nama;
      for (let i = 0; i < batas.length; i++) {
        if (totalBaris >= batas[i].mulaiBaris) {
          suratAktif = batas[i].nama;
        } else {
          break;
        }
      }
      return suratAktif;
    }
    return `Surat di Juz ${juzAngka}`;
  };

  const handleJuzToggle = (selectedJuz: string) => {
    const limit = parseInt(kategori);
    if (juzList.includes(selectedJuz)) {
      setJuzList(juzList.filter(j => j !== selectedJuz));
    } else {
      if (juzList.length < limit) {
        setJuzList([...juzList, selectedJuz]);
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (juzList.length === 0) return;

    const hlm = Number(halaman) || 0;
    const brs = Number(baris) || 0;
    const totalBaris = (hlm * 15) + brs;

    let totalSuratAchieved = 0;
    const details = juzList.map(j => {
      let pencapaian: { surah: string; ayat: string };
      
      const juzNum = parseInt(j);
      const batas = BATAS_SURAT_JUZ[juzNum];
      if (batas) {
        totalSuratAchieved += batas.filter(b => totalBaris >= b.mulaiBaris).length;
      }

      const dataJuz = posisiAyatData[j];
      if (dataJuz) {
        const keys = Object.keys(dataJuz).map(Number).sort((a, b) => b - a);
        const nearestKey = keys.find(k => k <= totalBaris);
        
        if (nearestKey !== undefined) {
          const isExact = nearestKey === totalBaris;
          const data = dataJuz[nearestKey];
          const barisKe = (totalBaris - 1) % 15 + 1;
          pencapaian = {
            surah: data.surah,
            ayat: isExact ? data.ayat : (data.ayat === "Basmalah" ? `Awal Surat (Baris ${barisKe})` : `Lanjutan ${data.ayat} (Baris ${barisKe})`)
          };
        } else {
          const namaSuratSpesifik = deteksiSurat(juzNum, totalBaris);
          const barisKe = (totalBaris - 1) % 15 + 1;
          pencapaian = { 
            surah: namaSuratSpesifik, 
            ayat: `Halaman ${Math.floor((totalBaris - 1) / 15) + 1}, Baris ${barisKe}` 
          };
        }
      } else {
        const namaSuratSpesifik = deteksiSurat(juzNum, totalBaris);
        const barisKe = (totalBaris - 1) % 15 + 1;
        pencapaian = { 
          surah: namaSuratSpesifik, 
          ayat: `Halaman ${Math.floor((totalBaris - 1) / 15) + 1}, Baris ${barisKe}` 
        };
      }

      return { juz: j, ...pencapaian };
    });

    const totalLinesAll = ((hlm * 15) + brs) * juzList.length;
    setResult({ 
      details, 
      hlm, 
      brs, 
      totalBaris,
      totalHalaman: Math.floor(totalLinesAll / 15),
      totalBarisResult: totalLinesAll % 15,
      totalSurat: totalSuratAchieved
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 font-sans text-stone-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-[2rem] shadow-2xl shadow-emerald-900/5 overflow-hidden border border-stone-200"
      >
        {/* Header */}
        <div className="bg-emerald-700 px-8 py-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
          </div>
          <BookOpen className="w-14 h-14 text-white mx-auto mb-4 relative z-10" />
          <h1 className="text-3xl font-bold text-white mb-2 relative z-10 tracking-tight">Monitoring Hafalan</h1>
          <p className="text-emerald-100/80 text-sm relative z-10 font-medium">Standar Al-Qur'an Madinah • 15 Baris / Halaman</p>
        </div>

        <div className="p-8 sm:p-10">
          <form onSubmit={handleSearch} className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              {/* Kategori */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Target Hafalan
                </label>
                <select 
                  className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 bg-stone-50 outline-none transition-all appearance-none cursor-pointer font-medium"
                  value={kategori}
                  onChange={(e) => {
                    const newKategori = e.target.value;
                    const limit = parseInt(newKategori);
                    setKategori(newKategori);
                    if (juzList.length > limit) {
                      setJuzList(juzList.slice(0, limit));
                    }
                  }}
                >
                  {kategoriOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              {/* Juz Selection */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
                  <Book className="w-4 h-4 text-emerald-600" />
                  Pilih Juz
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
                  {juzOptions.map(opt => {
                    const isSelected = juzList.includes(opt);
                    const urutanPilihan = juzList.indexOf(opt) + 1;
                    const limit = parseInt(kategori);
                    const isFull = juzList.length >= limit && !isSelected;
                    
                    return (
                      <label 
                        key={opt} 
                        className={`relative flex items-center justify-center py-3 rounded-xl border transition-all duration-300 select-none
                          ${isSelected 
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200 scale-105 z-10 cursor-pointer' 
                            : isFull
                              ? 'bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed opacity-50'
                              : 'bg-stone-50 text-stone-500 border-stone-200 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer'
                          }`}
                      >
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={isSelected}
                          disabled={isFull}
                          onChange={() => handleJuzToggle(opt)}
                        />
                        <span className="text-sm font-bold">{opt}</span>
                        {isSelected && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 bg-amber-400 text-emerald-950 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                          >
                            {urutanPilihan}
                          </motion.span>
                        )}
                      </label>
                    );
                  })}
                </div>
                {juzList.length === 0 && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-rose-500 font-bold mt-2">
                    * Silakan pilih minimal 1 Juz
                  </motion.p>
                )}
              </div>
            </div>

            {/* Position Inputs */}
            <div className="p-6 bg-emerald-50/40 rounded-3xl border border-emerald-100/50 space-y-6">
              <h3 className="text-xs font-black text-emerald-800 uppercase tracking-widest border-b border-emerald-100 pb-3">Posisi Terakhir</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Halaman Penuh</label>
                  <div className="relative group">
                    <input 
                      type="number" min="0" max="25"
                      className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none pr-14 bg-white transition-all group-hover:border-emerald-200"
                      value={halaman === 0 ? '' : halaman} 
                      onChange={(e) => setHalaman(e.target.value === '' ? 0 : parseInt(e.target.value, 10) || 0)} 
                      required
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 text-xs font-bold">HLM</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Baris Tambahan</label>
                  <div className="relative group">
                    <input 
                      type="number" min="0" max="15"
                      className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none pr-16 bg-white transition-all group-hover:border-emerald-200"
                      value={baris === 0 ? '' : baris} 
                      onChange={(e) => setBaris(e.target.value === '' ? 0 : parseInt(e.target.value, 10) || 0)} 
                      required
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 text-xs font-bold">BARIS</span>
                  </div>
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-5 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/10 transition-all"
            >
              <Search className="w-5 h-5" />
              CEK POSISI HAFALAN
            </motion.button>
          </form>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-10 space-y-4"
              >
                <div className="bg-stone-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <CheckCircle className="w-24 h-24 text-white" />
                  </div>
                  
                  <h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    Hasil Analisis
                  </h3>

                  {/* Summary for multiple Juz */}
                  {result.details.length > 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-2 gap-4 mb-8"
                    >
                      <div className="bg-white/10 backdrop-blur-sm p-5 rounded-3xl border border-white/10 shadow-inner">
                        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">Total Hafalan</p>
                        <p className="text-2xl font-black text-white leading-none">
                          {result.totalHalaman} <span className="text-[10px] font-medium text-stone-400 uppercase">HLM</span>
                        </p>
                        <p className="text-xs font-bold text-stone-500 mt-1">
                          {result.totalBarisResult} <span className="text-[10px] uppercase">Baris</span>
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-5 rounded-3xl border border-white/10 shadow-inner">
                        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">Capaian Surat</p>
                        <p className="text-2xl font-black text-white leading-none">
                          {result.totalSurat} <span className="text-[10px] font-medium text-stone-400 uppercase">Surat</span>
                        </p>
                        <p className="text-xs font-bold text-stone-500 mt-1">Dari {result.details.length} Juz</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-4">
                    {result.details.map((item: any, idx: number) => (
                      <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx} 
                        className="bg-white/5 backdrop-blur-sm px-6 py-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-emerald-500 text-white w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shadow-lg shadow-emerald-500/20">
                            {item.juz}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">SURAT</p>
                            <p className="text-xl font-bold text-white tracking-tight">{item.surah}</p>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">AYAT / POSISI</p>
                          <p className="text-stone-100 text-lg font-bold leading-relaxed">
                            {item.ayat}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
