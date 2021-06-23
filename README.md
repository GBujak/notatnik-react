# Notatnik

Aplikacja react.js plus backend (katalog server).

Funkcje edytora:

* menedżer plików - tworzenie i usuwanie plików i katalogów
* edytor bloków - pliki to dokumenty składające się z bloków. Enter tworzy nowy blok,
  backspace kasuje blok itd..
* podstawowe wsparcie markdown - tytuły, podtytuły, listy.

Funkcje aplikacji:

* szyfrowanie po stronie klienta - na serwer nigdy nie jest wysyłany czytelny
  notatnik.
* automatyczne generowanie loginu i hasła - login generowany po stronie serwera jako
  UUID, hasło generowane po stronie klienta, nigdy nie wysyłane na serwer.
* automatyczna synchronizacja z opóźnieniem - w tym otwarty katalog, otwarty plik

## Prezentacja wideo

* [prezentacja wideo](https://youtu.be/ftjs6V-fMX0)
