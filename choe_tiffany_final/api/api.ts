import { bookclubs, books, users } from '@/mock-data/data';
import { GoogleBook } from '@/src/context/types';
import axios from 'axios';

export function loginApi(username: string, password: string) {
  return users.find((u) => u.username === username && u.password === password);
}

export function getCurrentBook(bookclubId?: number) {
  return books.find(
    (b) => b.bookclubId === bookclubId && b.readingStatus === 'reading',
  );
}

export function getBooks(bookclubId: number) {
  return books
    .filter(
      (b) => b.bookclubId === bookclubId && b.readingStatus === 'finished',
    )
    .sort((a, b) => a.finishedDate!.getTime() - b.finishedDate!.getTime());
}

export function getBookClubList() {
  return bookclubs.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getBookById(id: string) {
  const { data } = await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyCI5tYYAbFlUmeBGQtT_Ya5ylgkqKEhQ1A`,
  );

  return {
    id: data.id,
    title: data.volumeInfo.title,
    authors: data.volumeInfo.authors ?? [],
    description: data.volumeInfo.description,
    thumbnail: data.volumeInfo.imageLinks?.thumbnail.replace(
      'http://',
      'https://',
    ),
    smallThumbnail: data.volumeInfo.imageLinks?.smallThumbnail.replace(
      'http://',
      'https://',
    ),
    pageCount: data.volumeInfo.pageCount,
    publishedDate: data.volumeInfo.publishedDate,
  } as GoogleBook;
}

export async function searchGoogleBooks(query: string) {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query,
      )}&key=AIzaSyCI5tYYAbFlUmeBGQtT_Ya5ylgkqKEhQ1A`,
    );

    const ids: string[] = [];
    const books: GoogleBook[] = [];

    data.items?.forEach((item: any) => {
      if (ids.includes(item.id)) {
        return;
      }

      ids.push(item.id);
      books.push({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors ?? [],
        thumbnail: item.volumeInfo.imageLinks?.smallThumbnail.replace(
          'http://',
          'https://',
        ),
        publishedDate: item.volumeInfo.publishedDate,
        rating: item.volumeInfo.averageRating,
      } as GoogleBook);
    });

    return books ?? [];
  } catch (error) {
    console.error('Google Books search error:', error);
    return [];
  }
}
