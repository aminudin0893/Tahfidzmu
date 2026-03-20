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
      // Page 2 (1)
      1: { surah: "Al-Fatihah", ayat: "Basmalah" }, 2: { surah: "Al-Fatihah", ayat: "1-2" }, 3: { surah: "Al-Fatihah", ayat: "3-4" },
      4: { surah: "Al-Fatihah", ayat: "5" }, 5: { surah: "Al-Fatihah", ayat: "6" }, 6: { surah: "Al-Fatihah", ayat: "7" },
      7: { surah: "Al-Baqarah", ayat: "Basmalah" }, 8: { surah: "Al-Baqarah", ayat: "1-2" }, 9: { surah: "Al-Baqarah", ayat: "3" },
      10: { surah: "Al-Baqarah", ayat: "4" }, 11: { surah: "Al-Baqarah", ayat: "5" }, 12: { surah: "Al-Baqarah", ayat: "Akhir Hal" },
      13: { surah: "Al-Baqarah", ayat: "Akhir Hal" }, 14: { surah: "Al-Baqarah", ayat: "Akhir Hal" }, 15: { surah: "Al-Baqarah", ayat: "Akhir Hal" },
      // Page 3 (2)
      16: { surah: "Al-Baqarah", ayat: "6-7" }, 17: { surah: "Al-Baqarah", ayat: "8-9" }, 18: { surah: "Al-Baqarah", ayat: "10-11" },
      19: { surah: "Al-Baqarah", ayat: "12-13" }, 20: { surah: "Al-Baqarah", ayat: "14-15" }, 21: { surah: "Al-Baqarah", ayat: "16" },
      22: { surah: "Al-Baqarah", ayat: "17-18" }, 23: { surah: "Al-Baqarah", ayat: "19" }, 24: { surah: "Al-Baqarah", ayat: "20" },
      25: { surah: "Al-Baqarah", ayat: "21-22" }, 26: { surah: "Al-Baqarah", ayat: "23" }, 27: { surah: "Al-Baqarah", ayat: "24" },
      28: { surah: "Al-Baqarah", ayat: "25" }, 29: { surah: "Al-Baqarah", ayat: "26" }, 30: { surah: "Al-Baqarah", ayat: "27" },
    },
    "2": {
      // Page 22 (1)
      1: { surah: "Al-Baqarah", ayat: "142" }, 2: { surah: "Al-Baqarah", ayat: "143" }, 3: { surah: "Al-Baqarah", ayat: "144" },
      4: { surah: "Al-Baqarah", ayat: "145" }, 5: { surah: "Al-Baqarah", ayat: "146-147" }, 6: { surah: "Al-Baqarah", ayat: "148" },
      7: { surah: "Al-Baqarah", ayat: "149-150" }, 8: { surah: "Al-Baqarah", ayat: "151" }, 9: { surah: "Al-Baqarah", ayat: "152-153" },
      10: { surah: "Al-Baqarah", ayat: "154" }, 11: { surah: "Al-Baqarah", ayat: "155" }, 12: { surah: "Al-Baqarah", ayat: "156-157" },
      13: { surah: "Al-Baqarah", ayat: "158" }, 14: { surah: "Al-Baqarah", ayat: "159" }, 15: { surah: "Al-Baqarah", ayat: "160" },
    },
    "3": {
      1: { surah: "Al-Baqarah", ayat: "253" }, 16: { surah: "Al-Baqarah", ayat: "257" }, 31: { surah: "Al-Baqarah", ayat: "260" },
      46: { surah: "Al-Baqarah", ayat: "265" }, 61: { surah: "Al-Baqarah", ayat: "270" }, 76: { surah: "Al-Baqarah", ayat: "275" },
      91: { surah: "Al-Baqarah", ayat: "282" }, 106: { surah: "Al-Baqarah", ayat: "283" }, 121: { surah: "Ali 'Imran", ayat: "Basmalah" },
    },
    "4": {
      1: { surah: "Ali 'Imran", ayat: "92" }, 16: { surah: "Ali 'Imran", ayat: "101" }, 31: { surah: "Ali 'Imran", ayat: "116" },
      46: { surah: "Ali 'Imran", ayat: "122" }, 61: { surah: "Ali 'Imran", ayat: "133" }, 76: { surah: "Ali 'Imran", ayat: "149" },
      91: { surah: "Ali 'Imran", ayat: "158" }, 106: { surah: "Ali 'Imran", ayat: "166" }, 121: { surah: "Ali 'Imran", ayat: "174" },
      136: { surah: "Ali 'Imran", ayat: "187" }, 151: { surah: "Ali 'Imran", ayat: "195" }, 166: { surah: "Ali 'Imran", ayat: "200" },
      181: { surah: "An-Nisa'", ayat: "Basmalah" },
    },
    "5": {
      1: { surah: "An-Nisa'", ayat: "24" }, 16: { surah: "An-Nisa'", ayat: "34" }, 31: { surah: "An-Nisa'", ayat: "45" },
      46: { surah: "An-Nisa'", ayat: "52" }, 61: { surah: "An-Nisa'", ayat: "66" }, 76: { surah: "An-Nisa'", ayat: "75" },
      91: { surah: "An-Nisa'", ayat: "87" }, 106: { surah: "An-Nisa'", ayat: "95" }, 121: { surah: "An-Nisa'", ayat: "106" },
      136: { surah: "An-Nisa'", ayat: "114" }, 151: { surah: "An-Nisa'", ayat: "128" }, 166: { surah: "An-Nisa'", ayat: "141" },
    },
    "6": {
      1: { surah: "An-Nisa'", ayat: "148" }, 16: { surah: "An-Nisa'", ayat: "155" }, 31: { surah: "An-Nisa'", ayat: "163" },
      46: { surah: "An-Nisa'", ayat: "171" }, 61: { surah: "An-Nisa'", ayat: "176" }, 76: { surah: "Al-Ma'idah", ayat: "Basmalah" },
      91: { surah: "Al-Ma'idah", ayat: "3" }, 106: { surah: "Al-Ma'idah", ayat: "6" }, 121: { surah: "Al-Ma'idah", ayat: "14" },
      136: { surah: "Al-Ma'idah", ayat: "24" }, 151: { surah: "Al-Ma'idah", ayat: "32" }, 166: { surah: "Al-Ma'idah", ayat: "42" },
    },
    "7": {
      1: { surah: "Al-Ma'idah", ayat: "82" }, 16: { surah: "Al-Ma'idah", ayat: "90" }, 31: { surah: "Al-Ma'idah", ayat: "101" },
      46: { surah: "Al-Ma'idah", ayat: "109" }, 61: { surah: "Al-Ma'idah", ayat: "114" }, 76: { surah: "Al-Ma'idah", ayat: "120" },
      91: { surah: "Al-An'am", ayat: "Basmalah" }, 106: { surah: "Al-An'am", ayat: "9" }, 121: { surah: "Al-An'am", ayat: "19" },
      136: { surah: "Al-An'am", ayat: "28" }, 151: { surah: "Al-An'am", ayat: "36" },
    },
    "8": {
      1: { surah: "Al-An'am", ayat: "111" }, 16: { surah: "Al-An'am", ayat: "119" }, 31: { surah: "Al-An'am", ayat: "125" },
      46: { surah: "Al-An'am", ayat: "132" }, 61: { surah: "Al-An'am", ayat: "143" }, 76: { surah: "Al-An'am", ayat: "152" },
      91: { surah: "Al-An'am", ayat: "158" }, 106: { surah: "Al-An'am", ayat: "165" }, 121: { surah: "Al-A'raf", ayat: "Basmalah" },
      136: { surah: "Al-A'raf", ayat: "12" }, 151: { surah: "Al-A'raf", ayat: "23" }, 166: { surah: "Al-A'raf", ayat: "31" },
    },
    "9": {
      1: { surah: "Al-A'raf", ayat: "88" }, 16: { surah: "Al-A'raf", ayat: "96" }, 31: { surah: "Al-A'raf", ayat: "105" },
      46: { surah: "Al-A'raf", ayat: "121" }, 61: { surah: "Al-A'raf", ayat: "138" }, 76: { surah: "Al-A'raf", ayat: "144" },
      91: { surah: "Al-A'raf", ayat: "156" }, 106: { surah: "Al-A'raf", ayat: "164" }, 121: { surah: "Al-A'raf", ayat: "171" },
      136: { surah: "Al-A'raf", ayat: "188" }, 151: { surah: "Al-A'raf", ayat: "196" }, 166: { surah: "Al-A'raf", ayat: "206" },
    },
    "10": {
      1: { surah: "Al-Anfal", ayat: "1" }, 16: { surah: "Al-Anfal", ayat: "9" }, 31: { surah: "Al-Anfal", ayat: "17" },
      46: { surah: "Al-Anfal", ayat: "26" }, 61: { surah: "Al-Anfal", ayat: "34" }, 76: { surah: "Al-Anfal", ayat: "41" },
      91: { surah: "Al-Anfal", ayat: "53" }, 106: { surah: "Al-Anfal", ayat: "62" }, 121: { surah: "Al-Anfal", ayat: "70" },
      136: { surah: "Al-Anfal", ayat: "75" }, 151: { surah: "At-Taubah", ayat: "Basmalah" },
    },
    "11": {
      1: { surah: "At-Taubah", ayat: "93" }, 16: { surah: "At-Taubah", ayat: "100" }, 31: { surah: "At-Taubah", ayat: "107" },
      46: { surah: "At-Taubah", ayat: "112" }, 61: { surah: "At-Taubah", ayat: "118" }, 76: { surah: "At-Taubah", ayat: "123" },
      91: { surah: "At-Taubah", ayat: "128" }, 106: { surah: "At-Taubah", ayat: "Selesai" }, 121: { surah: "Yunus", ayat: "Basmalah" },
      136: { surah: "Yunus", ayat: "7" }, 151: { surah: "Yunus", ayat: "15" }, 166: { surah: "Yunus", ayat: "21" },
    },
    "12": {
      1: { surah: "Yunus", ayat: "71" }, 16: { surah: "Yunus", ayat: "79" }, 31: { surah: "Yunus", ayat: "89" },
      46: { surah: "Yunus", ayat: "98" }, 61: { surah: "Yunus", ayat: "107" }, 76: { surah: "Hud", ayat: "Basmalah" },
      91: { surah: "Hud", ayat: "6" }, 106: { surah: "Hud", ayat: "13" }, 121: { surah: "Hud", ayat: "20" },
      136: { surah: "Hud", ayat: "29" }, 151: { surah: "Hud", ayat: "38" }, 166: { surah: "Hud", ayat: "46" },
    },
    "13": {
      1: { surah: "Hud", ayat: "109" }, 16: { surah: "Hud", ayat: "118" }, 31: { surah: "Yusuf", ayat: "Basmalah" },
      46: { surah: "Yusuf", ayat: "7" }, 61: { surah: "Yusuf", ayat: "15" }, 76: { surah: "Yusuf", ayat: "23" },
      91: { surah: "Yusuf", ayat: "31" }, 106: { surah: "Yusuf", ayat: "38" }, 121: { surah: "Yusuf", ayat: "44" },
      136: { surah: "Yusuf", ayat: "53" }, 151: { surah: "Yusuf", ayat: "64" }, 166: { surah: "Yusuf", ayat: "70" },
    },
    "14": {
      1: { surah: "Ar-Ra'd", ayat: "35" }, 16: { surah: "Ibrahim", ayat: "Basmalah" }, 31: { surah: "Ibrahim", ayat: "6" },
      46: { surah: "Ibrahim", ayat: "11" }, 61: { surah: "Ibrahim", ayat: "19" }, 76: { surah: "Ibrahim", ayat: "25" },
      91: { surah: "Ibrahim", ayat: "34" }, 106: { surah: "Ibrahim", ayat: "43" }, 121: { surah: "Al-Hijr", ayat: "Basmalah" },
      136: { surah: "Al-Hijr", ayat: "16" }, 151: { surah: "Al-Hijr", ayat: "32" }, 166: { surah: "Al-Hijr", ayat: "52" },
    },
    "15": {
      1: { surah: "An-Nahl", ayat: "55" }, 16: { surah: "An-Nahl", ayat: "65" }, 31: { surah: "An-Nahl", ayat: "73" },
      46: { surah: "An-Nahl", ayat: "80" }, 61: { surah: "An-Nahl", ayat: "88" }, 76: { surah: "An-Nahl", ayat: "94" },
      91: { surah: "An-Nahl", ayat: "103" }, 106: { surah: "An-Nahl", ayat: "111" }, 121: { surah: "An-Nahl", ayat: "119" },
      136: { surah: "Al-Isra'", ayat: "Basmalah" }, 151: { surah: "Al-Isra'", ayat: "8" }, 166: { surah: "Al-Isra'", ayat: "18" },
    },
    "16": {
      1: { surah: "Al-Kahf", ayat: "75" }, 16: { surah: "Al-Kahf", ayat: "84" }, 31: { surah: "Al-Kahf", ayat: "98" },
      46: { surah: "Al-Kahf", ayat: "107" }, 61: { surah: "Maryam", ayat: "Basmalah" }, 76: { surah: "Maryam", ayat: "12" },
      91: { surah: "Maryam", ayat: "26" }, 106: { surah: "Maryam", ayat: "39" }, 121: { surah: "Maryam", ayat: "52" },
      136: { surah: "Maryam", ayat: "65" }, 151: { surah: "Maryam", ayat: "77" }, 166: { surah: "Maryam", ayat: "96" },
    },
    "17": {
      1: { surah: "Thaha", ayat: "114" }, 16: { surah: "Al-Anbiya'", ayat: "Basmalah" }, 31: { surah: "Al-Anbiya'", ayat: "11" },
      46: { surah: "Al-Anbiya'", ayat: "25" }, 61: { surah: "Al-Anbiya'", ayat: "36" }, 76: { surah: "Al-Anbiya'", ayat: "45" },
      91: { surah: "Al-Anbiya'", ayat: "58" }, 106: { surah: "Al-Anbiya'", ayat: "73" }, 121: { surah: "Al-Anbiya'", ayat: "82" },
      136: { surah: "Al-Anbiya'", ayat: "91" }, 151: { surah: "Al-Anbiya'", ayat: "102" }, 166: { surah: "Al-Hajj", ayat: "Basmalah" },
    },
    "18": {
      1: { surah: "Al-Hajj", ayat: "38" }, 16: { surah: "Al-Hajj", ayat: "47" }, 31: { surah: "Al-Hajj", ayat: "56" },
      46: { surah: "Al-Hajj", ayat: "65" }, 61: { surah: "Al-Hajj", ayat: "73" }, 76: { surah: "Al-Mu'minun", ayat: "Basmalah" },
      91: { surah: "Al-Mu'minun", ayat: "18" }, 106: { surah: "Al-Mu'minun", ayat: "28" }, 121: { surah: "Al-Mu'minun", ayat: "43" },
      136: { surah: "Al-Mu'minun", ayat: "60" }, 151: { surah: "Al-Mu'minun", ayat: "75" }, 166: { surah: "Al-Mu'minun", ayat: "90" },
    },
    "19": {
      1: { surah: "Al-Furqan", ayat: "21" }, 16: { surah: "Al-Furqan", ayat: "33" }, 31: { surah: "Al-Furqan", ayat: "44" },
      46: { surah: "Al-Furqan", ayat: "56" }, 61: { surah: "Al-Furqan", ayat: "68" }, 76: { surah: "Asy-Syu'ara'", ayat: "Basmalah" },
      91: { surah: "Asy-Syu'ara'", ayat: "20" }, 106: { surah: "Asy-Syu'ara'", ayat: "40" }, 121: { surah: "Asy-Syu'ara'", ayat: "61" },
      136: { surah: "Asy-Syu'ara'", ayat: "84" }, 151: { surah: "Asy-Syu'ara'", ayat: "112" }, 166: { surah: "Asy-Syu'ara'", ayat: "141" },
    },
    "20": {
      1: { surah: "An-Naml", ayat: "56" }, 16: { surah: "An-Naml", ayat: "64" }, 31: { surah: "An-Naml", ayat: "77" },
      46: { surah: "An-Naml", ayat: "89" }, 61: { surah: "Al-Qashash", ayat: "Basmalah" }, 76: { surah: "Al-Qashash", ayat: "6" },
      91: { surah: "Al-Qashash", ayat: "14" }, 106: { surah: "Al-Qashash", ayat: "22" }, 121: { surah: "Al-Qashash", ayat: "29" },
      136: { surah: "Al-Qashash", ayat: "36" }, 151: { surah: "Al-Qashash", ayat: "44" }, 166: { surah: "Al-Qashash", ayat: "51" },
    },
    "21": {
      1: { surah: "Al-'Ankabut", ayat: "46" }, 16: { surah: "Al-'Ankabut", ayat: "53" }, 31: { surah: "Al-'Ankabut", ayat: "64" },
      46: { surah: "Ar-Rum", ayat: "Basmalah" }, 61: { surah: "Ar-Rum", ayat: "6" }, 76: { surah: "Ar-Rum", ayat: "16" },
      91: { surah: "Ar-Rum", ayat: "25" }, 106: { surah: "Ar-Rum", ayat: "33" }, 121: { surah: "Ar-Rum", ayat: "42" },
      136: { surah: "Ar-Rum", ayat: "51" }, 151: { surah: "Ar-Rum", ayat: "60" }, 166: { surah: "Luqman", ayat: "Basmalah" },
    },
    "22": {
      1: { surah: "Al-Ahzab", ayat: "31" }, 16: { surah: "Al-Ahzab", ayat: "36" }, 31: { surah: "Al-Ahzab", ayat: "44" },
      46: { surah: "Al-Ahzab", ayat: "51" }, 61: { surah: "Al-Ahzab", ayat: "55" }, 76: { surah: "Al-Ahzab", ayat: "63" },
      91: { surah: "Al-Ahzab", ayat: "73" }, 106: { surah: "Saba'", ayat: "Basmalah" }, 121: { surah: "Saba'", ayat: "8" },
      136: { surah: "Saba'", ayat: "15" }, 151: { surah: "Saba'", ayat: "23" }, 166: { surah: "Saba'", ayat: "32" },
    },
    "23": {
      1: { surah: "Yasin", ayat: "28" }, 16: { surah: "Yasin", ayat: "41" }, 31: { surah: "Yasin", ayat: "55" },
      46: { surah: "Yasin", ayat: "71" }, 61: { surah: "Ash-Shaffat", ayat: "Basmalah" }, 76: { surah: "Ash-Shaffat", ayat: "25" },
      91: { surah: "Ash-Shaffat", ayat: "52" }, 106: { surah: "Ash-Shaffat", ayat: "77" }, 121: { surah: "Ash-Shaffat", ayat: "103" },
      136: { surah: "Ash-Shaffat", ayat: "127" }, 151: { surah: "Ash-Shaffat", ayat: "154" }, 166: { surah: "Shad", ayat: "Basmalah" },
    },
    "24": {
      1: { surah: "Az-Zumar", ayat: "32" }, 16: { surah: "Az-Zumar", ayat: "41" }, 31: { surah: "Az-Zumar", ayat: "48" },
      46: { surah: "Az-Zumar", ayat: "57" }, 61: { surah: "Az-Zumar", ayat: "68" }, 76: { surah: "Az-Zumar", ayat: "75" },
      91: { surah: "Ghafir", ayat: "Basmalah" }, 106: { surah: "Ghafir", ayat: "8" }, 121: { surah: "Ghafir", ayat: "17" },
      136: { surah: "Ghafir", ayat: "26" }, 151: { surah: "Ghafir", ayat: "34" }, 166: { surah: "Ghafir", ayat: "41" },
    },
    "25": {
      1: { surah: "Fushshilat", ayat: "47" }, 16: { surah: "Asy-Syura", ayat: "Basmalah" }, 31: { surah: "Asy-Syura", ayat: "11" },
      46: { surah: "Asy-Syura", ayat: "16" }, 61: { surah: "Asy-Syura", ayat: "23" }, 76: { surah: "Asy-Syura", ayat: "32" },
      91: { surah: "Asy-Syura", ayat: "45" }, 106: { surah: "Asy-Syura", ayat: "52" }, 121: { surah: "Az-Zukhruf", ayat: "Basmalah" },
      136: { surah: "Az-Zukhruf", ayat: "11" }, 151: { surah: "Az-Zukhruf", ayat: "23" }, 166: { surah: "Az-Zukhruf", ayat: "34" },
    },
    "26": {
      1: { surah: "Al-Jatsiyah", ayat: "33" }, 16: { surah: "Al-Ahqaf", ayat: "Basmalah" }, 31: { surah: "Al-Ahqaf", ayat: "6" },
      46: { surah: "Al-Ahqaf", ayat: "15" }, 61: { surah: "Al-Ahqaf", ayat: "21" }, 76: { surah: "Al-Ahqaf", ayat: "29" },
      91: { surah: "Al-Ahqaf", ayat: "Selesai" }, 106: { surah: "Muhammad", ayat: "Basmalah" }, 121: { surah: "Muhammad", ayat: "12" },
      136: { surah: "Muhammad", ayat: "20" }, 151: { surah: "Muhammad", ayat: "30" }, 166: { surah: "Al-Fath", ayat: "Basmalah" },
    },
    "27": {
      1: { surah: "Qaf", ayat: "31" }, 16: { surah: "Adz-Dzariyat", ayat: "Basmalah" }, 31: { surah: "Adz-Dzariyat", ayat: "31" },
      46: { surah: "Adz-Dzariyat", ayat: "52" }, 61: { surah: "Ath-Thur", ayat: "Basmalah" }, 76: { surah: "Ath-Thur", ayat: "24" },
      91: { surah: "Ath-Thur", ayat: "48" }, 106: { surah: "An-Najm", ayat: "Basmalah" }, 121: { surah: "An-Najm", ayat: "26" },
      136: { surah: "An-Najm", ayat: "45" }, 151: { surah: "Al-Qamar", ayat: "Basmalah" }, 166: { surah: "Al-Qamar", ayat: "23" },
    },
    "28": {
      1: { surah: "Al-Mujadilah", ayat: "1" }, 16: { surah: "Al-Mujadilah", ayat: "7" }, 31: { surah: "Al-Mujadilah", ayat: "12" },
      46: { surah: "Al-Mujadilah", ayat: "22" }, 61: { surah: "Al-Hasyr", ayat: "Basmalah" }, 76: { surah: "Al-Hasyr", ayat: "4" },
      91: { surah: "Al-Hasyr", ayat: "10" }, 106: { surah: "Al-Hasyr", ayat: "17" }, 121: { surah: "Al-Hasyr", ayat: "22" },
      136: { surah: "Al-Mumtahanah", ayat: "Basmalah" }, 151: { surah: "Al-Mumtahanah", ayat: "6" }, 166: { surah: "Al-Mumtahanah", ayat: "12" },
    },
    "29": {
      1: { surah: "Al-Mulk", ayat: "1" }, 16: { surah: "Al-Mulk", ayat: "13" }, 31: { surah: "Al-Qalam", ayat: "Basmalah" },
      46: { surah: "Al-Qalam", ayat: "16" }, 61: { surah: "Al-Qalam", ayat: "43" }, 76: { surah: "Al-Haqqah", ayat: "Basmalah" },
      91: { surah: "Al-Haqqah", ayat: "9" }, 106: { surah: "Al-Haqqah", ayat: "35" }, 121: { surah: "Al-Ma'arij", ayat: "Basmalah" },
      136: { surah: "Al-Ma'arij", ayat: "11" }, 151: { surah: "Al-Ma'arij", ayat: "40" }, 166: { surah: "Nuh", ayat: "Basmalah" },
    },
    "30": {
      // Page 582 (1)
      1: { surah: "An-Naba", ayat: "1-2" }, 2: { surah: "An-Naba", ayat: "3-4" }, 3: { surah: "An-Naba", ayat: "5-6" },
      4: { surah: "An-Naba", ayat: "7-8" }, 5: { surah: "An-Naba", ayat: "9-11" }, 6: { surah: "An-Naba", ayat: "12-13" },
      7: { surah: "An-Naba", ayat: "14-16" }, 8: { surah: "An-Naba", ayat: "17-18" }, 9: { surah: "An-Naba", ayat: "19-21" },
      10: { surah: "An-Naba", ayat: "22-23" }, 11: { surah: "An-Naba", ayat: "24-25" }, 12: { surah: "An-Naba", ayat: "26-27" },
      13: { surah: "An-Naba", ayat: "28-29" }, 14: { surah: "An-Naba", ayat: "30" }, 15: { surah: "An-Naba", ayat: "30 (Akhir Hal)" },
      // Page 583 (2)
      16: { surah: "An-Naba", ayat: "31-33" }, 17: { surah: "An-Naba", ayat: "34-36" }, 18: { surah: "An-Naba", ayat: "37-38" },
      19: { surah: "An-Naba", ayat: "39-40" }, 20: { surah: "An-Nazi'at", ayat: "Basmalah" },
      21: { surah: "An-Nazi'at", ayat: "1-3" }, 22: { surah: "An-Nazi'at", ayat: "4-5" }, 23: { surah: "An-Nazi'at", ayat: "6-7" },
      24: { surah: "An-Nazi'at", ayat: "8-9" }, 25: { surah: "An-Nazi'at", ayat: "10-11" }, 26: { surah: "An-Nazi'at", ayat: "12-13" },
      27: { surah: "An-Nazi'at", ayat: "14" }, 28: { surah: "An-Nazi'at", ayat: "15" }, 29: { surah: "An-Nazi'at", ayat: "15 (Akhir Hal)" }, 30: { surah: "An-Nazi'at", ayat: "15 (Akhir Hal)" },
      // Page 584 (3)
      31: { surah: "An-Nazi'at", ayat: "16-18" }, 32: { surah: "An-Nazi'at", ayat: "19-21" }, 33: { surah: "An-Nazi'at", ayat: "22-23" },
      34: { surah: "An-Nazi'at", ayat: "24-25" }, 35: { surah: "An-Nazi'at", ayat: "26-27" }, 36: { surah: "An-Nazi'at", ayat: "28-29" },
      37: { surah: "An-Nazi'at", ayat: "30-31" }, 38: { surah: "An-Nazi'at", ayat: "32-33" }, 39: { surah: "An-Nazi'at", ayat: "34-35" },
      40: { surah: "An-Nazi'at", ayat: "36-38" }, 41: { surah: "An-Nazi'at", ayat: "39-41" }, 42: { surah: "An-Nazi'at", ayat: "42-43" },
      43: { surah: "An-Nazi'at", ayat: "44-45" }, 44: { surah: "An-Nazi'at", ayat: "46" }, 45: { surah: "An-Nazi'at", ayat: "46 (Akhir Hal)" },
      // Page 585 (4)
      46: { surah: "'Abasa", ayat: "Basmalah" }, 47: { surah: "'Abasa", ayat: "1-4" }, 48: { surah: "'Abasa", ayat: "5-8" },
      49: { surah: "'Abasa", ayat: "9-12" }, 50: { surah: "'Abasa", ayat: "13-16" }, 51: { surah: "'Abasa", ayat: "17-20" },
      52: { surah: "'Abasa", ayat: "21-23" }, 53: { surah: "'Abasa", ayat: "24-26" }, 54: { surah: "'Abasa", ayat: "27-29" },
      55: { surah: "'Abasa", ayat: "30-32" }, 56: { surah: "'Abasa", ayat: "33-35" }, 57: { surah: "'Abasa", ayat: "36-38" },
      58: { surah: "'Abasa", ayat: "39-40" }, 59: { surah: "'Abasa", ayat: "41-42" }, 60: { surah: "'Abasa", ayat: "42 (Akhir Hal)" },
      // Page 586 (5)
      61: { surah: "At-Takwir", ayat: "Basmalah" }, 62: { surah: "At-Takwir", ayat: "1-4" }, 63: { surah: "At-Takwir", ayat: "5-8" },
      64: { surah: "At-Takwir", ayat: "9-12" }, 65: { surah: "At-Takwir", ayat: "13-16" }, 66: { surah: "At-Takwir", ayat: "17-20" },
      67: { surah: "At-Takwir", ayat: "21-24" }, 68: { surah: "At-Takwir", ayat: "25-27" }, 69: { surah: "At-Takwir", ayat: "28-29" },
      70: { surah: "Al-Infitar", ayat: "Basmalah" }, 71: { surah: "Al-Infitar", ayat: "1-4" }, 72: { surah: "Al-Infitar", ayat: "5-8" },
      73: { surah: "Al-Infitar", ayat: "9-12" }, 74: { surah: "Al-Infitar", ayat: "13-16" }, 75: { surah: "Al-Infitar", ayat: "17-19" },
      // Page 587 (6)
      76: { surah: "Al-Muthaffifin", ayat: "Basmalah" }, 77: { surah: "Al-Muthaffifin", ayat: "1-3" }, 78: { surah: "Al-Muthaffifin", ayat: "4-6" },
      79: { surah: "Al-Muthaffifin", ayat: "7-9" }, 80: { surah: "Al-Muthaffifin", ayat: "10-12" }, 81: { surah: "Al-Muthaffifin", ayat: "13-15" },
      82: { surah: "Al-Muthaffifin", ayat: "16-18" }, 83: { surah: "Al-Muthaffifin", ayat: "19-21" }, 84: { surah: "Al-Muthaffifin", ayat: "22-24" },
      85: { surah: "Al-Muthaffifin", ayat: "25-27" }, 86: { surah: "Al-Muthaffifin", ayat: "28-30" }, 87: { surah: "Al-Muthaffifin", ayat: "31-33" },
      88: { surah: "Al-Muthaffifin", ayat: "34-35" }, 89: { surah: "Al-Muthaffifin", ayat: "36" }, 90: { surah: "Al-Muthaffifin", ayat: "36 (Akhir Hal)" },
      // Page 588 (7)
      91: { surah: "Al-Insyiqaq", ayat: "Basmalah" }, 92: { surah: "Al-Insyiqaq", ayat: "1-4" }, 93: { surah: "Al-Insyiqaq", ayat: "5-8" },
      94: { surah: "Al-Insyiqaq", ayat: "9-12" }, 95: { surah: "Al-Insyiqaq", ayat: "13-16" }, 96: { surah: "Al-Insyiqaq", ayat: "17-20" },
      97: { surah: "Al-Insyiqaq", ayat: "21-23" }, 98: { surah: "Al-Insyiqaq", ayat: "24-25" }, 99: { surah: "Al-Buruj", ayat: "Basmalah" },
      100: { surah: "Al-Buruj", ayat: "1-3" }, 101: { surah: "Al-Buruj", ayat: "4-6" }, 102: { surah: "Al-Buruj", ayat: "7-9" },
      103: { surah: "Al-Buruj", ayat: "10-12" }, 104: { surah: "Al-Buruj", ayat: "13-16" }, 105: { surah: "Al-Buruj", ayat: "17-20" },
      // Page 589 (8)
      106: { surah: "Al-Buruj", ayat: "21-22" }, 107: { surah: "Ath-Thariq", ayat: "Basmalah" }, 108: { surah: "Ath-Thariq", ayat: "1-4" },
      109: { surah: "Ath-Thariq", ayat: "5-8" }, 110: { surah: "Ath-Thariq", ayat: "9-12" }, 111: { surah: "Ath-Thariq", ayat: "13-15" },
      112: { surah: "Ath-Thariq", ayat: "16-17" }, 113: { surah: "Al-A'la", ayat: "Basmalah" }, 114: { surah: "Al-A'la", ayat: "1-4" },
      115: { surah: "Al-A'la", ayat: "5-8" }, 116: { surah: "Al-A'la", ayat: "9-12" }, 117: { surah: "Al-A'la", ayat: "13-15" },
      118: { surah: "Al-A'la", ayat: "16-19" }, 119: { surah: "Al-Ghasyiyah", ayat: "Basmalah" }, 120: { surah: "Al-Ghasyiyah", ayat: "1-4" },
      // Page 590 (9)
      121: { surah: "Al-Ghasyiyah", ayat: "5-8" }, 122: { surah: "Al-Ghasyiyah", ayat: "9-12" }, 123: { surah: "Al-Ghasyiyah", ayat: "13-16" },
      124: { surah: "Al-Ghasyiyah", ayat: "17-20" }, 125: { surah: "Al-Ghasyiyah", ayat: "21-24" }, 126: { surah: "Al-Ghasyiyah", ayat: "25-26" },
      127: { surah: "Al-Fajr", ayat: "Basmalah" }, 128: { surah: "Al-Fajr", ayat: "1-3" }, 129: { surah: "Al-Fajr", ayat: "4-6" },
      130: { surah: "Al-Fajr", ayat: "7-9" }, 131: { surah: "Al-Fajr", ayat: "10-12" }, 132: { surah: "Al-Fajr", ayat: "13-15" },
      133: { surah: "Al-Fajr", ayat: "16-18" }, 134: { surah: "Al-Fajr", ayat: "19-21" }, 135: { surah: "Al-Fajr", ayat: "22-23" },
      // Page 591 (10)
      136: { surah: "Al-Fajr", ayat: "24-26" }, 137: { surah: "Al-Fajr", ayat: "27-30" }, 138: { surah: "Al-Balad", ayat: "Basmalah" },
      139: { surah: "Al-Balad", ayat: "1-4" }, 140: { surah: "Al-Balad", ayat: "5-8" }, 141: { surah: "Al-Balad", ayat: "9-12" },
      142: { surah: "Al-Balad", ayat: "13-16" }, 143: { surah: "Al-Balad", ayat: "17-20" }, 144: { surah: "Asy-Syams", ayat: "Basmalah" },
      145: { surah: "Asy-Syams", ayat: "1-4" }, 146: { surah: "Asy-Syams", ayat: "5-8" }, 147: { surah: "Asy-Syams", ayat: "9-12" },
      148: { surah: "Asy-Syams", ayat: "13-15" }, 149: { surah: "Al-Lail", ayat: "Basmalah" }, 150: { surah: "Al-Lail", ayat: "1-3" },
      // Page 592 (11)
      151: { surah: "Al-Lail", ayat: "4-7" }, 152: { surah: "Al-Lail", ayat: "8-11" }, 153: { surah: "Al-Lail", ayat: "12-15" },
      154: { surah: "Al-Lail", ayat: "16-19" }, 155: { surah: "Al-Lail", ayat: "20-21" }, 156: { surah: "Ad-Duha", ayat: "Basmalah" },
      157: { surah: "Ad-Duha", ayat: "1-4" }, 158: { surah: "Ad-Duha", ayat: "5-8" }, 159: { surah: "Ad-Duha", ayat: "9-11" },
      160: { surah: "Al-Insyirah", ayat: "Basmalah" }, 161: { surah: "Al-Insyirah", ayat: "1-4" }, 162: { surah: "Al-Insyirah", ayat: "5-8" },
      163: { surah: "At-Tin", ayat: "Basmalah" }, 164: { surah: "At-Tin", ayat: "1-4" }, 165: { surah: "At-Tin", ayat: "5-8" },
      // Page 593 (12)
      166: { surah: "At-Tin", ayat: "1-4" }, 167: { surah: "At-Tin", ayat: "5-8" }, 168: { surah: "Al-'Alaq", ayat: "Basmalah" },
      169: { surah: "Al-'Alaq", ayat: "1-4" }, 170: { surah: "Al-'Alaq", ayat: "5-8" }, 171: { surah: "Al-'Alaq", ayat: "9-12" },
      172: { surah: "Al-'Alaq", ayat: "13-16" }, 173: { surah: "Al-'Alaq", ayat: "17-19" }, 174: { surah: "Al-Qadr", ayat: "Basmalah" },
      175: { surah: "Al-Qadr", ayat: "1-3" }, 176: { surah: "Al-Qadr", ayat: "4-5" }, 177: { surah: "Al-Bayyinah", ayat: "Basmalah" },
      178: { surah: "Al-Bayyinah", ayat: "1-3" }, 179: { surah: "Al-Bayyinah", ayat: "4-5" }, 180: { surah: "Al-Bayyinah", ayat: "6" },
      // Page 594 (13)
      181: { surah: "Al-Bayyinah", ayat: "7-8" }, 182: { surah: "Az-Zalzalah", ayat: "Basmalah" }, 183: { surah: "Az-Zalzalah", ayat: "1-4" },
      184: { surah: "Az-Zalzalah", ayat: "5-8" }, 185: { surah: "Al-'Adiyat", ayat: "Basmalah" }, 186: { surah: "Al-'Adiyat", ayat: "1-4" },
      187: { surah: "Al-'Adiyat", ayat: "5-8" }, 188: { surah: "Al-'Adiyat", ayat: "9-11" }, 189: { surah: "Al-Qari'ah", ayat: "Basmalah" },
      190: { surah: "Al-Qari'ah", ayat: "1-4" }, 191: { surah: "Al-Qari'ah", ayat: "5-8" }, 192: { surah: "Al-Qari'ah", ayat: "9-11" },
      193: { surah: "At-Takatsur", ayat: "Basmalah" }, 194: { surah: "At-Takatsur", ayat: "1-4" }, 195: { surah: "At-Takatsur", ayat: "5-8" },
      // Page 595 (14)
      196: { surah: "Al-'Asr", ayat: "Basmalah" }, 197: { surah: "Al-'Asr", ayat: "1-3" }, 198: { surah: "Al-Humazah", ayat: "Basmalah" },
      199: { surah: "Al-Humazah", ayat: "1-4" }, 200: { surah: "Al-Humazah", ayat: "5-8" }, 201: { surah: "Al-Humazah", ayat: "9" },
      202: { surah: "Al-Fil", ayat: "Basmalah" }, 203: { surah: "Al-Fil", ayat: "1-3" }, 204: { surah: "Al-Fil", ayat: "4-5" },
      205: { surah: "Quraisy", ayat: "Basmalah" }, 206: { surah: "Quraisy", ayat: "1-4" }, 207: { surah: "Al-Ma'un", ayat: "Basmalah" },
      208: { surah: "Al-Ma'un", ayat: "1-4" }, 209: { surah: "Al-Ma'un", ayat: "5-7" }, 210: { surah: "Al-Kautsar", ayat: "Basmalah" },
      // Page 596 (15)
      211: { surah: "Al-Kautsar", ayat: "1-3" }, 212: { surah: "Al-Kafirun", ayat: "Basmalah" }, 213: { surah: "Al-Kafirun", ayat: "1-3" },
      214: { surah: "Al-Kafirun", ayat: "4-6" }, 215: { surah: "An-Nashr", ayat: "Basmalah" }, 216: { surah: "An-Nashr", ayat: "1-3" },
      217: { surah: "Al-Lahab", ayat: "Basmalah" }, 218: { surah: "Al-Lahab", ayat: "1-3" }, 219: { surah: "Al-Lahab", ayat: "4-5" },
      220: { surah: "Al-Ikhlas", ayat: "Basmalah" }, 221: { surah: "Al-Ikhlas", ayat: "1-4" }, 222: { surah: "Al-Falaq", ayat: "Basmalah" },
      223: { surah: "Al-Falaq", ayat: "1-3" }, 224: { surah: "Al-Falaq", ayat: "4-5" }, 225: { surah: "An-Nas", ayat: "Basmalah" },
      // Page 597 (16)
      226: { surah: "Al-'Asr", ayat: "Basmalah" }, 227: { surah: "Al-'Asr", ayat: "1-3" },
      228: { surah: "Al-Humazah", ayat: "Basmalah" }, 229: { surah: "Al-Humazah", ayat: "1-4" }, 230: { surah: "Al-Humazah", ayat: "5-8" }, 231: { surah: "Al-Humazah", ayat: "9" },
      232: { surah: "Al-Fil", ayat: "Basmalah" }, 233: { surah: "Al-Fil", ayat: "1-3" }, 234: { surah: "Al-Fil", ayat: "4-5" },
      235: { surah: "Al-Fil", ayat: "Selesai" }, 236: { surah: "Al-Fil", ayat: "Selesai" }, 237: { surah: "Al-Fil", ayat: "Selesai" }, 238: { surah: "Al-Fil", ayat: "Selesai" }, 239: { surah: "Al-Fil", ayat: "Selesai" }, 240: { surah: "Al-Fil", ayat: "Selesai" },
      // Page 598 (17)
      241: { surah: "Quraisy", ayat: "Basmalah" }, 242: { surah: "Quraisy", ayat: "1-4" },
      243: { surah: "Al-Ma'un", ayat: "Basmalah" }, 244: { surah: "Al-Ma'un", ayat: "1-4" }, 245: { surah: "Al-Ma'un", ayat: "5-7" },
      246: { surah: "Al-Kautsar", ayat: "Basmalah" }, 247: { surah: "Al-Kautsar", ayat: "1-3" },
      248: { surah: "Al-Kautsar", ayat: "Selesai" }, 249: { surah: "Al-Kautsar", ayat: "Selesai" }, 250: { surah: "Al-Kautsar", ayat: "Selesai" }, 251: { surah: "Al-Kautsar", ayat: "Selesai" }, 252: { surah: "Al-Kautsar", ayat: "Selesai" }, 253: { surah: "Al-Kautsar", ayat: "Selesai" }, 254: { surah: "Al-Kautsar", ayat: "Selesai" }, 255: { surah: "Al-Kautsar", ayat: "Selesai" },
      // Page 599 (18)
      256: { surah: "Al-Kafirun", ayat: "Basmalah" }, 257: { surah: "Al-Kafirun", ayat: "1-3" }, 258: { surah: "Al-Kafirun", ayat: "4-6" },
      259: { surah: "An-Nashr", ayat: "Basmalah" }, 260: { surah: "An-Nashr", ayat: "1-3" },
      261: { surah: "Al-Lahab", ayat: "Basmalah" }, 262: { surah: "Al-Lahab", ayat: "1-3" }, 263: { surah: "Al-Lahab", ayat: "4-5" },
      264: { surah: "Al-Lahab", ayat: "Selesai" }, 265: { surah: "Al-Lahab", ayat: "Selesai" }, 266: { surah: "Al-Lahab", ayat: "Selesai" }, 267: { surah: "Al-Lahab", ayat: "Selesai" }, 268: { surah: "Al-Lahab", ayat: "Selesai" }, 269: { surah: "Al-Lahab", ayat: "Selesai" }, 270: { surah: "Al-Lahab", ayat: "Selesai" },
      // Page 600 (19)
      271: { surah: "Al-Ikhlas", ayat: "Basmalah" }, 272: { surah: "Al-Ikhlas", ayat: "1-4" },
      273: { surah: "Al-Falaq", ayat: "Basmalah" }, 274: { surah: "Al-Falaq", ayat: "1-3" }, 275: { surah: "Al-Falaq", ayat: "4-5" },
      276: { surah: "An-Nas", ayat: "Basmalah" }, 277: { surah: "An-Nas", ayat: "1-3" }, 278: { surah: "An-Nas", ayat: "4-6" },
      279: { surah: "An-Nas", ayat: "Selesai" }, 280: { surah: "An-Nas", ayat: "Selesai" }, 281: { surah: "An-Nas", ayat: "Selesai" }, 282: { surah: "An-Nas", ayat: "Selesai" }, 283: { surah: "An-Nas", ayat: "Selesai" }, 284: { surah: "An-Nas", ayat: "Selesai" }, 285: { surah: "An-Nas", ayat: "Selesai" },
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
    if (juzList.includes(selectedJuz)) {
      setJuzList(juzList.filter(j => j !== selectedJuz));
    } else {
      setJuzList([...juzList, selectedJuz]);
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
          pencapaian = {
            surah: dataJuz[nearestKey].surah,
            ayat: dataJuz[nearestKey].ayat + (nearestKey === totalBaris ? "" : " (Awal Halaman)")
          };
        } else {
          const namaSuratSpesifik = deteksiSurat(juzNum, totalBaris);
          pencapaian = { 
            surah: namaSuratSpesifik, 
            ayat: `Halaman ${hlm + 1}, Baris ${brs}` 
          };
        }
      } else {
        const namaSuratSpesifik = deteksiSurat(juzNum, totalBaris);
        pencapaian = { 
          surah: namaSuratSpesifik, 
          ayat: `Halaman ${hlm + 1}, Baris ${brs}` 
        };
      }

      return { juz: j, ...pencapaian };
    });

    setResult({ 
      details, 
      hlm, 
      brs, 
      totalBaris,
      totalHalaman: hlm * juzList.length,
      totalBarisResult: brs * juzList.length,
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
                  onChange={(e) => setKategori(e.target.value)}
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
                    
                    return (
                      <label 
                        key={opt} 
                        className={`relative flex items-center justify-center py-3 rounded-xl border cursor-pointer transition-all duration-300 select-none
                          ${isSelected 
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200 scale-105 z-10' 
                            : 'bg-stone-50 text-stone-500 border-stone-200 hover:border-emerald-300 hover:bg-emerald-50'
                          }`}
                      >
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={isSelected}
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
                      value={halaman} onChange={(e) => setHalaman(Number(e.target.value))} required
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
                      value={baris} onChange={(e) => setBaris(Number(e.target.value))} required
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
