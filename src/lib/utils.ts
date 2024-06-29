import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateAge(birthDay: string) {
  const today = new Date()
  const birthDate = new Date(birthDay)

  let age = today.getFullYear() - birthDate.getFullYear()
  const month = today.getMonth() - birthDate.getMonth()

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

export const isMobile = window.innerWidth < 768

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const languages = [
  'Abkhazian',
  'Afar',
  'Afrikaans',
  'Akan',
  'Albanian',
  'Amharic',
  'Arabic',
  'Aragonese',
  'Armenian',
  'Assamese',
  'Avaric',
  'Avestan',
  'Aymara',
  'Azerbaijani',
  'Azeri',
  'Bambara',
  'Bashkir',
  'Basque',
  'Belarusian',
  'Bengali',
  'Bihari',
  'Bislama',
  'Bosnian',
  'Breton',
  'Bulgarian',
  'Burmese',
  'Catalan',
  'Chamorro',
  'Chechen',
  'Chichewa',
  'Chinese',
  'Chuvash',
  'Cornish',
  'Corsican',
  'Cree',
  'Croatian',
  'Czech',
  'Danish',
  'Dhivehi',
  'Dutch',
  'Dzongkha',
  'English',
  'Esperanto',
  'Estonian',
  'Ewe',
  'Faroese',
  'Fijian',
  'Finnish',
  'French',
  'Fulah',
  'Galician',
  'Ganda',
  'Georgian',
  'German',
  'Greek',
  'Greenlandic',
  'Guarani',
  'Gujarati',
  'Haitian',
  'Hausa',
  'Hebrew',
  'Herero',
  'Hindi',
  'Hiri Motu',
  'Hungarian',
  'Icelandic',
  'Ido',
  'Igbo',
  'Indonesian',
  'Interlingua',
  'Interlingue',
  'Inuktitut',
  'Inupiaq',
  'Irish Gaelic',
  'Italian',
  'Japanese',
  'Javanese',
  'Kannada',
  'Kanuri',
  'Kashmiri',
  'Kazakh',
  'Khasi',
  'Khmer',
  'Kikuyu',
  'Kinyarwanda',
  'Kirghiz',
  'Komi',
  'Kongo',
  'Korean',
  'Kurdish',
  'Kwanyama',
  'Lao',
  'Latin',
  'Latvian',
  'Limburgish',
  'Lingala',
  'Lithuanian',
  'Luba-Katanga',
  'Luxembourgish',
  'Macedonian',
  'Malagasy',
  'Malay',
  'Malayalam',
  'Maltese',
  'Manx',
  'Maori',
  'Marathi',
  'Marshallese',
  'Mongolian',
  'Montenegrin',
  'Nauru',
  'Navajo',
  'Ndonga',
  'North Ndebele',
  'Nepali',
  'Northern Sami',
  'Norwegian',
  'Occitan',
  'Ojibwa',
  'Oriya',
  'Oromo',
  'Ossetian',
  'Pali',
  'Panjabi',
  'Pashto',
  'Persian',
  'Polish',
  'Portuguese',
  'Quechua',
  'Romansh',
  'Romanian',
  'Russian',
  'Samoan',
  'Sango',
  'Sanskrit',
  'Sardinian',
  'Scottish Gaelic',
  'Serbian',
  'Shona',
  'Sichuan Yi',
  'Sindhi',
  'Sinhala',
  'Slovak',
  'Slovenian',
  'Somali',
  'Sotho',
  'Spanish',
  'Sundanese',
  'Swahili',
  'Swati',
  'Swedish',
  'Tagalog',
  'Tahitian',
  'Tajik',
  'Tamil',
  'Tatar',
  'Telugu',
  'Thai',
  'Tibetan',
  'Tigrinya',
  'Tok Pisin',
  'Tonga',
  'Tsonga',
  'Turkish',
  'Turkmen',
  'Twi',
  'Uighur',
  'Ukrainian',
  'Urdu',
  'Uzbek',
  'Venda',
  'Vietnamese',
  'Volapük',
  'Walloon',
  'Welsh',
  'Western Frisian',
  'Wolof',
  'Xhosa',
  'Yiddish',
  'Yoruba',
  'Zhuang',
  'Zulu',
]
